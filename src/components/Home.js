import React, { Component } from 'react'
import {Button, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {fetchLogin} from '../redux/actions'

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  loginError: state.loginError
})

const mapDispatchToProps = dispatch => {
  return {
    fetchLogin: (email, password) => dispatch(fetchLogin(email, password))
  }
}

class Home extends Component {

  state = {
    email: '',
    password: ''
  };

  handleChange = ({target}) => {
    this.setState({[target.name]: target.value});
  }

  handleClick = () => {
    this.props.fetchLogin(this.state.email, this.state.password)
  }

  render() {
    return (
      <div>
        WELCOME TO PASSWORD CHECKER
        <form>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={this.state.email}
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
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)