import React, { Component } from 'react';

import Form from './Form';
import Diagram from './Diagram';

class App extends Component {

  render() {
    return (
      <div className="app">
        <Form />
        <Diagram />
      </div>
    );
  }
}

export default App;
