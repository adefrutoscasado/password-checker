import React, { Component } from 'react'
import {Button, Icon} from 'semantic-ui-react'
import ApiClient from '../../../helpers/ApiClient'
import {registerUser} from './actions';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  loginError: state.loginError
})

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (email, password, confirmPassword) => dispatch(registerUser(email, password, confirmPassword))
  }
}

class Register extends Component {

  state = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  handleChange = ({target}) => {
    this.setState({[target.name]: target.value});
  }

  handleClick = async () => {
    await ApiClient.requestRegisterUser(this.state.email, this.state.password, this.state.confirmPassword)
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="email"
            name="email"
            placeholder="Enter your e-mail"
            value={this.state.email}
            onChange={this.handleChange}
            required={true}
          />
          <input
            type="password"
            name="password"
            placeholder="New password"
            value={this.state.password}
            onChange={this.handleChange}
            required={true}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your new password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            required={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)
