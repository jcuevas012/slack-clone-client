import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, from } from 'apollo-link'

const cache = new InMemoryCache()

const link = new HttpLink({
  uri: 'http://localhost:3001/graphql',
  cache
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'x-token': localStorage.getItem('token'),
      'x-refresh-token': localStorage.getItem('refreshToken')
    }
  })
  return forward(operation)
})

const afterwareLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext()

  if (headers) {
    const token = headers['x-token']
    const refreshToken = headers['x-refresh-token']

    if (token) {
      localStorage.setItem('token', token)
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
    }
  }

  return forward(operation)
})

const client = new ApolloClient({
  cache,
  link: from([authMiddleware, afterwareLink, link])
})

export default client
