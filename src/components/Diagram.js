import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';
import * as d3 from 'd3';

import { stateQuery } from './Queries';

class Diagram extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    if (this.props.data.state) {
      this.drawChart(this.props.data.state.nodes);
    }
  }

  componentDidUpdate() {
    if (this.props.data.state) {
      this.drawChart(this.props.data.state.nodes);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  drawChart(nodes) {
    let { width, height } = this.state;
    let offset = 50;
    width -= 50;
    height -= 50;

    let links = nodes.map(node => ({
      source: node.title,
      target: nodes.find(targetNode => targetNode.title === node.next)
    }));

    links = links.filter(link => link.target !== undefined);


    let simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink().links(links).id(d => d.title))
      .force('collide', d3.forceCollide(d => d.size ? d.size : 30).radius(d => 70))
      .velocityDecay(0.95)
      .on('tick', ticked);

    simulation.force('link', d3.forceLink().links(links));

    function updateLinks() {
      let lines = d3.select('.links')
        .selectAll('line')
        .data(links);

      lines.enter()
        .append('line')
        .merge(lines)
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      lines.exit().remove();
    }

    function updateNodes() {
      let circles = d3.select('.nodes')
        .selectAll('circle')
        .data(nodes);

      circles.enter()
        .append('circle')
        .attr('r', 5)
        .style('fill', '#FF0000')
        .style('stroke', '#000')
        .style('stroke-width', 1)
        .merge(circles)
        .attr('cx', d => d.x = Math.max(offset, Math.min(width - offset, d.x)))
        .attr('cy', d => d.y = Math.max(offset, Math.min(height - offset, d.y)));

      circles.exit().remove();

      let texts = d3.select('.nodes')
        .selectAll('text')
        .data(nodes);

      texts.enter()
        .append('text')
        .text(d => d.title)
        .merge(texts)
        .attr('x', d => d.x = Math.max(offset, Math.min(width - offset, d.x)))
        .attr('y', d => d.y = Math.max(offset, Math.min(height - offset, d.y))+16)
        .attr('dy', () => 5);

      texts.each(function(d) {
        d.size = (this.getComputedTextLength() / 2) + 5;
      });

      texts.exit().remove();
    }

    function ticked() {
      updateLinks();
      updateNodes();
    }
  }

  render() {
    let { width, height } = this.state;
    width -= 50;
    height -= 50;
    return (
      <div id="content">
        <svg width={width} height={height}>
          <g className="links"></g>
          <g className="nodes"></g>
        </svg>
      </div>);
  }
}

export default graphql(stateQuery)(withApollo(Diagram));
