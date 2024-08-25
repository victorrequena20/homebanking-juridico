import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const data = [
      { label: "Activos", value: 340 },
      { label: "Pasivos", value: 620 },
    ];

    const width = 280;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const color = d3
      .scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(d3.schemePastel1);

    const pie = d3.pie<{ label: string; value: number }>().value(d => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height + 60) // Incrementa la altura para la leyenda
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", d => color(d.data.label) as string);

    // Tooltips
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "8px")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("visibility", "hidden");

    g.on("mouseover", (event, d) => {
      tooltip.style("visibility", "visible").html(`${d.data.label}: ${d.data.value}`);
    })
      .on("mousemove", event => {
        tooltip.style("top", event.pageY - 10 + "px").style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    // Legend
    const legend = svg.append("g").attr("transform", `translate(${-width / 4}, ${radius + 20})`); // Ajustar la posición de la leyenda

    const legendSpacing = width / 2; // Ajusta el espaciado para que ocupe todo el ancho disponible

    const legendItems = legend
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${i * legendSpacing}, 0)`);

    legendItems
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 7)
      .style("fill", d => color(d.label) as string);

    legendItems
      .append("text")
      .attr("x", 15)
      .attr("y", 5)
      .text(d => d.label)
      .style("font-size", "14px")
      .style("alignment-baseline", "middle");
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default PieChart;
