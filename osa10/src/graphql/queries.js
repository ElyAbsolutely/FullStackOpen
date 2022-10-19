import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query ($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges {
        node {
          id
          ownerName
          name
          createdAt
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          watchersCount
          forksCount
          url
          openIssuesCount
          ownerAvatarUrl
          userHasReviewed
          language
          description
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      ownerName
      createdAt
      name
      fullName
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            user {
              username
            }
            rating
            createdAt
            text
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasPreviousPage
          hasNextPage
        }
      }
      ratingAverage
      reviewCount
      stargazersCount
      watchersCount
      forksCount
      openIssuesCount
      ownerAvatarUrl
      url
      description
      language
      userHasReviewed
    }
  }
`



export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`

export const GET_MY_REVIEWS = gql`
  query {
    me {
      reviews {
        totalCount
        edges {
          node {
            id
            repository {
              id
              name
            }
            createdAt
            text
            rating
          }
        }
      }
    }
  }
`