import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { createArticle, updateState } from './Mutations';
import { stateQuery, nextQuery } from './Queries';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  async submitForm(e) {
    let linked;
    let next;
    const { createArticle, client } = this.props;
    e.preventDefault();
    await createArticle({
      variables: { search: this.state.search }
    });

    while (!linked) {
      next = await client.readQuery({ query: nextQuery }).next;
      const { state } = await client.readQuery({ query: stateQuery });
      linked = state.nodes.find(node => node.title === next);
      await createArticle({
        variables: { search: next }
      });
      console.log(linked);
      // console.log(next);
    }
    this.setState({
      search: next
    });
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
        <button type="submit" disabled={false}>Submit</button>
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
  } }),
  graphql(updateState, { name: 'updateState' })
)(withApollo(Form));