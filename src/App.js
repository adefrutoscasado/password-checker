import React, { Component } from 'react';
import './App.css';

import HeaderNoAuth from './components/HeaderNoAuth';
import HomeNoAuth from './components/HomeNoAuth';

import HeaderAuth from './components/HeaderAuth';
import HomeAuth from './components/HomeAuth';

import {connect} from 'react-redux';

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
})

class App extends Component {
  render() {
    if (this.props.loggedIn) {
      return (
        <div>
          <HeaderAuth />
          <HomeAuth />
        </div>
      );
    } else {
      return (
        <div>
          <HeaderNoAuth />
          <HomeNoAuth />
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(App)
