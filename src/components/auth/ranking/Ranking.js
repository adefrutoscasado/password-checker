import React, { Component } from 'react'
import {Table, Accordion, Header} from 'semantic-ui-react'
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
                <Table.HeaderCell>RANK</Table.HeaderCell>
                <Table.HeaderCell>USERNAME</Table.HeaderCell>
                <Table.HeaderCell>SCORE</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
              <Table.Body>
                {this.state.ranking.map(user =>
                  <Table.Row>
                    <Table.Cell>{rank = rank + 1}</Table.Cell>
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
                                  <Table.HeaderCell>Platform Name</Table.HeaderCell>
                                  <Table.HeaderCell>Score</Table.HeaderCell>
                                </Table.Row>
                              </Table.Header>
                              <Table.Body>
                                {user.user_platforms.map(p =>
                                  <Table.Row>
                                  <Table.Cell>{p.platform.name}</Table.Cell>
                                  <Table.Cell>{p.platform_score}</Table.Cell>
                                  </Table.Row>
                                )}
                              </Table.Body>
                            </div>
                          }
                        }]} styled/>
                    </Table.Cell>
                    <Table.Cell>{user.total_score}</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
      </div>
    )
  }
}