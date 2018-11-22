import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { resetState } from './Mutations';

class Reset extends Component {
  resetState() {
    this.props.resetState();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.resetState()}>Reset Canvas</button>
      </div>
    );
  }
}

export default graphql(resetState, { name: 'resetState' })(Reset);