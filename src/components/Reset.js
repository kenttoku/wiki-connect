import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { resetState } from './Mutations';

class Reset extends Component {
  resetState() {
    this.props.resetState();
  }

  render() {
    return (
      <button onClick={() => this.resetState()}>Reset Connections</button>
    );
  }
}

export default graphql(resetState, { name: 'resetState' })(withApollo(Reset));
// export default compose(
//   graphql(createArticle, { name: 'createArticle', options: {
//     update: (store, { data: { createArticle } }) => {
//       const { state } = store.readQuery({ query: stateQuery });
//       const same = state.nodes.find(node => node.title === createArticle.title);

//       if (!same) {
//         const nodes = [...state.nodes, createArticle];
//         const data = {
//           state: {
//             ...state,
//             nodes,
//           }
//         };

//         store.writeQuery({ query: stateQuery, data });
//         store.writeQuery({ query: nextQuery, data: { next: createArticle.next } });
//       }
//     }
//   } })
// )(withApollo(Form));