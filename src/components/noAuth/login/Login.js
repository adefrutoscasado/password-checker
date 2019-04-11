import React, { Component } from 'react'
import {Button, Icon, Form, Message, Grid, Segment, Header} from 'semantic-ui-react'
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
        <Message
          error
          header='Action Forbidden'
          content={this.props.loginError}
        />
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div style={{height:'100%', maxWidth:'50%', verticalAlign:'middle', marginLeft:'25%', marginRight:'25%', marginTop:'1%'}}>
        <Header as='h2' color='teal' textAlign='center'>
          WELCOME TO PASSWORD CHECKER
        </Header>
        
        <Segment placeholder>
          <Grid columns={1} relaxed='very' verticalAlign='middle' stackable>
            <Grid.Column>
              <Form error>
                <Form.Input icon='user' iconPosition='left' label='Username:' placeholder='Username' name='username' value={this.state.username} onChange={this.handleChange} />
                <Form.Input icon='lock' iconPosition='left' label='Password:' placeholder='Password' name='password' type='password' value={this.state.password} onChange={this.handleChange} />
                {this._renderError()}
                <Button icon labelPosition='right' onClick={this.handleClick}>
                  Login
                  <Icon name='sign-in' />
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)