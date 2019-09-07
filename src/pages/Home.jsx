import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const allUserQuery = gql`
  {
    allUsers {
      id
      username
    }
  }
`

const Home = () => {
  const { data, loading, error } = useQuery(allUserQuery)

  if (loading) {
    return <p> Loading ...</p>
  }

  if (error) {
    return <p> {error.message} </p>
  }

  return (
    <div>
      <h1>{JSON.stringify(data.allUsers)}</h1>
    </div>
  )
}

export default Home
