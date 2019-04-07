import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class HeaderAuth extends Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to='/ranking'>Ranking</Link></li>
            <li><Link to='/add-password'>Add new password</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}


