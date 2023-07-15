"use client"
import {useEffect, useRef} from "react";
import * as d3 from 'd3';
import {PieArcDatum, ScaleOrdinal} from "d3";
import {DonutData} from "@/app/types";

interface OperatingProfitDonutChartProps {
    data: DonutData[];
    width: number;
    height: number;
}

const OperatingProfitDonutChart: React.FC<OperatingProfitDonutChartProps> = ({ data, width, height }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    useEffect(() => {
        const radius = Math.min(width, height) / 2;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        const color: ScaleOrdinal<string, any> = d3.scaleOrdinal()
            .domain(data.map(d => d.label))
            .range(['#007BFF', 'cyan']); // Adjust colors as needed

        const pie = d3.pie<DonutData>().value(d => d.value);

        const outerArc = d3.arc<PieArcDatum<DonutData>>()
            .innerRadius(radius * 0.9) // Set inner radius for the donut
            .outerRadius(radius);

        const arcs = svg.selectAll('.outerArc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'outerArc');

        arcs.append('path')
            .attr('d', (d) => outerArc(d))
            .attr('fill', (d) => color(d.data.label))
            .attr('stroke', 'black')
            .attr('stroke-width', '3px')
        ;

        const innerArc = d3.arc<PieArcDatum<DonutData>>()
            .innerRadius(radius * 0.8) // Set inner radius for the donut
            .outerRadius(radius * 0.9);

        arcs.append('path')
            .attr('d', (d) => innerArc(d))
            .attr('fill', (d) => color(d.data.label))
            .attr('stroke', 'black')
            .attr('stroke-width', '3px')
        ;
    }, [data, width, height]);

    return <svg ref={svgRef}></svg>;
}

export default OperatingProfitDonutChart;