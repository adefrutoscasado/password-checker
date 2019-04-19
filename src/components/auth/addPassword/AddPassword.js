import React, { Component } from 'react'
import PasswordStrength from './passwordStrength/PasswordStrength';
import StrengthVisualizator from './strengthVisualizator/StrengthVisualizator'
import { Button, Icon, Dropdown, Header, Segment, Grid, Form, Message } from 'semantic-ui-react'
import ApiClient from '../../../helpers/ApiClient'
import { connect } from 'react-redux';
import { getPlatforms, postPassword } from './actions'
import passwordStrengthImage from './../../../assets/password-strength-img.png'


const mapStateToProps = state => ({
  platforms: state.platforms.platforms,
  userId: state.login.userId
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

  _renderError() {
    if (this.state.error) {
      return (
        <Message
          negative
          header='Action Forbidden'
          content={this.state.error}
        />
      )
    } else {
      return null
    }
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
                {this._renderError()}
                <Button icon labelPosition='right' onClick={this.handleClick}>
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