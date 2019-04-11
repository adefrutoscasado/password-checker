import React, { Component } from 'react'
import PasswordStrength from './PasswordStrength';
import { Button, Icon, Dropdown } from 'semantic-ui-react'
import ApiClient from '../helpers/ApiClient'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  userId: state.login.userId
})

class AddPassword extends Component {
  constructor() {
    super();
    this.state = { platforms: [] };
  }

  componentDidMount() {
    this.updatePlatforms(this.props.platforms);
  }

  updatePlatforms() {
    ApiClient.requestGetPlatforms()
      .then((platforms) => {
        this.setState({ platforms });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value, message: '' });
  }

  // REVIEW: Why dropdown fire different event
  handleDropDown = (e,target) => {
    this.setState({ [target.name]: target.value, message: '' });
  }

  handleClick = async (opts) => {
    // this.setState({sending: true})
    ApiClient.requestSubmitPassword(this.props.userId, this.state.platformId, this.state.password, this.state.score)
      .then(() => {
        window.alert('Score registrado!');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    let platformsOptions = this.state.platforms.map(p => 
      {return {key: p.id, value: p.id, text: p.name}}
    )
    return (
      <div>
        <form>
          Check your password strength
          <PasswordStrength fireChange={(target) => this.handleChange({ target })}></PasswordStrength>
          <Dropdown name='platformId' onChange={this.handleDropDown} placeholder='Selecciona una plataforma' fluid selection options={platformsOptions} />
        </form>
        <Button icon labelPosition='right' onClick={this.handleClick}>
          Registrar puntuacion
          <Icon name='right arrow' />
        </Button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(AddPassword)