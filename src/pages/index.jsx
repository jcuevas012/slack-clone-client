import { ApolloProvider } from '@apollo/react-hooks'
import React, { useReducer } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import client from '../apollo'
import * as team from '../context/team'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import ViewTeam from './ViewTeam'

function App() {
  const initialState = {
    team: {
      currentTeam: {
        id: '',
        name: 'Xarples'
      }
    }
  }

  const [teamState, teamDispatch] = useReducer(team.reducer, initialState.team)

  return (
    <ApolloProvider client={client}>
      <team.context.Provider
        value={{ state: teamState, dispatch: teamDispatch }}
      >
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route
              path="/view-team/:teamId?/:channelId?"
              exact
              component={ViewTeam}
            />
          </Switch>
        </BrowserRouter>
      </team.context.Provider>
    </ApolloProvider>
  )
}

export default App
