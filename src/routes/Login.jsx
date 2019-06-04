import React, { Component } from 'react';
import { Container, Input, Header, Button } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CLIENT_RENEG_WINDOW } from 'tls';

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
        password: ''
    }

    onChange = ({ target }) => {
        const { name, value } = target
        this.setState({
            [name]: value
        })
    }

    onSubmit = (login) => {
        const { email, password } = this.state
        login({ variables: { email, password } })

    }

    onCompleted = ({ login }) => {
        localStorage.setItem('token', login.token)
        localStorage.setItem('refreshToken', login.refreshToken)
    }


    render() {
        const { email, password } = this.state;

        return (
            <Mutation mutation={LOGIN}
                onCompleted={this.onCompleted}>
                {(login, { data }) => (
                    <Container text >
                        <Header as="h2"> Login</Header>
                        <Input
                            onChange={this.onChange}
                            value={email}
                            name="email"
                            placeholder="email"
                            fluid />
                        <Input onChange={this.onChange}
                            value={password}
                            name="password"
                            placeholder="password"
                            type="password"
                            fluid />
                        <Button onClick={() => this.onSubmit(login)}>Submit</Button>
                    </Container>
                )}
            </Mutation>

        )
    }

}


export default Login;