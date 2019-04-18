import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Menu, Icon} from 'semantic-ui-react'

export default class HeaderNoAuth extends Component {
  state = {
    activeItem: 'login'
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu icon='labeled'>
        <Menu.Item name='login' as={Link} to='/' active={activeItem === 'login'} onClick={this.handleItemClick}>
          <Icon name='sign-in' />
          Login
        </Menu.Item>

        <Menu.Item
          name='sign up'
          as={Link} to='/register'
          active={activeItem === 'sign up'}
          onClick={this.handleItemClick}
        >
          <Icon name='signup' />
          Sign up
        </Menu.Item>
      </Menu>
    )
  }
}


