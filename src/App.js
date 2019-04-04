import React, { Component } from 'react';
import './App.css';

import HeaderNoAuth from './components/noAuth/Header';
import HomeNoAuth from './components/noAuth/Home';

import HeaderAuth from './components/auth/Header';
import HomeAuth from './components/auth/Home';

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
