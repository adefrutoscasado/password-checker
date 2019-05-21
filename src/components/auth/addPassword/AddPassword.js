import React, { Component } from 'react'
import PasswordStrength from './passwordStrength/PasswordStrength';
import StrengthVisualizator from './strengthVisualizator/StrengthVisualizator'
import { Button, Icon, Dropdown, Header, Segment, Grid, Form, Message } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getPlatforms, postPassword } from './actions'
import {POST_PASSWORD_REQUEST} from './action-types';
import passwordStrengthImage from './../../../assets/password-strength-img.png'


const mapStateToProps = state => ({
  platforms: state.platforms.platforms,
  userId: state.login.userId,
  isFetching: state.isFetching.isFetching,
  resultsPasswordPost: state.isFetching.results[POST_PASSWORD_REQUEST]
})

const mapDispatchToProps = dispatch => {
  return {
    getPlatforms: () => dispatch(getPlatforms()),
    postPassword: (userId, platformId, password, score) => dispatch(postPassword(userId, platformId, password, score))
  }
}

class AddPassword extends Component {
  constructor() {
    super();
    this.state = { platforms: [], error: '' };
  }

  componentDidMount() {
    this.props.getPlatforms();
  }

  componentDidUpdate() {
    console.log('resultsPasswordPost');
    console.log(this.props.resultsPasswordPost);
    const currentSending = this.props.isFetching.includes(POST_PASSWORD_REQUEST);
    if (this.state.sending !== currentSending) {
      if (this.props.resultsPasswordPost && this.props.resultsPasswordPost.message) {
        this.setState({message: this.props.resultsPasswordPost.message, success: this.props.resultsPasswordPost.success})
      }
      this.setState({sending: currentSending});
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value, message: '' });
  }

  // REVIEW: Why dropdown fire different event
  handleDropDown = (e, target) => {
    this.setState({ [target.name]: target.value, message: '' });
  }

  handleClick = async () => {
    // this.setState({sending: true})
    this.props.postPassword(this.props.userId, this.state.platformId, this.state.password, this.state.score)
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
    let platformsOptions = () => this.props.platforms.map(p =>
      ({ key: p.id, value: p.id, text: p.name })
    )

    return (
      <div style={{ height: '100%', maxWidth: '50%', alignContent: 'center', verticalAlign: 'middle', marginLeft: '25%', marginRight: '25%', marginTop: '1%' }}>
        <Header as='h2' color='teal' textAlign='center'>
          CHECK YOUR PASSWORD STRENGTH
        </Header>

        <Segment placeholder>
          <Grid textAlign='left' columns={1} relaxed='very' verticalAlign='middle' stackable>
            <Grid.Column>
              <Form>
                <PasswordStrength fireChange={(target) => this.handleChange({ target })}></PasswordStrength>
                <Form.Field required label='Select a platform:' />
                <Dropdown name='platformId' onChange={this.handleDropDown} placeholder='Select a platform' fluid selection options={platformsOptions()} />
                {this._renderMessage()}
                <Button icon labelPosition='right' onClick={this.handleClick} loading={this.state.sending}>
                  Submit score
                  <Icon name='protect' />
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
        <StrengthVisualizator strength={parseInt(this.state.score) || 0} imageUrl={passwordStrengthImage}></StrengthVisualizator>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPassword)