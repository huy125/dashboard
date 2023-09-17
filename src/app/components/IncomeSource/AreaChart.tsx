"use client"
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {AreaData} from "@/app/types";

interface Props {
    data: AreaData[];
    width: number;
    height: number;
}

const AreaChart: React.FC<Props> = ({ data, width, height }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();
        const margin = { top: 10, right: 20, bottom: 30, left: 10 };
        const maxHorizontalRange = width - margin.left - margin.right;
        const maxVerticalRange = height - margin.top - margin.bottom;

        const xScale = d3
            .scaleBand()
            .range([0, maxHorizontalRange])
            .domain(data.map((d) => d.label))
            .padding(0);

        const yScale = d3
            .scaleLinear()
            .range([maxVerticalRange, 0])
            .domain([54000, d3.max(data, (d) => d.value) as number]);

        d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('border', 'none')
            .style('outline', 'none')

        const area = d3
            .area<AreaData>()
            .x((d) => xScale(d.label)! + xScale.bandwidth() / 2)
            .y0(maxVerticalRange)
            .y1((d) => yScale(d.value)!);

        const line = d3
            .line<AreaData>()
            .x((d) => xScale(d.label)! + xScale.bandwidth() / 2)
            .y((d) => yScale(d.value)!);

        // Define the gradient
        const gradient = svg
            .append('defs')
            .append('linearGradient')
            .attr('id', 'areaGradient')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', 0)
            .attr('y1', yScale(0)!) // Y position of the gradient start
            .attr('x2', 0)
            .attr('y2', yScale(d3.max(data, (d) => d.value)!)!) // Y position of the gradient end

        // Add color stops to the gradient
        gradient
            .append('stop')
            .attr('offset', '55%')
            .attr('stop-color', 'black')
            .attr('stop-opacity', 0.8);

        gradient
            .append('stop')
            .attr('offset', '100%')
            .attr('stop-color', 'blue')
            .attr('stop-opacity', 0.7);

        svg
            .append('path')
            .datum(data)
            .attr('fill', 'url(#areaGradient')
            .attr('d', area)
            .attr('transform', `translate(${-margin.left}, 0)`);


        svg
            .append('path')
            .datum(data)
            .attr('d', line)
            .attr('transform', `translate(${-margin.left}, 0)`)
            .style('fill', 'none')
            .style('stroke', 'blue')
            .style('stroke-width', '2px');

        svg
            .append('g')
            .attr('transform', `translate(-5, ${maxVerticalRange})`)
            .call(d3.axisBottom(xScale));
        svg.selectAll('.tick line').remove();
        svg.selectAll('.domain').remove();
    }, [data, width, height]);

    return <svg ref={svgRef}></svg>;
};

export default AreaChart;