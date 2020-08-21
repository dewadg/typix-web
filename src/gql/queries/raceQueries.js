import gql from 'graphql-tag'

export const FIND_RACE_BY_ID = gql`
  query($id: ObjectID!) {
    race(id: $id) {
      id
      participants {
        id
        username
      }
      words
      createdAt
      updatedAt
    }
  }
`
