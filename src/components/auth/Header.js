import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Menu, Icon} from 'semantic-ui-react'

export default class HeaderNoAuth extends Component {
  state = {
    activeItem: 'ranking'
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu icon='labeled'>
        <Menu.Item name='ranking' active={activeItem === 'ranking'} onClick={this.handleItemClick}>
          <Icon name='trophy' />
          <Link to='/ranking'>Ranking</Link>
        </Menu.Item>

        <Menu.Item
          name='add'
          active={activeItem === 'add'}
          onClick={this.handleItemClick}
        >
          <Icon name='key' />
          <Link to='/add-password'>Add new password</Link>
        </Menu.Item>

        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={this.handleItemClick}
          position='right'
        >
          <Icon name='sign-out' />
          <Link to='/'>Logout</Link>
        </Menu.Item>
      </Menu>
    )
  }
}


