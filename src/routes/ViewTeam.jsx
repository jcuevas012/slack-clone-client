import React, { Component } from 'react'

import Layout from '../components/Layout'
import Header from '../components/Header'
import Input from '../components/Input'
import Messages from '../components/Messages'
import Channels from '../components/Channels'
import Teams from '../components/Teams'

const ViewTeam = () => (
  <Layout>
    <Teams teams={[{ id: 1, name: 'xarples' }]} />
    <Channels
      members={[{ id: 1, name: 'Juan' }, { id: 1, name: 'Pedro' }]}
      channels={[{ id: 1, name: 'general' }, { id: 1, name: 'dev' }]}
      user={{ id: 1, name: 'Jose', username: 'juan20' }}
      team={{ id: 1, name: 'Slack Team' }}
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

export default ViewTeam
