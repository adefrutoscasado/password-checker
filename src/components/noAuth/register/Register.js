import React, { Component } from 'react'
import {Button, Icon} from 'semantic-ui-react'
import {registerUser} from './actions';
import {connect} from 'react-redux';
import {DO_REGISTER_REQUEST} from './action-types';

const mapStateToProps = state => {
  return {
    isFetching: state.isFetching.isFetching,
    results: state.isFetching.results[DO_REGISTER_REQUEST]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (email, password, confirmPassword) => dispatch(registerUser(email, password, confirmPassword))
  }
}

class Register extends Component {

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    sending: false
  };

  handleChange = ({target}) => {
    this.setState({[target.name]: target.value});
  }

  handleClick = async () => {
    this.setState({sending: true})
    this.props.registerUser(this.state.email, this.state.password, this.state.confirmPassword)
  }

  componentDidUpdate() {
    const currentSending = this.props.isFetching.includes(DO_REGISTER_REQUEST);
    if (this.state.sending !== currentSending) {
      if (this.props.results) {
      }
      this.setState({sending: currentSending});
    }
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
