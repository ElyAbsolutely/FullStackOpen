import { gql } from "@apollo/client"

export const LOGIN = gql`
    mutation($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
            accessToken
            expiresAt
            user {
                id
                username
            }
        }
    }
`

export const CREATE_REVIEW = gql`
    mutation ($review: CreateReviewInput) {
        createReview(review: $review) {
            id
            createdAt
        }
    }
`


export const CREATE_USER = gql`
    mutation ($user: CreateUserInput) {
        createUser(user: $user) {
            id
        }
    }
`

export const DELETE_REVIEW = gql`
    mutation ($deleteReviewId: ID!) {
        deleteReview(id: $deleteReviewId)
    }
`