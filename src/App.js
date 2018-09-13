import React, { Component } from 'react';
import './App.css';

//bootstrap css
import 'bootstrap/dist/css/bootstrap.css';

//COMPONENTS
import AppNavBar from './components/layout/AppNavBar';

import { Button } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavBar />
        <h1>Hello</h1>
        <Button>Open project</Button>
      </div>
    );
  }
}

export default App;
