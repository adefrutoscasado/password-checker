import React, { Component } from 'react'
import {Accordion, Header, Checkbox, Button, Icon} from 'semantic-ui-react'
import ApiClient from '../../../helpers/ApiClient'

export default class Profile extends Component {
  constructor() {
    super();
    this.state = { user: null, graphBody: null, error: '' };
  }

  componentDidMount() {
    this.updateUser();
  }

  handleClick = () => {
    // this.setState({sending: true})
    ApiClient.requestUpsertUser(4, this.state.graphBody)
      .then(() => {
        window.alert('Updated successfully!')
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateUser() {
    ApiClient.requestGetUser(4)
      .then((user) => {
        this.setState({ user }, () => this.updateGraphBody());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateGraphBody() {
    const graphBody = this.state.user.user_platforms.map(u_p => 
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
      this.addPasswordFromGroup(data.userplatform, data.value)
    else
      this.removePasswordFromGroup(data.userplatform, data.value)
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
      return (<Accordion defaultActiveIndex={0} panels={renderPlatforms(this.state.user.user_platforms)} styled />)
    }

    return (
      <div>
        <Header as='h2' color='teal' textAlign='center'>
          Profile management
        </Header>
        {this.state.user ? renderProfile() : renderProgress()}
        <Button icon labelPosition='right' onClick={this.handleClick}>
          Save changes
          <Icon name='save' />
        </Button>
      </div>
    )
  }
}
