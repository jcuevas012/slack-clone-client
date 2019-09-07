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

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      code
      message
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`

const Login = ({ history }) => {
  const [login, { data, loading }] = useMutation(LOGIN)

  const [payload, setPayload] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: false,
    password: false
  })

  function onChange({ target }) {
    const { name, value } = target
    let state = { ...payload }
    state[name] = value
    setPayload(state)
  }

  async function onSubmit() {
    const { email, password } = payload
    await login({ variables: { email, password } })

    if (data && data.login.code !== '200') {
      let error = {}
      data.login.errors.forEach((err, i) => {
        error[err.path] = true
      })
      setErrors(error)
      return
    }

    if (data && data.login.token) {
      localStorage.setItem('token', data.login.token)
      localStorage.setItem('refreshToken', data.login.refreshToken)
      history.push('/view-team')
    }
  }

  return (
    <Container text>
      <Header as="h2"> Login</Header>
      <Form>
        <Form.Field error={errors.email}>
          <Input
            onChange={onChange}
            value={payload.email}
            name="email"
            placeholder="Email"
            fluid
          />
        </Form.Field>
        <Form.Field error={errors.password}>
          <Input
            onChange={onChange}
            value={payload.password}
            name="password"
            placeholder="Password"
            type="password"
            fluid
          />
        </Form.Field>
        <Button onClick={onSubmit}>{loading ? 'Sending ...' : 'Submit'}</Button>
      </Form>
      {data && data.login.code !== '200' && (
        <Message
          list={data.login.errors.map(err => err.message)}
          error
          header={`${data.login.message} with your submission`}
        />
      )}
    </Container>
  )
}

export default Login
