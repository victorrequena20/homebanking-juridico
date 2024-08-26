import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Box } from "@mui/material";

const PieChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const data = [
      { label: "Activos", value: 340 },
      { label: "Pasivos", value: 620 },
    ];

    const width = 280;
    const height = 220;
    const radius = Math.min(width, height) / 2;

    const color = d3
      .scaleOrdinal<string>()
      .domain(data.map(d => d.label))
      .range(["#74E291", "#006edb"]); // Nuevos colores aplicados aquí

    const pie = d3.pie<{ label: string; value: number }>().value(d => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height + 60)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", d => color(d.data.label));

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
    const legend = svg.append("g").attr("transform", `translate(${-width / 4}, ${radius + 20})`);

    const legendSpacing = width / 2;

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
      .style("fill", d => color(d.label));

    legendItems
      .append("text")
      .attr("x", 15)
      .attr("y", 5)
      .text(d => d.label)
      .style("font-size", "12px")
      .style("align-self", "center")
      .style("margin", "auto");
  }, []);

  return (
    <Box sx={{ mt: 6 }}>
      <svg ref={svgRef}></svg>
    </Box>
  );
};

export default PieChart;
