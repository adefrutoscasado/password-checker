import React, { Component } from 'react';
import './App.css';

import {SessionState} from './components/noAuth/login/types';

import HeaderNoAuth from './components/noAuth/Header';
import HomeNoAuth from './components/noAuth/Home';

import HeaderAuth from './components/auth/Header';
import HomeAuth from './components/auth/Home';

// @ts-ignore
import {connect} from 'react-redux';

const mapStateToProps = (state: {login: SessionState}) => ({
  loggedIn: state.login.loggedIn
})

interface Props {
  loggedIn: boolean;
}

class App extends Component <Props> {
  render() {
    let style = {height:'100%', maxWidth:'80%', verticalAlign:'middle', marginLeft:'10%', marginRight:'10%', marginTop:'1%'}
    if (this.props.loggedIn) {
      return (
        <div style={style} >
          <HeaderAuth />
          <HomeAuth />
        </div>
      );
    } else {
      return (
        <div style={style} >
          <HeaderNoAuth />
          <HomeNoAuth />
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(App)
