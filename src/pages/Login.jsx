import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import {
  Button,
  Container,
  Form,
  Header,
  Input,
  Message
} from 'semantic-ui-react'

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



  const [payload, setPayload] = useState({
    email: '',
    password: ''
  })


  const [errors, setErrors] = useState({
    email: false,
    password: false
  })

  const [login, { data, loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      if (data.login.code !== '200') {
        const error = {}
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
  })

  function onChange({ target }) {
    const { name, value } = target
    const state = { ...payload }
    state[name] = value
    setPayload(state)
  }

  async function onSubmit() {
    const { email, password } = payload
    await login({ variables: { email, password } })
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
