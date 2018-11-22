import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { createArticle } from './Mutations';
import { stateQuery, nextQuery } from './Queries';

class Form extends Component {
  async buttonClicked() {
    let linked;
    let next;
    const { createArticle, client } = this.props;

    const search = this.state.search;
    await createArticle({ variables: { search } });

    while (!linked) {
      next = await client.readQuery({ query: nextQuery }).next;
      linked = this.state.words[next];
      await createArticle({
        variables: { search: next }
      });
      const words = {};
      words[next] = next;
    }
  }

  render() {
    const { search } = this.state;
    return (
      <form onSubmit={e => this.submitForm(e)}>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          placeholder="Class"
          value={search}
          onChange={e => this.setState({ search: e.target.value })}
        />
        <button type="submit" disabled={!this.state.search}>Submit</button>
      </form>
    );
  }
}

export default compose(
  graphql(nextQuery),
  graphql(createArticle, { name: 'createArticle', options: {
    update: (store, { data: { createArticle } }) => {
      const { state } = store.readQuery({ query: stateQuery });
      const same = state.nodes.find(node => node.title === createArticle.title);

      if (!same) {
        const nodes = [...state.nodes, createArticle];
        const data = {
          state: {
            ...state,
            nodes,
          }
        };

        store.writeQuery({ query: stateQuery, data });
        store.writeQuery({ query: nextQuery, data: { next: createArticle.next } });
      }
    }
  } })
)(withApollo(Form));