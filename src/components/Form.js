import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { createArticle } from './Mutations';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  submitForm(e) {
    e.preventDefault();
    this.props.createArticle({
      variables: { search: this.state.search }
    });

    e.target.reset();
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

export default graphql(createArticle, { name: 'createArticle' })(Form);