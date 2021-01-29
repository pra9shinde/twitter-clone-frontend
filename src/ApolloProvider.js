import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './App';

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
});

/*
    // Vanilla test if its working
    client
        .query({
            query: gql`
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
                    }
                }
            `,
        })
        .then((result) => console.log(result))
        .catch((e) => console.log(e));
*/

function Apollo() {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
}

export default Apollo;
