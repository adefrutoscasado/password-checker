import React, { Component } from 'react'
// @ts-ignore
import { Switch, Route } from 'react-router-dom'

import Login from './login/Login';
import Register from './register/Register';

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
