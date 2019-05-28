import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const allUserQuery = gql`
  {
    allUsers {
      id
      username
    }
  }
`;

const Home = () => (
  <Query query={allUserQuery}>
    {({ data, loading, error }) => {
      if (loading) return <p> Loading ...</p>;
      if (error) return <p> {error.message} </p>;

      return (
        <div>
          <h1>{JSON.stringify(data.allUsers)}</h1>
        </div>
      );
    }}
  </Query>
);

export default Home;
