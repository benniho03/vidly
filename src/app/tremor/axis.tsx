"use client";

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

type Video = {
    id: string | null;
    videoId?: string | null;
    title?: string | null;
    thumbnail?: string | null;
    description?: string | null;
    channel?: string | null;
    likeCount?: number | null;
    commentCount?: number | null;
    viewCount?: number | null;
    duration?: number | null;
    publishedAt?: Date | null;
    caption?: string | null;
    tags?: string[] | null;
    topicCategories?: string[] | null;
    language?: string | null;
    query?: string | null;
};

interface D3ChartProps {
    videos: Video[];
}

const D3Chart: React.FC<D3ChartProps> = ({ videos = [] }) => {
    const chartRef = useRef<SVGSVGElement | null>(null);
    const xAxisRef = useRef<SVGGElement | null>(null);
    const yAxisRef = useRef<SVGGElement | null>(null);

    useEffect(() => {
        if (chartRef.current && videos.length > 0) {
            // Sortiere die Daten in absteigender Reihenfolge
            const data = videos
                .map(video => ({ title: video.title, viewCount: video.viewCount }))
                .filter(({ viewCount }) => viewCount !== null && viewCount !== undefined)
                .sort((a, b) => b.viewCount - a.viewCount);

            console.log("Daten: ", data);

            const width = 60 * data.length;
            const height = 500;

            const svg = d3.select(chartRef.current)
                .attr('width', width + 100) // Breite um 100 Pixel erweitern, um Platz für die y-Achsenbeschriftung zu schaffen
                .attr('height', height + 50); // Höhe um 50 Pixel erweitern, um Platz für die x-Achsenbeschriftung zu schaffen

            // Entferne alte Elemente
            svg.selectAll('*').remove();

            // Skala für die Höhe der Balken
            const yScale = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.viewCount) as number])
                .range([height, 0]);

            svg.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('x', (d, i) => i * 60)
                .attr('y', d => yScale(d.viewCount))
                .attr('width', 50)
                .attr('height', d => height - yScale(d.viewCount))
                .attr('fill', 'blue');

            const xAxis = d3.axisBottom(d3.scaleBand()
                .domain(data.map(d => d.title as string))
                .range([0, width])
                .padding(0.1)
            );

            const xAxisGroup = svg.append('g')
                .call(xAxis)
                .attr('transform', `translate(0, ${height})`)
                .attr('class', 'x-axis')
                .selectAll('text') // Wähle alle Textelemente der x-Achse aus
                .style('text-anchor', 'middle') // Ändere die Textausrichtung auf das Mittlere
                .attr('dy', '1em') // Verschiebe den Text nach unten
                .attr('transform', (d, i) => `translate(${i * 60 + 30}, 20) rotate(-90)`); // Anpassen der Transformation

            // y-Achse hinzufügen
            const yAxis = d3.axisLeft(yScale);

            const yAxisGroup = svg.append('g')
                .call(yAxis)
                .attr('class', 'y-axis')
                .attr('transform', `translate(50, 0)`); // Hier wird die y-Achse auf der linken Seite positioniert

            // y-Achsenbeschriftung hinzufügen
            svg.append('text')
                .attr('transform', 'rotate(-90)')
                .attr('x', -height / 2)
                .attr('y', 20) // Verschiebung nach unten, um den Text zu zentrieren
                .attr('dy', '1em')
                .style('text-anchor', 'middle')
                .text('View Count');
        }
    }, [videos]);

    return (
        <div style={{ overflowX: 'scroll' }}>
            <svg ref={chartRef}></svg>
        </div>
    );
};

export default D3Chart;
