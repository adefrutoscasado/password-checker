import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Ranking from './ranking/Ranking';
import AddPassword from './addPassword/AddPassword';

export default class HomeAuth extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Ranking}/>
          <Route path='/ranking' component={Ranking}/>
          <Route path='/add-password' component={AddPassword}/>
        </Switch>
      </main>
    )
  }
}
