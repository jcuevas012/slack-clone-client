import React, { Component } from 'react';
import { Container, Input, Header, Button } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const REGISTER = gql`
    mutation register($newUser: userInput!) {
        register(newUser: $newUser) {
            code
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

    onSubmit = (register) => {
        register({ variables: { newUser: this.state } });
    }

    render() {
        const { username, email, password } = this.state;

        return (
            <Mutation mutation={REGISTER}>
                {(register, { data }) => (
                    <Container text >
                        <Header as="h2"> Register</Header>
                        <Input
                            onChange={this.onChange}
                            name="username"
                            value={username}
                            laceholder="username"
                            fluid />
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
                        <Button
                            onClick={() => this.onSubmit(register)}
                        >Submit</Button>
                    </Container>
                )}
            </Mutation>
        )

    }
}

export default Register;