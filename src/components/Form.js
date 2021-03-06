import React, { Component } from 'react';
import styled from 'styled-components';
import { graphql, compose, withApollo } from 'react-apollo';
import { createArticle, resetState } from './Mutations';
import { stateQuery, nextQuery, resetQuery } from './Queries';

import Random from './Random';
import Reset from './Reset';

const ButtonContainer = styled.div`
  display flex;
  justify-content: space-around;
  margin-top: 8px;
`;

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      words: {},
      disabled: false
    };
    this.setDisabled = this.setDisabled.bind(this);
  }

  setDisabled(disabled) {
    this.setState({ disabled });
  }

  async submitForm(e) {
    let linked;
    let next;
    const { createArticle, resetState, client } = this.props;
    e.preventDefault();

    this.setDisabled(true);

    const { reset } = await client.readQuery({ query: resetQuery });
    if (reset) {
      await resetState();
      await client.writeQuery({ query: resetQuery, data: { reset: false } });
    }

    const search = this.state.search;
    this.setState({ search: '' });
    await createArticle({ variables: { search } });

    const { state: { nodes } } = await client.readQuery({ query: stateQuery });
    const words = {};
    nodes.forEach(node => {
      words[node.title] = node.title;
    });

    this.setState({ words });

    while (!linked) {
      next = await client.readQuery({ query: nextQuery }).next;
      linked = this.state.words[next];
      await createArticle({
        variables: { search: next }
      });
      const words = {};
      words[next] = next;
      this.setState({ words: { ...this.state.words, ...words, } });
    }

    this.setDisabled(false);
  }

  render() {
    const { search } = this.state;
    return (
      <div>
        <form onSubmit={e => this.submitForm(e)}>
          <label htmlFor="search">Search </label>
          <input
            type="text"
            id="search"
            placeholder="Word"
            value={search}
            onChange={e => this.setState({ search: e.target.value })}
          />
          <button type="submit" disabled={!this.state.search || this.state.disabled}>Connect!</button>
        </form>
        <ButtonContainer>
          <Reset disabled={this.state.disabled}/>
          <Random disabled={this.state.disabled} setDisabled={this.setDisabled}/>
        </ButtonContainer>
      </div>
    );
  }
}

export default compose(
  graphql(nextQuery),
  graphql(resetQuery),
  graphql(resetState, { name: 'resetState' }),
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