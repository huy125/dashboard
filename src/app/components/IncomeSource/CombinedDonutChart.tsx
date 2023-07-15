import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {PieArcDatum} from "d3";
import {DonutData} from "@/app/types";

interface CombinedDonutChartProps {
    valueData: any; // Replace 'any' with the actual type of valueData
    percentageData: any; // Replace 'any' with the actual type of percentageData
    width: number;
    height: number;
}

const OUTER_DONUT_CHART_COEFFICIENT = 0.7;
const INNER_DONUT_CHART_COEFFICIENT = 0.6;

const CombinedDonutChart: React.FC<CombinedDonutChartProps> = ({valueData, percentageData, width, height}) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (svgRef.current) {
            drawDonutChart();
        }
    }, [valueData, percentageData, width, height]);

    const drawDonutChart = () => {
        const svg = d3
            .select(svgRef.current)
            .attr('width', width)
            .attr('height', height);
        const radius = Math.min(width, height) / 2;
        const blackCircleRadius = radius * OUTER_DONUT_CHART_COEFFICIENT * 0.75;
        // Define the gradient colors for the donut chart
        const gradientColors = {
            startColor: '#DC25FA',
            endColor: '#9947F7',
        };
        const arcGroup = svg
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        // Draw a black circle in the center to erase the links inner circle
        arcGroup.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', blackCircleRadius) // Adjust the radius as needed
            .attr('fill', 'black');

        // Add text to the center of donut chart

        const incomePercentage = findIncomePercentage(percentageData);
        const textLabel = arcGroup
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '.1em')
            .style('font-size', '32px')
            .style('font-family', 'Arial, sans-serif')
            .style('fill', 'white')
            .text(incomePercentage + '%');

        const textBBox = textLabel.node()?.getBBox();

        if (textBBox) {
            arcGroup
                .append('text')
                .attr('x', 0)
                .attr('y', textBBox.height - 5)
                .attr('text-anchor', 'middle')
                .style('font-size', '10px')
                .style('font-family', 'Avenir')
                .style('fill', 'white')
                .text('Income Achieved');
        }
        // // Draw arcs for the first donut chart
        drawOuterDonutChart(svg, arcGroup, radius, gradientColors);
        drawInnerDonutChart(svg, arcGroup, radius, gradientColors);
    };

    const drawOuterDonutChart = (
        svg: d3.Selection<SVGSVGElement | null, any, null, undefined>,
        arcGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
        radius: number,
        gradientColors: { startColor: string; endColor: string }
    ) => {
        const outerRadius = radius;
        const innerRadius = radius * OUTER_DONUT_CHART_COEFFICIENT;

        const outerDonutArc = d3
            .arc<PieArcDatum<DonutData>>()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        const pie1 = d3.pie<DonutData>().value((d) => d.value);
        const pie2 = d3.pie<DonutData>().value((d) => d.value);
        const arcs1 = arcGroup.selectAll('.arc1').data(pie1(valueData)).enter().append('g');
        // Create the radial gradient
        const radialGradient = svg
            .append('defs')
            .append('radialGradient')
            .attr('id', 'donutChartGradient')
            .attr('cx', '50%')
            .attr('cy', '50%')
            .attr('r', '55%')
            .attr('fx', '60%') // Set a different focal point x-coordinate (direction)
            .attr('fy', '40%'); // Set a different focal point y-coordinate (direction)
        radialGradient
            .append('stop')
            .attr('offset', '0%')
            .attr('stop-color', gradientColors.startColor);
        radialGradient
            .append('stop')
            .attr('offset', '61%')
            .attr('stop-color', gradientColors.endColor);
        arcs1
            .append('path')
            .attr('d', (d) => outerDonutArc(d as PieArcDatum<DonutData>) as string)
            .attr('fill', `url(#donutChartGradient)`)
            .attr('stroke', 'black')
            .attr('stroke-width', '11px')
            .attr('opacity', 0.4)
        ;

        // Draw arcs for the second donut chart
        const achievedIncomePercentageDonutArc = d3
            .arc<PieArcDatum<DonutData>>()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        const arcs2 = arcGroup.selectAll('.arc2').data(pie2(percentageData)).enter().append('g');

        arcs2
            .append('path')
            .attr('d', (d) => achievedIncomePercentageDonutArc(d as PieArcDatum<DonutData>) as string)
            .attr('fill', (d) => {
                const dataPoint = percentageData.find((point: DonutData) => point.label === d.data.label);
                return dataPoint && dataPoint.label === 'Target' ? 'black' : 'none';
            })
            .attr('opacity', 0.8)
        ;
    }

    const drawInnerDonutChart = (
        svg: d3.Selection<SVGSVGElement | null, any, null, undefined>,
        arcGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
        radius: number,
        gradientColors: { startColor: string; endColor: string }
    ) => {
        const emptyData: DonutData[] = [
            {label: 'Empty', value: 1},
        ];

        const outerRadius = radius * 0.55;
        const innerRadius = radius * INNER_DONUT_CHART_COEFFICIENT * 0.6;

        const innerBetweenCircleRadius = radius * INNER_DONUT_CHART_COEFFICIENT * 0.75;
        const outerBetweenCircleRadius = radius * 0.74;
        const innerDonutArc = d3
            .arc<PieArcDatum<DonutData>>()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
        ;
        const pie1 = d3.pie<DonutData>().value((d) => d.value);

        const arcs3 = arcGroup.selectAll('.arc3').data(pie1(emptyData)).enter().append('g');

        // Create the radial gradient
        const innerRadialGradient = svg
            .append('defs')
            .append('radialGradient')
            .attr('id', 'innerDonutChartGradient')
            .attr('cx', '20%')
            .attr('cy', '20%')
            .attr('r', '90%')
            .attr('fx', '55%') // Set a different focal point x-coordinate (direction)
            .attr('fy', '25%'); // Set a different focal point y-coordinate (direction)
        innerRadialGradient.append('stop').attr('offset', '0%').attr('stop-color', gradientColors.startColor);
        innerRadialGradient.append('stop').attr('offset', '71%').attr('stop-color', gradientColors.endColor);

        arcs3
            .append('path')
            .attr('d', (d) => innerDonutArc(d as PieArcDatum<DonutData>) as string) // Adjust radius as needed
            .attr('fill', `url(#innerDonutChartGradient)`) // Set your desired fill color for the empty donut chart
            .attr('stroke', 'black')
            .attr('stroke-width', '2px')
        ;

        const betweenDonutArc = d3
            .arc<PieArcDatum<DonutData>>()
            .innerRadius(innerBetweenCircleRadius)
            .outerRadius(outerBetweenCircleRadius)
        ;
        const arcs4 = arcGroup.selectAll('.arc4').data(pie1(emptyData)).enter().append('g');

        const betweenArcGradient = svg
            .append('defs')
            .append('radialGradient')
            .attr('id', 'betweenArcGradient')
            .attr('cx', '20%')
            .attr('cy', '20%')
            .attr('r', '90%')
            .attr('fx', '55%') // Set a different focal point x-coordinate (direction)
            .attr('fy', '25%'); // Set a different focal point y-coordinate (direction)
        betweenArcGradient.append('stop').attr('offset', '24%').attr('stop-color', gradientColors.startColor);
        betweenArcGradient.append('stop').attr('offset', '80%').attr('stop-color', gradientColors.endColor);

        arcs4
            .append('path')
            .attr('d', (d) => betweenDonutArc(d as PieArcDatum<DonutData>) as string) // Adjust radius as needed
            .attr('fill', `url(#betweenArcGradient)`) // Set your desired fill color for the empty donut chart
            .attr('opacity', 0.2);
    }

    const findIncomePercentage = (data: DonutData[]) => {
        const incomeData = data.find((d: DonutData) => d.label === 'Income');
        return incomeData ? incomeData.value : 0;
    };

    return <svg ref={svgRef}></svg>;
};

export default CombinedDonutChart;