import React, { useContext } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import * as team from '../context/team'
import Teams from '../components/Teams'
import Channels from '../components/Channels'

const allTeamQuery = gql`
  {
    teams {
      id
      name
      owner {
        id
        username
        email
      }
      channels {
        id
        name
        public
      }
    }
  }
`

const SideBar = () => {
  const { state, dispatch } = useContext(team.context)

  return (
    <Query query={allTeamQuery}>
      {({ data, loading, error }) => {
        if (loading) return <p> Loading ...</p>
        if (error) return <p> {error.message} </p>

        const { currentTeam } = state
        const team = data.teams.find(t => t.name === currentTeam.name)

        return (
          <>
            <Teams teams={data.teams} currentTeam={team} />
            <Channels
              members={[{ id: 1, name: 'Juan' }, { id: 1, name: 'Pedro' }]}
              channels={team.channels}
              user={{ id: 1, name: 'Jose', username: 'juan20' }}
              team={team}
            />
          </>
        )
      }}
    </Query>
  )
}

export default SideBar
