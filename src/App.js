import { createElement as $ } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Main from './pages/Main'
import Chat from './pages/Chat'
import { ApolloProvider } from 'react-apollo'
import client from './apolloClient'

const App = () =>
  $(ApolloProvider, { client },
    $(Router, null,
      $(Switch, null,
        $(Route, { path: '/chat/:id', component: Chat }),
        $(Route, { path: '/', component: Main }))))

export default App