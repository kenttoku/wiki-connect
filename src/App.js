import React, { Component } from 'react';
import * as d3 from 'd3';

class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    let width = 400, height = 300;
    let nodes = [
      { name: 'A' },
      { name: 'B' },
      { name: 'C' },
      { name: 'D' },
      { name: 'E' },
      { name: 'F' },
      { name: 'G' },
      { name: 'H' },
    ];

    let links = [
      { source: 0, target: 1 },
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 4 },
      { source: 4, target: 5 },
      { source: 5, target: 6 },
      { source: 6, target: 7 },
      { source: 7, target: 5 },
    ];


    let simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink().links(links))
      .on('tick', ticked);

    simulation.force('link', d3.forceLink().links(links));

    function updateLinks() {
      let u = d3.select('.links')
        .selectAll('line')
        .data(links);

      u.enter()
        .append('line')
        .merge(u)
        .attr('x1', function(d) {
          return d.source.x;
        })
        .attr('y1', function(d) {
          return d.source.y;
        })
        .attr('x2', function(d) {
          return d.target.x;
        })
        .attr('y2', function(d) {
          return d.target.y;
        });

      u.exit().remove();
    }

    function updateNodes() {
      let u = d3.select('.nodes')
        .selectAll('text')
        .data(nodes);

      u.enter()
        .append('text')
        .text(function(d) {
          return d.name;
        })
        .merge(u)
        .attr('x', function(d) {
          return d.x;
        })
        .attr('y', function(d) {
          return d.y;
        })
        .attr('dy', function(d) {
          return 5;
        });

      u.exit().remove();
    }

    function ticked() {
      updateLinks();
      updateNodes();
    }
  }

  render() {
    return (
      <div id="content">
        <svg width="400" height="300">
          <g className="links"></g>
          <g className="nodes"></g>
        </svg>
      </div>);
  }
}

export default BarChart;
