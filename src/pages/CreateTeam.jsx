import React, { Component } from 'react'
import {
  Container,
  Input,
  Header,
  Button,
  Form,
  Message
} from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const CREATE_TEAM = gql`
  mutation createTeam($name: String!) {
    createTeam(name: $name) {
      code
      message
      team {
        id
      }
      errors {
        path
        message
      }
    }
  }
`

class CreateTeam extends Component {
  state = {
    name: '',
    errors: {
      name: false
    }
  }

  onChange = ({ target }) => {
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }

  onSubmit = createTeam => {
    this.setState({ errors: {} })
    const { name } = this.state
    createTeam({ variables: { name } })
  }

  onCompleted = ({ createTeam }) => {
    const { errors: errorList, team, code } = createTeam
    if (code === '200') {
      this.props.history.push(`/view-team/${team.id}`)
    }
  }

  render() {
    const { name, errors } = this.state

    return (
      <Mutation mutation={CREATE_TEAM} onCompleted={this.onCompleted}>
        {(createTeam, { data }) => (
          <Container text>
            <Header as="h2"> Create Team</Header>
            <Form>
              <Form.Field error={errors.name}>
                <Input
                  onChange={this.onChange}
                  value={name}
                  name="name"
                  placeholder="Team Name"
                  fluid
                />
              </Form.Field>

              <Button onClick={() => this.onSubmit(createTeam)}>Submit</Button>
            </Form>
            {data && data.createTeam.code !== '200' && (
              <Message
                list={data.createTeam.errors.map(err => err.message)}
                error
                header={`${data.createTeam.message} with your submission`}
              />
            )}
          </Container>
        )}
      </Mutation>
    )
  }
}

export default CreateTeam
