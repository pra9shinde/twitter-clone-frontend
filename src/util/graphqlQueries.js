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
            imageURL
            user {
                id
                email
                username
                createdAt
                name
                profilePic
            }
            isComment
            replyingTo
        }
    }
`;

export const FETCH_POST = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
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
                body
                createdAt
                username
                likes {
                    id
                    username
                }
                likeCount
                commentCount
                imageURL
                user {
                    id
                    email
                    username
                    name
                    profilePic
                }
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
