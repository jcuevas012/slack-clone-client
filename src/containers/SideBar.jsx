import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'

import AddChannelModal from '../components/AddChannelModal'
import Channels from '../components/Channels'
import Teams from '../components/Teams'

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
  const { loading, error, data } = useQuery(allTeamQuery)
  const [showAddChannel, setShowAddChannel] = useState(false)


  if (loading) {
    return <p> Loading ...</p>
  }

  if (error) {
    return <p> {error.message} </p>
  }

  const currentTeam =
    data.teams.find(t => t.id === currentTeamId) || data.teams[0]

  const currentChannel =
    currentTeam.channels.find(c => c.id === currentChannelId) ||
    currentTeam.channels[0]

  return (
    <>
      <Teams teams={data.teams} currentTeam={currentTeam} />
      <Channels
        members={[{ id: 1, name: 'Juan' }, { id: 2, name: 'Pedro' }]}
        channels={currentTeam.channels}
        currentChannel={currentChannel}
        user={{ id: 1, name: 'Jose', username: 'juan20' }}
        team={currentTeam}
        onChannelAdd={() => setShowAddChannel(true)}
      />
      <AddChannelModal show={showAddChannel} onClose={() => setShowAddChannel(false)} />
    </>
  )
}

export default SideBar
