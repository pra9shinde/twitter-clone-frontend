import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
    query {
        getPosts {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
            imageURL
            user {
                id
                email
                username
                createdAt
                name
                profilePic
            }
        }
    }
`;
