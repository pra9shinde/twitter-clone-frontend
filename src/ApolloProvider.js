import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'; //Used to upload files
import config from './config';
import { setContext as apolloContext } from 'apollo-link-context'; //Required to pass auth headers for each comp

import App from './App';

// Bind Authentication header to each request
const authLink = apolloContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
});

// Required if we want to upload files with apollo gql
const client = new ApolloClient({
    link: authLink.concat(
        createUploadLink({
            uri: config.SERVER_URL,
        })
    ),
    cache: new InMemoryCache(),
});

function Apollo() {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
}

export default Apollo;
