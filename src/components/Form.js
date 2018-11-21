import React, { Component } from 'react';
import { graphql, compose, Mutation } from 'react-apollo';
import { createArticle, updateState } from './Mutations';
import { stateQuery } from './Queries';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  submitForm(e, createArticle) {
    e.preventDefault();
    createArticle({
      variables: { search: this.state.search }
    });

    e.target.reset();
  }

  render() {
    const { search } = this.state;
    const { state, updateState } = this.props.data;
    console.log('state: ', state);
    console.log(this.props);
    return (
      <Mutation
        mutation={createArticle}
        variables={{ search }}
        update={(store, { data: { createArticle } }) =>{
          // console.log(nodesQuery);
          // const currentStoreState = store.readQuery({ query: nodesQuery });
          console.log(store);
          // console.log(currentStoreState);
          console.log(createArticle);
          // console.log(updateState);
        }}
      >
        {createArticle => <form onSubmit={e => this.submitForm(e, createArticle)}>
          <label htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            placeholder="Class"
            value={search}
            onChange={e => this.setState({ search: e.target.value })}
          />
          <button type="submit" disabled={false}>Submit</button>
        </form>}
      </Mutation>
    );
  }
}

export default compose(
  graphql(stateQuery),
  graphql(updateState, { name: 'updateState' })
)(Form);