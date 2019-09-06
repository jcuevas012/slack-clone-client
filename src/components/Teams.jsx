import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
  color: #958993;
`

const TeamList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`

const TeamListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: ${props => (props.selected ? '#4E394C; ' : '#676066')};
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;

  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`

const Teams = ({ teams, currentTeam }) => {
  const team = ({ id, name }) => {
    const letter = name
      .toString()
      .charAt(0)
      .toLocaleLowerCase()
    return (
      <Link key={`team-${id}`} to={`/view-team/${id}`}>
        <TeamListItem selected={id === currentTeam.id}>{letter}</TeamListItem>
      </Link>
    )
  }

  return (
    <TeamWrapper>
      <TeamList>{teams.map(team)}</TeamList>
    </TeamWrapper>
  )
}

Teams.protoType = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentTeam: PropTypes.object
}

export default Teams
