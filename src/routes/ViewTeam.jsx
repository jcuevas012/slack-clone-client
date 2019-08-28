import React, { Component } from 'react'

import Layout from '../components/Layout'
import Header from '../components/Header'
import Input from '../components/Input'
import Messages from '../components/Messages'
import Teams from '../components/Teams'
import Channels from '../components/Channels'

const ViewTeam = () => (
  <Layout>
    <Teams>Teams</Teams>
    <Channels>Channels</Channels>
    <Header>Header</Header>
    <Messages>
      <ul className="message-list">
        <li />
        <li />
      </ul>
    </Messages>
    <Input>
      <input type="text" placeholder="write your message" />
    </Input>
  </Layout>
)

export default ViewTeam
