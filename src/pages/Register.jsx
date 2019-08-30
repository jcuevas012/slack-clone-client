import React, { Component } from 'react'
import {
  Message,
  Container,
  Input,
  Header,
  Button,
  Form
} from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const REGISTER = gql`
  mutation register($newUser: userInput!) {
    register(newUser: $newUser) {
      code
      message
      errors {
        path
        message
      }
    }
  }
`

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: ''
  }

  onChange = ({ target }) => {
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }

  onSubmit = register => {
    register({ variables: { newUser: this.state } })
  }

  onError = (data, name) =>
    data &&
    data.register &&
    data.register.errors &&
    data.register.errors.find(x => x.path === name)

  render() {
    const { username, email, password } = this.state

    return (
      <Mutation mutation={REGISTER}>
        {(register, { data }) => (
          <Container text>
            <Header as="h2"> Register</Header>
            <Form>
              <Form.Field error={this.onError(data, 'username')}>
                <Input
                  onChange={this.onChange}
                  name="username"
                  value={username}
                  placeholder="Username"
                  fluid
                />
              </Form.Field>
              <Form.Field error={this.onError(data, 'email')}>
                <Input
                  onChange={this.onChange}
                  value={email}
                  name="email"
                  placeholder="Email"
                  fluid
                />
              </Form.Field>
              <Form.Field error={this.onError(data, 'password')}>
                <Input
                  onChange={this.onChange}
                  value={password}
                  name="password"
                  placeholder="Password"
                  type="password"
                  fluid
                />
              </Form.Field>
              <Button onClick={() => this.onSubmit(register)}>Submit</Button>
            </Form>
            {data && data.register.code !== '200' && (
              <Message
                list={
                  data &&
                  data.register &&
                  data.register.errors.map(x => x.message)
                }
              />
            )}
          </Container>
        )}
      </Mutation>
    )
  }
}

export default Register
