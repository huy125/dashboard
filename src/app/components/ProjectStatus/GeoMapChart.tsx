"use client"
import {useEffect, useRef} from "react";
import * as d3 from "d3";
import {path} from "d3";

interface GeoMapChartProps {
    width: number;
    height: number;
}

const GeoMapChart: React.FC<GeoMapChartProps> = ({width, height}) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const svg = d3
            .select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        const projection = d3
            .geoMercator()
            .scale(width / 2 / Math.PI - 40);
            // .center([10, 35]);

        // const geoPathGenerator = d3.geoPath().projection(projection);

        const connectionSvgPath = [
            {type: 'LineString', coordinates: [[2.3522, 48.8566], [-74.006, 40.7128]]},
            {type: "LineString", coordinates: [[100, 60], [-60, -30]]},
            {type: "LineString", coordinates: [[10, -20], [-60, -30]]},
            {type: "LineString", coordinates: [[10, -20], [130, -30]]}
        ];

        const path = d3.geoPath()
            .projection(projection)

        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
            .then(function(data){

            // Draw the map
            svg.append("g")
                .selectAll("path")
                .data(data.features)
                .enter().append("path")
                .attr("fill", "#b8b8b8")
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                .style("stroke", "#fff")
                .style("stroke-width", 0)

            // Add the path
            svg.selectAll("myPath")
                .data(connectionSvgPath)
                .join("path")
                .attr("d", function(d){ return path(d)})
                .style("fill", "none")
                .style("stroke", "orange")
                .style("stroke-width", 7)

        })

    }, [width, height]);

    return (
        <div>
            <svg ref={svgRef} width={width} height={height}>
            </svg>
        </div>
    );
}

export default GeoMapChart;
