import React, { Component } from 'react'
import {Table, Accordion, Header, Icon} from 'semantic-ui-react'
import ApiClient from '../../../helpers/ApiClient'

export default class Ranking extends Component {
  constructor() {
    super();
    this.state = { 
        ranking: []
      };
  }

  componentDidMount() {
    this.updateRanking();
  }

  updateRanking() {
    ApiClient.requestGetRanking()
      .then(response => {
        this.setState({ 
          ranking: response
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _renderWinner(rank) {
    if (rank === 1) {
      return (
        <Icon name='hand spock outline' />
      )
    }
    return null
  }

  render() {
    let rank = 0;
    return (
      <div>
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
                {this.state.ranking.map(user =>
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