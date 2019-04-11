import React, { Component } from 'react'
import {Button, Icon, Form, Message, Grid, Segment} from 'semantic-ui-react'
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
    message: '',
    success: false
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
        this.setState({message: this.props.results.message, success: this.props.results.success})
      }
      this.setState({sending: currentSending});
    }
  }

  _renderMessage(){
    if (this.state.success) {
      if(this.state.message) {
        return (
          <Message
            positive
            header='You can now login'
            content={this.state.message}
          />
        )
      }
    } else {
      if (this.state.message) {
        return (
          <Message
            negative
            header='Action Forbidden'
            content={this.state.message}
          />
        )
      }
    }
    return null
  }

  render() {
    return (
      <div style={{height:'100%', maxWidth:'50%', verticalAlign:'middle', marginLeft:'25%', marginRight:'25%', marginTop:'1%'}}>
        <Segment placeholder>
          <Grid columns={1} relaxed='very' verticalAlign='middle' stackable>
            <Grid.Column>
              <Form>
                <Form.Input required
                  icon='user' 
                  iconPosition='left' 
                  label='Enter your new username' 
                  placeholder='Username' 
                  name='username' 
                  value={this.state.username} 
                  onChange={this.handleChange} 
                />
                <Form.Input required
                  icon='lock' 
                  iconPosition='left' 
                  label='New password' 
                  placeholder='New password' 
                  name='password' 
                  type='password' 
                  value={this.state.password} 
                  onChange={this.handleChange} 
                />
                <Form.Input required
                  icon='lock' 
                  iconPosition='left' 
                  label='Confirm new password' 
                  placeholder='Confirm your new password' 
                  name='confirmPassword' 
                  type='password' 
                  value={this.state.confirmPassword} 
                  onChange={this.handleChange} 
                />
                {this._renderMessage()}
                <Button icon labelPosition='right' onClick={this.handleClick} loading={this.state.sending}>
                  Sign up
                  <Icon name='right arrow' />
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)