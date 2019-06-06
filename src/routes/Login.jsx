import React, { Component } from 'react';
import { Container, Input, Header, Button, Form, Message } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';


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


class Login extends Component {

  state = {
    email: '',
    password: '',
    errors: {
      email: false,
      password: false
    }
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (login) => {
    this.setState({ errors: {} })
    const { email, password } = this.state;
    login({ variables: { email, password } });
  }

  onCompleted = ({ login }) => {
    const { token, refreshToken, errors: errorList } = login;

    let errors = {};
    if (errorList.length) {
      errorList.forEach((error) => {
        errors[error.path] = true;
      });
      this.setState({ errors });
      return;
    }

    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }


  render() {
    const { email, password } = this.state;

    return (
      <Mutation
        mutation={LOGIN}
        onCompleted={this.onCompleted}
      >
        {(login, { data }) => {
          const { errors } = this.state;

          return (
            <Container
              text >
              <Header as="h2"> Login</Header>
              <Form>
                <Form.Field
                  error={errors.email}
                >
                  <Input
                    onChange={this.onChange}
                    value={email}
                    name="email"
                    placeholder="Email"
                    fluid
                  />
                </Form.Field>
                <Form.Field
                  error={errors.password}
                >
                  <Input
                    onChange={this.onChange}
                    value={password}
                    name="password"
                    placeholder="Password"
                    type="password"
                    fluid
                  />
                </Form.Field>
                <Button onClick={() => this.onSubmit(login)}>Submit</Button>
              </Form>
              {data && data.login.code !== '200'
                && (
                  <Message
                    list={data.login.errors.map(err => err.message)}
                    error
                    header={`${data.login.message} with your submission`}
                  />
                )}
            </Container>
          )
        }
        }
      </Mutation>

    )
  }

}


export default Login;