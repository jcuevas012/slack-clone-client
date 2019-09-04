import React from 'react'
import PropsType from 'prop-types'
import styled from 'styled-components'

const PADDING_LEFT = 'padding-left: 10px'

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`

const SideBarListItem = styled.li`
  padding: 2px;
  cursor: pointer;
  ${PADDING_LEFT};
  ${props => props.selected && 'background: #1064A3; color: white;'}
  ${props => !props.selected && '&:hover { background: #3e313c;}'}
`

const SideBarListHeader = styled.li`
  ${PADDING_LEFT};
`

const PushLeft = styled.div`
  ${PADDING_LEFT};
`

const Green = styled.span`
  color: #38978d;
`

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○')

const member = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble /> {name}
  </SideBarListItem>
)

const Channels = ({ team, user, channels, members, currentChannel }) => {
  const channel = ({ id, name }) => (
    <SideBarListItem
      selected={currentChannel && currentChannel.id === id}
      key={`channel-${id}`}
    >
      # {name}
    </SideBarListItem>
  )

  return (
    <ChannelWrapper>
      <PushLeft>
        <TeamNameHeader>{team.name}</TeamNameHeader>
        {user.name}
      </PushLeft>
      <div>
        <SideBarList>
          <SideBarListHeader>Channels</SideBarListHeader>
          {channels.map(channel)}
        </SideBarList>
      </div>
      <div>
        <SideBarList>
          <SideBarListHeader>Direct Messages</SideBarListHeader>
          {members.map(member)}
        </SideBarList>
      </div>
    </ChannelWrapper>
  )
}

Channels.propTypes = {
  members: PropsType.array,
  channels: PropsType.array,
  user: PropsType.object,
  team: PropsType.object,
  currentChannel: PropsType.object
}

export default Channels
