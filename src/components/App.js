import React, { Component } from 'react';
import styled from 'styled-components';

import Diagram from './Diagram';
import Form from './Form';
import Random from './Random';
import Reset from './Reset';

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

const ButtonContainer = styled.div`
  display flex;
  justify-content: space-around;
  margin-top: 8px;
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
            <ButtonContainer>
              <Reset />
              <Random />
            </ButtonContainer>
          </Search>
          <Diagram />
        </main>
      </div>
    );
  }
}

export default App;
