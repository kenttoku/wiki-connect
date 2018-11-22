import React, { Component } from 'react';
import styled from 'styled-components';

import Diagram from './Diagram';
import Form from './Form';

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  max-width: 960px;

  @media (min-width: 400px) {
    width: 85%;
  }

  @media (min-width: 550px) {
    width: 80%;
  }
`;

const Search = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header>
          <h1>WikiConnect</h1>
          <p>The first link (not in parentheses or italics) in a Wikipedia article will take you to a broader subject. Repeating this can connect subjects that are seemingly unreleated. See for yourself by searching for a term! (Canvas will reset on your first search)</p>
        </Header>
        <main>
          <Search>
            <Form />
          </Search>
          <Diagram />
        </main>
      </div>
    );
  }
}

export default App;
