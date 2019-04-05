import React, { Component } from 'react'
import {Button, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {login} from './actions'

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  loginError: state.login.loginError
})

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(login(username, password))
  }
}

class Login extends Component {

  state = {
    username: '',
    password: ''
  };

  handleChange = ({target}) => {
    this.setState({[target.name]: target.value});
  }

  handleClick = () => {
    this.props.login(this.state.username, this.state.password)
  }

  _renderError(){
    if (this.props.loginError) {
      return (
        <div>
          {this.props.loginError}
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        WELCOME TO PASSWORD CHECKER
        <form>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required={true}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required={true}
          />
        </form>
        <Button icon labelPosition='right' onClick={this.handleClick}>
          Send
          <Icon name='right arrow' />
        </Button>
        {this._renderError()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)