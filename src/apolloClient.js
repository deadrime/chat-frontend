import { WebSocketLink } from 'apollo-link-ws'
import { createHttpLink } from 'apollo-link-http'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlQtR2h5VkhvayIsImlhdCI6MTU2MjE2NjkzNn0.rnmNqJqJs8VLeprp4IpYpRyzQks4VBg3eJ5q8EStu2A'
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
  credentials: 'same-origin',
})

const authLink = setContext((_, { headers }) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlQtR2h5VkhvayIsImlhdCI6MTU2MjE2NjkzNn0.rnmNqJqJs8VLeprp4IpYpRyzQks4VBg3eJ5q8EStu2A'
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    dataIdFromObject: o => o.id
  })
})

export default client