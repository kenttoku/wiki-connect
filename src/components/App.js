import React, { Component } from 'react';

import Form from './Form';
import Diagram from './Diagram';
import Reset from './Reset';

class App extends Component {

  render() {
    return (
      <div className="app">
        <Form />
        <Reset />
        <Diagram />
      </div>
    );
  }
}

export default App;
