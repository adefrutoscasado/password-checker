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
        <Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick}>
          <Icon name='sign-in' />
          <Link to='/'>Login</Link>
        </Menu.Item>

        <Menu.Item
          name='sign up'
          active={activeItem === 'sign up'}
          onClick={this.handleItemClick}
        >
          <Icon name='signup' />
          <Link to='/register'>Sign up</Link>
        </Menu.Item>
      </Menu>
    )
  }
}


