import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route, browserHistory } from 'react-router';

import Header from './components/Header';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
