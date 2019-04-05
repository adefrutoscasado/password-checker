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
    registerUser: (username, password, confirmPassword) => dispatch(registerUser(username, password, confirmPassword))
  }
}

class Register extends Component {

  state = {
    username: '',
    password: '',
    confirmPassword: '',
    sending: false,
    message: ''
  };

  handleChange = ({target}) => {
    this.setState({[target.name]: target.value, message:''});
  }

  handleClick = async () => {
    this.setState({sending: true})
    this.props.registerUser(this.state.username, this.state.password, this.state.confirmPassword)
  }

  componentDidUpdate() {
    const currentSending = this.props.isFetching.includes(DO_REGISTER_REQUEST);
    if (this.state.sending !== currentSending) {
      if (this.props.results && this.props.results.message) {
        this.setState({message: this.props.results.message})
      }
      this.setState({sending: currentSending});
    }
  }

  _renderMessage(){
    if (this.state.message) {
      return (
        <div>
          {this.state.message}
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            name="username"
            placeholder="Enter your new username"
            value={this.state.username}
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
        {this._renderMessage()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)