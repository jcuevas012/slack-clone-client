import React, { useContext } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
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

const SideBar = ({ currentTeamId, currentChannelId }) => {
  return (
    <Query query={allTeamQuery}>
      {({ data, loading, error }) => {
        if (loading) return <p> Loading ...</p>
        if (error) return <p> {error.message} </p>

        const currentTeam =
          data.teams.find(t => t.id === currentTeamId) || data.teams[0]

        const currentChannel =
          currentTeam.channels.find(c => c.id === currentChannelId) ||
          currentTeam.channels[0]

        return (
          <>
            <Teams teams={data.teams} currentTeam={currentTeam} />
            <Channels
              members={[{ id: 1, name: 'Juan' }, { id: 1, name: 'Pedro' }]}
              channels={currentTeam.channels}
              currentChannel={currentChannel}
              user={{ id: 1, name: 'Jose', username: 'juan20' }}
              team={currentTeam}
            />
          </>
        )
      }}
    </Query>
  )
}

export default SideBar
