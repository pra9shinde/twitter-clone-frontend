import React from 'react';
import {ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from '@apollo/client';

import App from './App';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

const client = new ApolloClient({
    link: httpLink,
    cache: InMemoryCache
});


function Apollo(){
    return(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    )
}

export default Apollo;

