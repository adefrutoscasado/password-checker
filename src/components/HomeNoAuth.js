import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './Login';
import Register from './Register';

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
