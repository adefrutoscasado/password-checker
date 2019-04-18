import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'
import configureStore from '../../redux/redux';

const { store } = configureStore()

export default class HeaderNoAuth extends Component {
  state = {
    activeItem: 'ranking'
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    if (name === 'logout') {
      store.dispatch({ type: 'LOGOUT' })
    }
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu icon='labeled'>
        <Menu.Item name='ranking' as={Link} to='ranking' active={activeItem === 'ranking'} onClick={this.handleItemClick}>
          <Icon name='trophy' />
          Ranking
        </Menu.Item>

        <Menu.Item
          name='add'
          as={Link} to='add-password'
          active={activeItem === 'add'}
          onClick={this.handleItemClick}
        >
          <Icon name='key' />
          Add password
        </Menu.Item>

        <Menu.Item
          name='logout'
          as={Link} to='sign-out'
          active={activeItem === 'logout'}
          onClick={this.handleItemClick}
          position='right'
        >
          <Icon name='sign-out' />
          Logout
        </Menu.Item>
      </Menu>
    )
  }
}


