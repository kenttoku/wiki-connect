import React, { Component } from 'react';

import Diagram from './Diagram';
import Form from './Form';
import Random from './Random';
import Reset from './Reset';

class App extends Component {

  render() {
    return (
      <div className="app">
        <Form />
        <Reset />
        <Random />
        <Diagram />
      </div>
    );
  }
}

export default App;
