import React, { Component } from 'react';
import './App.css';

import HeaderNoAuth from './components/noAuth/Header';
import HomeNoAuth from './components/noAuth/Home';

import HeaderAuth from './components/auth/Header';
import HomeAuth from './components/auth/Home';

import {connect} from 'react-redux';

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn
})

class App extends Component {
  render() {
    if (this.props.loggedIn) {
      return (
        <div style={{height:'100%', maxWidth:'80%', verticalAlign:'middle', marginLeft:'10%', marginRight:'10%', marginTop:'1%'}} >
          <HeaderAuth />
          <HomeAuth />
        </div>
      );
    } else {
      return (
        <div style={{height:'100%', maxWidth:'80%', verticalAlign:'middle', marginLeft:'10%', marginRight:'10%', marginTop:'1%'}} >
          <HeaderNoAuth />
          <HomeNoAuth />
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(App)
