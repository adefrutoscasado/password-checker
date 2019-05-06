import React, { Component, ChangeEvent } from 'react'
import {Button, Icon, Form, Message, Grid, Segment} from 'semantic-ui-react'
import {registerUser} from './actions';
// @ts-ignore
import {connect} from 'react-redux';
import {DO_REGISTER_REQUEST} from './action-types';
import { FetchingState } from '../../redux-is-fetching/types';

const mapStateToProps = (state: {isFetching: FetchingState}) => {
  return {
    isFetching: state.isFetching.isFetching,
    results: state.isFetching.results[DO_REGISTER_REQUEST]
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    registerUser: (username: string, password: string, confirmPassword: string) => dispatch(registerUser(username, password, confirmPassword))
  }
}

interface Props {
  isFetching: string[];
  results?: {
      success: boolean;
      message?: string;
  }
  registerUser(username: string, password: string, confirmPassword: string): void;
}

interface State {
  username: string;
  password: string;
  confirmPassword: string;
  sending: boolean;
  message: string;
  success: boolean;
}

class Register extends Component <Props, State> {

  state: State = {
    username: '',
    password: '',
    confirmPassword: '',
    sending: false,
    message: '',
    success: false
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let change: any = {};
    change[e.target.name] = e.target.value
    this.setState(change);
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
                  <Icon name='signup' />
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