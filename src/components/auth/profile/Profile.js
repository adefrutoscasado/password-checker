import React, { Component } from 'react'
import {Accordion, Header, Checkbox, Button, Icon} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getUser, upsertUser } from './actions'

const mapStateToProps = state => ({
  userId: state.login.userId,
  user: state.profile.user,
})

const mapDispatchToProps = dispatch => {
  return {
    getUser: (userId) => dispatch(getUser(userId)),
    upsertUser: (userId, data) => dispatch(upsertUser(userId, data))
  }
}

class Profile extends Component {
  constructor() {
    super();
    this.state = { user: null, graphBody: null, error: '' };
  }

  componentDidMount() {
    this.props.getUser(this.props.userId)
  }

  componentWillReceiveProps(prevProps) {
    if (this.props.user.user_platforms)
      this.updateGraphBody()
  }

  handleClick = () => {
    // this.setState({sending: true})
    this.props.upsertUser(this.props.userId, this.state.graphBody)
  }

  updateGraphBody() {
    const graphBody = this.props.user.user_platforms.map(u_p => 
      ({
        id: u_p.id,
        passwords: u_p.passwords.map(p => ({id: p.id}))
      })
    )
    this.setState({graphBody})
  }

  getClone(reference) {
    return JSON.parse(JSON.stringify(reference));
  }

  removePasswordFromPlatform(userPlatformId, id) {
    let graphBody = this.getClone(this.state.graphBody); // clone this.state.graphBody. https://reactjs.org/docs/react-component.html#state

    const userPlatform = graphBody.find(g => g.id === userPlatformId);
    if (userPlatform) {
      userPlatform.passwords = userPlatform.passwords.filter(item => item.id !== id);
      this.setState({graphBody});
    }
  }

  addPasswordFromPlatform(userPlatformId, id) {
    let graphBody = this.getClone(this.state.graphBody); // clone this.state.graphBody. https://reactjs.org/docs/react-component.html#state
    
    const userPlatform = graphBody.find(g => g.id === userPlatformId);
    if (userPlatform) {
      userPlatform.passwords.push({id});
      this.setState({graphBody});
    }
  }
  
  handleChange = (e, {data}) => {
    if (data.checked)
      this.addPasswordFromPlatform(data.userplatform, data.value)
    else
      this.removePasswordFromPlatform(data.userplatform, data.value)
  }


  render() {
    let passwordContainerStyle = { display: 'flex', flexDirection: 'column', justifyContent: 'left', padding:'10px'}

    let renderPasswords = (u_pId, passwords) => {
      return passwords.map((p) =>
        <div style={passwordContainerStyle}>
          <Checkbox key={p.id} userplatform={u_pId} label={p.score} value={p.id} defaultChecked onChange={(e, data) => this.handleChange(e, {data})} />
        </div>
      )
    }

    const renderPlatforms = (userPlatforms) => {
      return userPlatforms.map((u_p) =>
        ({ key: u_p.id, title: u_p.platform.name, content: renderPasswords(u_p.id, u_p.passwords)})
      )
    }

    const renderProgress = () =>  {
      return <h3>Loading...</h3>;
    }

    const renderProfile = () => {
      return (<Accordion defaultActiveIndex={0} panels={renderPlatforms(this.props.user.user_platforms)} styled />)
    }

    console.log(this.props)

    return (
      <div>
        <Header as='h2' color='teal' textAlign='center'>
          Profile management
        </Header>
        {this.props.user.user_platforms ? renderProfile() : renderProgress()}
        <Button icon labelPosition='right' onClick={this.handleClick}>
          Save changes
          <Icon name='save' />
        </Button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
