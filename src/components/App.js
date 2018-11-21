import React, { Component } from 'react';
import * as d3 from 'd3';

import Form from './Form';

class Graph extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    let width = 1000, height = 800;
    let nodes = [
      { title: 'Cheese', next: 'Dairy product' },
      { title: 'Dairy product', next: 'Food' },
      { title: 'Food', next: 'Plant' },
      { title: 'Plant', next: 'Multicellular organism' },
      { title: 'Multicellular organism', next: 'Organism' },
      { title: 'Organism', next: 'Biology' },
      { title: 'Biology', next: 'Branches of science' },
      { title: 'Branches of science', next: 'Science' },
      { title: 'Science', next: 'Knowledge' },
      { title: 'Knowledge', next: 'Fact' },
      { title: 'Fact', next: 'Reality' },
      { title: 'Reality', next: 'Existence' },
      { title: 'Existence', next: 'Reality' },
      { title: 'Apple', next: 'Fruit' },
      { title: 'Fruit', next: 'Botany' },
      { title: 'Botany', next: 'Science' },
      {
        'title': 'Henry Louis Smith',
        'next': 'Davidson College'
      },
      {
        'title': 'Davidson College',
        'next': 'Liberal arts colleges in the United States'
      },
      {
        'title': 'Liberal arts colleges in the United States',
        'next': 'Undergraduate education'
      },
      {
        'title': 'Undergraduate education',
        'next': 'Higher education'
      },
      {
        'title': 'Higher education',
        'next': 'Formal learning'
      },
      {
        'title': 'Formal learning',
        'next': 'School'
      },
      {
        'title': 'School',
        'next': 'Learning space'
      },
      {
        'title': 'Learning space',
        'next': 'Learning environment'
      },
      {
        'title': 'Learning environment',
        'next': 'Classroom'
      },
      {
        'title': 'Classroom',
        'next': 'Learning space'
      }
    ];

    let links = nodes.map(node => ({
      source: node.title,
      target: nodes.find(targetNode => targetNode.title === node.next)
    }));

    links = links.filter(link => link.target !== undefined);


    let simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink().links(links).id(function(d) {
        return d.title;
      }))
      .force('collision', d3.forceCollide().radius(function(d) {
        return 30;
      }))
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
      let x = d3.select('.nodes')
        .selectAll('circle')
        .data(nodes);

      x.enter()
        .append('circle')
        .attr('r', 5)
        .style('fill', '#555')
        .style('stroke', '#FFF')
        .style('stroke-width', 3)
        .merge(x)
        .attr('cx', function(d) {
          return d.x;
        })
        .attr('cy', function(d) {
          return d.y;
        });

      x.exit().remove();

      let u = d3.select('.nodes')
        .selectAll('text')
        .data(nodes);

      u.enter()
        .append('text')
        .text(function(d) {
          return d.title;
        })
        .merge(u)
        .attr('x', function(d) {
          return d.x;
        })
        .attr('y', function(d) {
          return d.y+16;
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
        <Form />
        <svg width="1000" height="800">
          <g className="links"></g>
          <g className="nodes"></g>
        </svg>
      </div>);
  }
}

export default Graph;
