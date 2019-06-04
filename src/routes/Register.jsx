import React, { Component } from 'react';
import { Message, Container, Input, Header, Button, Label } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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

    onSubmit = (register) => {
        register({ variables: { newUser: this.state } });
    }

    onError = (data, name) => (data && data.register && data.register.errors && data.register.errors.find(x => x.path == name))

    render() {
        const { username, email, password } = this.state;

        return (
            <Mutation mutation={REGISTER}>
                {(register, { data }) => (
                    <Container text >
                        <Header as="h2"> Register</Header>
                        <Input
                            error={this.onError(data, 'username')}
                            onChange={this.onChange}
                            name="username"
                            value={username}
                            laceholder="username"
                            fluid />
                        <Input
                            error={this.onError(data, 'email')}
                            onChange={this.onChange}
                            value={email}
                            name="email"
                            placeholder="email"
                            fluid />
                        <Input onChange={this.onChange}
                            error={this.onError(data, 'password')}
                            value={password}
                            name="password"
                            placeholder="password"
                            type="password"
                            fluid />
                        <Button
                            onClick={() => this.onSubmit(register)}
                        >Submit</Button>
                        {data && data.register && data.register.errors &&
                            <Message
                                error
                                header="There are some errors with your summisssion"
                                list={data && data.register && data.register.errors.map(x => x.message)}
                            />
                        }
                    </Container>
                )}
            </Mutation>
        )

    }
}

export default Register;