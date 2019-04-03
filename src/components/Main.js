import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home';
import Register from './Register';

export default class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/register' component={Register}/>
        </Switch>
      </main>
    )
  }
}
