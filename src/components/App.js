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

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  border-top: 1px solid #ccc;
  color: #888;
`;

const FooterContent = styled.div`
  padding-right: 10px;
`;

const Link = styled.a`
  color: #333
`;

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header>
          <h1>WikiConnect</h1>
          <p>The first link (not in parentheses or italics) in a Wikipedia article will take you to a broader subject. Repeating this can connect subjects that are seemingly unreleated. See for yourself by searching for a term! (Example canvas will reset on your first search)
          </p>
        </Header>
        <main>
          <Search>
            <Form />
          </Search>
          <Diagram />
        </main>
        <Footer>
          <FooterContent>
            Written by: <Link href="https://github.com/kenttoku">Kent Tokunaga
            </Link>
          </FooterContent>
          <FooterContent>
            <Link href="https://github.com/kenttoku/wiki-connect">Source Code
            </Link> available on GitHub
          </FooterContent>
          <FooterContent>
            Inspired by: <Link href="https://en.wikipedia.org/wiki/Wikipedia:Getting_to_Philosophy">Getting to Philosophy
            </Link>
          </FooterContent>
        </Footer>
      </div>
    );
  }
}

export default App;
