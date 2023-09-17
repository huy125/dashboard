"use client"
import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {BarDataType} from "@/app/types";

interface Props {
    data: BarDataType[];
    width: number;
    height: number;
}

const startingXAxis = 12500;

const OperatingProfitBarChart: React.FC<Props> = ({ data, width,height }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const margin = {top: 15, right: 30, bottom: 20, left: 30};

        // Create an SVG element
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left}, 0)`);
        // Create a scale for the x-axis
        const xScale = d3.scaleLinear()
            .domain([startingXAxis, d3.max(data, (d) => d.value) as number])
            .range([margin.left, width - margin.right]);

        // Create a scale for the y-axis
        const yScale = d3.scaleBand()
            .domain(data.map(d => d.label))
            .range([margin.top, height - margin.bottom])
            .padding(0.7);
        svg.append('g')
            .call(d3.axisLeft(yScale))

        // Define the gradient
        const operatingProfitGradientColors = {
            startColor: '#9BF8F2',
            endColor: '#C240DB',
        };

        const gradient = svg
            .append('defs')
            .append('linearGradient')
            .attr('id', 'operatingProfitGradient')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', '0%')
            .attr('y1', '50%') // Y position of the gradient start
            .attr('x2', '55%')
            .attr('y2', '50%') // Y position of the gradient end

        // Add color stops to the gradient
        gradient
            .append('stop')
            .attr('offset', '25%')
            .attr('stop-color', operatingProfitGradientColors.startColor); // Start color

        gradient
            .append('stop')
            .attr('offset', '81%')
            .attr('stop-color', operatingProfitGradientColors.endColor); // End color

        // Create horizontal bars
        svg
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', margin.left - 10)
            .attr('y', (d) => yScale(d.label)!)
            .attr('width', d => xScale(d.value) - margin.left)
            .attr('height', yScale.bandwidth())
            .attr('fill', 'url(#operatingProfitGradient)');
        svg.selectAll('.tick line').remove();
        svg.selectAll('.domain').remove();
    }, [data]);

    return <svg ref={svgRef}></svg>;
};

export default OperatingProfitBarChart;