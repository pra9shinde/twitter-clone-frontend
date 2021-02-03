import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client"; //Used to upload files

import App from "./App";

// //Normal apollo client
// const client = new ApolloClient({
//     uri: 'http://localhost:4000',
//     cache: new InMemoryCache(),
// });

// Required if we want to upload files with apollo gql
const client = new ApolloClient({
    link: createUploadLink({
        uri: "http://localhost:4000",
    }),
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
