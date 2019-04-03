import React, { Component } from 'react'
import {Button, Icon} from 'semantic-ui-react'
import ApiClient from '../helpers/ApiClient'

export default class Schedule extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  handleChange = ({target}) => {
    this.setState({[target.name]: target.value});
  }

  handleClick = async () => {
    await ApiClient.requestRegisterUser(this.state.username, this.state.email, this.state.password, this.state.confirmPassword)
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your e-mail"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="New password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your new password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
        </form>
        <Button icon labelPosition='right' onClick={this.handleClick}>
          Save
          <Icon name='right arrow' />
        </Button>
      </div>
    )
  }
}
