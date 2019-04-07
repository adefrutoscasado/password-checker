import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './login/Login';
import Register from './register/Register';
import PasswordStrength from './../PasswordStrength';
import AddPassword from './../AddPassword';

export default class HomeNoAuth extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/register' component={Register}/>
        </Switch>
      </main>
    )
  }
}
