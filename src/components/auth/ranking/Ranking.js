import React, { Component } from 'react'
import {Table, Accordion, Header, Icon} from 'semantic-ui-react'
import {getRanking} from './actions';
import {connect} from 'react-redux';
import Confetti from 'react-confetti-canvas';
import './Ranking.css';

const mapStateToProps = state => {
  return {
    ranking: state.ranking.ranking,
    username: state.login.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRanking: () => dispatch(getRanking())
  }
}

class NonConnectedRanking extends Component {

  componentDidMount() {
    this.props.getRanking();
  }

  _renderWinner(rank) {
    if (rank === 1) {
      return (
        // <Icon name='hand spock outline' />
        <span role="img" aria-label="unicorn">🦄</span>
      )
    }
    return null
  }

  _renderConfetti() {
    if (this.props.ranking[0] && this.props.ranking[0].username && (this.props.username === this.props.ranking[0].username)) {
      return (
        <Confetti />
      )
    } else {
      return null
    }
  }

  render() {
    let rank = 0;
    return (
      <div>
        {this._renderConfetti()}
        <Header as='h2' color='teal' textAlign='center'>
          RANKING
        </Header>
        <div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'>RANK</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>USERNAME</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>SCORE</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
              <Table.Body>
                {this.props.ranking.map(user =>
                  <Table.Row>
                    <Table.Cell textAlign='center'>{rank = rank + 1} {this._renderWinner(rank)}</Table.Cell>
                    <Table.Cell>
                      <Accordion 
                        defaultActiveIndex={1} 
                        panels={[{
                          title: user.username, 
                          content: {
                            content: 
                            <div>
                              <Table.Header>
                                <Table.Row>
                                  <Table.HeaderCell textAlign='center'>Platform Name</Table.HeaderCell>
                                  <Table.HeaderCell textAlign='center'>Score</Table.HeaderCell>
                                </Table.Row>
                              </Table.Header>
                              <Table.Body>
                                {user.user_platforms.map(p =>
                                  <Table.Row>
                                  <Table.Cell textAlign='center'>{p.platform.name}</Table.Cell>
                                  <Table.Cell textAlign='center'>{p.platform_score}</Table.Cell>
                                  </Table.Row>
                                )}
                              </Table.Body>
                            </div>
                          }
                        }]} styled/>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>{user.total_score}</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NonConnectedRanking)