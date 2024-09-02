import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataPoint {
  date: Date;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Configurar locale en español
    d3.timeFormatDefaultLocale({
      dateTime: "%A, %e de %B de %Y, %X",
      date: "%d/%m/%Y",
      time: "%H:%M:%S",
      periods: ["AM", "PM"],
      days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      shortDays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      shortMonths: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    });

    // Function to render the chart
    const renderChart = () => {
      const container = svgRef.current!.parentElement;
      const width = container?.clientWidth || 1000;
      const height = 300;
      const margin = { top: 20, right: 30, bottom: 30, left: 50 };

      // Select the SVG element
      const svg = d3
        .select(svgRef.current)
        .attr("width", "100%")
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("background-color", "#fff")
        .style("border-radius", "8px");

      // Set up scales
      const x = d3
        .scaleTime()
        .domain(d3.extent(data, (d: DataPoint) => d.date) as [Date, Date])
        .range([margin.left, width - margin.right]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d: DataPoint) => d.value) ?? 0])
        .nice()
        .range([height - margin.bottom, margin.top]);

      // Clear previous elements
      svg.selectAll("*").remove();

      // Add grid lines
      const gridlinesX = d3
        .axisBottom(x)
        .ticks(d3.timeDay.every(1)) // Un tick por día para evitar repeticiones
        .tickSize(-height + margin.top + margin.bottom)
        .tickFormat(() => "");

      const gridlinesY = d3
        .axisLeft(y)
        .ticks(5)
        .tickSize(-width + margin.left + margin.right)
        .tickFormat(() => "");

      svg
        .append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(gridlinesX)
        .attr("color", "#f2f4f7")
        .attr("stroke-dasharray", "2,2");

      svg
        .append("g")
        .attr("class", "grid")
        .attr("transform", `translate(${margin.left},0)`)
        .call(gridlinesY)
        .attr("color", "#f2f4f7")
        .attr("stroke-dasharray", "2,2");

      // Add the X axis with fewer ticks
      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(d3.timeDay.every(1)) // Un tick por día
            .tickFormat(d3.timeFormat("%d %b") as any) // Formato en español
        )
        .attr("color", "#f2f4f7")
        .selectAll("text")
        .attr("color", "#606778")
        .style("font-size", "12px");

      // Add the Y axis with fewer ticks
      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(
          d3
            .axisLeft(y)
            .ticks(5)
            .tickFormat(d => `${d}`)
        )
        .attr("color", "#f2f4f7")
        .selectAll("text")
        .attr("color", "#606778")
        .style("font-size", "12px");

      // Add gradient
      const gradient = svg
        .append("defs")
        .append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", y(0))
        .attr("x2", 0)
        .attr("y2", y(d3.max(data, (d: DataPoint) => d.value) ?? 0));

      gradient.append("stop").attr("offset", "0%").attr("stop-color", "rgba(66, 133, 244, 0.3)");
      gradient.append("stop").attr("offset", "100%").attr("stop-color", "rgba(66, 133, 244, 0)");

      // Add the line with gradient fill
      const line = d3
        .line<DataPoint>()
        .x((d: DataPoint) => x(d.date)!)
        .y((d: DataPoint) => y(d.value))
        .curve(d3.curveMonotoneX);

      svg.append("path").datum(data).attr("fill", "none").attr("stroke", "steelblue").attr("stroke-width", 2).attr("d", line);

      // Add area under the line
      const area = d3
        .area<DataPoint>()
        .x((d: DataPoint) => x(d.date)!)
        .y0(y(0))
        .y1((d: DataPoint) => y(d.value))
        .curve(d3.curveMonotoneX);

      svg.append("path").datum(data).attr("fill", "url(#line-gradient)").attr("d", area);

      // Add tooltip
      const tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "1px solid #ddd")
        .style("padding", "10px")
        .style("border-radius", "5px")
        .style("font-size", "12px")
        .style("color", "#606778");

      // Add invisible rect for mouse tracking
      svg
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mousemove", mouseMove)
        .on("mouseout", mouseOut);

      // Add circle that travels along the curve of chart
      const focus = svg.append("g").append("circle").style("fill", "steelblue").attr("stroke", "white").attr("r", 5).style("opacity", 0);

      function mouseMove(event: any) {
        const bisect = d3.bisector((d: DataPoint) => d.date).left;
        const x0 = x.invert(d3.pointer(event)[0]);
        const i = bisect(data, x0, 1);
        const selectedData = data[i - 1];
        focus.attr("cx", x(selectedData.date)).attr("cy", y(selectedData.value)).style("opacity", 1);

        tooltip
          .html(`Fecha: ${d3.timeFormat("%d %b %Y")(selectedData.date)}<br>Valor: ${selectedData.value}`)
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 28 + "px")
          .transition()
          .duration(200)
          .style("opacity", 0.9);
      }

      function mouseOut() {
        focus.style("opacity", 0);
        tooltip.transition().duration(500).style("opacity", 0);
      }
    };

    // Initial rendering
    renderChart();

    // Re-render chart on window resize
    window.addEventListener("resize", renderChart);
    return () => window.removeEventListener("resize", renderChart);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default LineChart;
