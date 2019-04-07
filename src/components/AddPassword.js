import React, { Component } from 'react'
import PasswordStrength from './PasswordStrength';
import {Button, Icon} from 'semantic-ui-react'
import ApiClient from '../helpers/ApiClient'
import {connect} from 'react-redux';

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

  handleChange = ({target}) => {
    console.log(target)
    this.setState({[target.name]: target.value, message:''});
  }

  handleClick = async (opts) => {
    // this.setState({sending: true})
    ApiClient.requestSubmitPassword(this.props.userId, this.state.platformId, this.state.password, this.state.score)
      .then(() => {
        window.alert('Score regsitrado!');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <form>
          Check your password strength
          <PasswordStrength fireChange={(target) => this.handleChange({target})}></PasswordStrength>
          <select name='platformId' onChange={this.handleChange}>
            {this.state.platforms.map(p =>
              <option key={p.id} value={p.id}>{p.name}</option>
            )}
          </select>
        </form>
        <Button icon labelPosition='right' onClick={this.handleClick}>
          Submit
          <Icon name='right arrow' />
        </Button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(AddPassword)