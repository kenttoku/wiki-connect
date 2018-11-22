import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';
import { resetState } from './Mutations';

class Reset extends Component {
  resetState() {
    this.props.resetState();
  }

  render() {
    return <button onClick={() => this.resetState()}>Reset Connections</button>;
  }
}

export default graphql(resetState, { name: 'resetState' })(withApollo(Reset));