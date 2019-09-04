import React from 'react'

import Layout from '../components/Layout'
import Header from '../components/Header'
import Input from '../components/Input'
import Messages from '../components/Messages'
import SideBar from '../containers/SideBar'

const ViewTeam = ({ match: { params } }) => {
  return (
    <Layout>
      <SideBar
        currentTeamId={params.teamId}
        currentChannelId={params.channelId}
      />
      <Header channel={{ id: 3, name: 'general' }} />
      <Messages>
        <ul className="message-list">
          <li>message 1</li>
          <li>message 2</li>
        </ul>
      </Messages>
      <Input channel={{ id: 3, name: 'general' }} />
    </Layout>
  )
}

export default ViewTeam
