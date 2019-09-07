import React, { useState } from 'react'
import {
  Container,
  Input,
  Header,
  Button,
  Form,
  Message
} from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
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

const CreateTeam = ({ history }) => {
  const [createTeam, { data, loading }] = useMutation(CREATE_TEAM)
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function onSubmit() {
    createTeam({ variables: { name } })
    if (data && data.createTeam)
      history.push(`/view-team/${data.createTeam.team.id}`)
  }

  return (
    <Container text>
      <Header as="h2"> Create Team</Header>
      <Form>
        <Form.Field error={error}>
          <Input
            onChange={({ target }) => setName(target.value)}
            value={name}
            name="name"
            placeholder="Team Name"
            fluid
          />
        </Form.Field>

        <Button onClick={onSubmit}>Submit</Button>
      </Form>
      {/* {data && data.createTeam.code !== '200' && (
        <Message
          list={data.createTeam.errors.map(err => err.message)}
          error
          header={`${data.createTeam.message} with your submission`}
        />
      )} */}
    </Container>
  )
}

export default CreateTeam
