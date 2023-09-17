"use client"
import {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import CombinedDonutChart from "@/app/components/IncomeSource/CombinedDonutChart";
import {createRoot} from "react-dom/client";
import {ScatterData} from "@/app/types/charts/scatterDataType";
import {DonutData} from "@/app/types";

interface DynamicChartProps {
    scatterData: ScatterData[];
    donutAchievedIncomeData: DonutData[];
    width: number;
    height: number;
}

const valueData: DonutData[] = [
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
    {label: 'Category C', value: 1},
    {label: 'Category A', value: 1},
    {label: 'Category B', value: 1},
];

const DynamicChart: React.FC<DynamicChartProps> = ({scatterData, donutAchievedIncomeData, width, height}) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);
            svg.selectAll('*').remove();

            // Create the scales
            const xScale = d3.scaleLinear()
                .domain([0, 8])
                .range([0, width]);

            const yScale = d3.scaleLinear()
                .domain([0, 10])
                .range([height, 0]);

            // Links between circles and center
            const linkGradient = svg
                .append('defs')
                .append('linearGradient')
                .attr('id', 'linkGradient')
                .attr('cx', '95%')
                .attr('cy', '95%')
                .attr('r', '165%');
            // .attr('fx', '70%') // Set a different focal point x-coordinate (direction)
            // .attr('fy', '70%'); // Set a different focal point y-coordinate (direction)

            const linkGradientColors = {
                startColor: '#100D83',
                endColor: '#7417BD',
            };

            linkGradient.append('stop').attr('offset', '10%').attr('stop-color', linkGradientColors.startColor);
            linkGradient.append('stop').attr('offset', '75%').attr('stop-color', linkGradientColors.endColor);
            const linksToCenter = svg.selectAll('.link-to-center')
                .data(scatterData)
                .enter()
                .append('line')
                .attr('class', 'link-to-center')
                .attr('x1', (d) => xScale(d.x))
                .attr('y1', (d) => yScale(d.y))
                .attr('x2', width / 2 + 1e-4) // x-coordinate of the center
                .attr('y2', height / 2) // y-coordinate of the center
                .attr('stroke', 'url(#linkGradient)')
                .attr('stroke-width', 1);

            // Define the gradient colors for regular data points and maxDataPoint
            const gradientColors = {
                startColor: '#7417BD',
                endColor: '#100D83',
            };

            const maxGradientColors = {
                startColor: '#100D83',
                endColor: '#DD115E',
            };

            // Create the regular radial gradient
            const radialGradient = svg
                .append('defs')
                .append('radialGradient')
                .attr('id', 'bubbleGradient')
                .attr('cx', '20%')
                .attr('cy', '20%')
                .attr('r', '135%');

            radialGradient.append('stop').attr('offset', '24%').attr('stop-color', gradientColors.startColor);
            radialGradient.append('stop').attr('offset', '79%').attr('stop-color', gradientColors.endColor);

            // Create the radial gradient for maxDataPoint
            // Find the maximum amount and corresponding data point
            const maxAmount = d3.max(scatterData, (d) => d.value)!;
            const maxDataPoint = scatterData.find((d) => d.value === maxAmount);
            const scalingFactor = Math.sqrt(maxAmount) / 50;

            const maxRadialGradient = svg
                .append('defs')
                .append('radialGradient')
                .attr('id', 'maxBubbleGradient')
                .attr('cx', '95%')
                .attr('cy', '95%')
                .attr('r', '165%');
            // .attr('fx', '70%') // Set a different focal point x-coordinate (direction)
            // .attr('fy', '70%'); // Set a different focal point y-coordinate (direction)

            maxRadialGradient.append('stop').attr('offset', '20%').attr('stop-color', maxGradientColors.startColor);
            maxRadialGradient.append('stop').attr('offset', '79%').attr('stop-color', maxGradientColors.endColor);

            // Create the circles for the scatter plot
            const circles = svg.selectAll<SVGCircleElement, ScatterData>('circle').data(scatterData);

            circles
                .enter()
                .append('circle')
                .merge(circles)
                .attr('cx', (d) => xScale(d.x))
                .attr('cy', (d) => yScale(d.y))
                .attr('r', (d) => Math.sqrt(d.value) / scalingFactor)
                .attr('fill', (d) => (d === maxDataPoint ? 'url(#maxBubbleGradient)' : 'url(#bubbleGradient)'))
                .attr('filter', 'url(#bubbleShadow)');

            circles.exit().remove(); // Remove any circles that are no longer needed

            // Add labels for each data point (amount value)
            const labels = svg
                .selectAll<SVGTextElement, ScatterData>('.label')
                .data(scatterData, (d) => d.value);

            labels
                .enter()
                .append('text')
                .attr('class', 'label')
                .merge(labels)
                .attr('x', (d) => xScale(d.x))
                .attr('y', (d) => yScale(d.y))
                .text((d) => d.value)
                .attr('font-size', '11px')
                .attr('fill', 'white')
                .attr('font-weight', 'bold')
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
            ;
            labels.exit().remove(); // Remove any labels that are no longer needed


            // Update links between circles and center
            svg.selectAll<SVGSVGElement, ScatterData>('.link-to-center')
                .attr('x1', (d) => xScale(d.x))
                .attr('y1', (d) => yScale(d.y))
                .attr('x2', width / 2 + 1e-4) // Add a small offset to make sure the line is visible
                .attr('y2', height / 2);

            // Remove any links that are no longer needed
            svg.selectAll('.link-to-center')
                .data(scatterData)
                .exit()
                .remove();

            // Add CombinedDonutChart within the same SVG group
            const donutChartGroup = svg
                .append('g')
                .attr('transform', `translate(${width / 2 - 150}, ${height / 2 - 150})`);

            /* ######COMBINED DONUT CHART at the center##### */
            const donutContainer = donutChartGroup.node();
            if (donutContainer) {
                const donutRoot = createRoot(donutContainer);
                donutRoot.render(<CombinedDonutChart valueData={valueData} percentageData={donutAchievedIncomeData} width={300} height={300}/>);
            }
        }
    }, [scatterData, donutAchievedIncomeData, width, height]);

    return (
        <div>
            <svg ref={svgRef} width={width} height={height}>
                {/* SVG content will be added here by D3.js */}
                <defs>
                    <filter id="bubbleShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#7417BD" floodOpacity="0.8"/>
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default DynamicChart;