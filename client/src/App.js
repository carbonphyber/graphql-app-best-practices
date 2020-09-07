import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import FirstQuery from './FirstQuery';
import './App.css';

const defaultServerUrl = 'http://localhost:4000';
const serverUrl = document.querySelector('meta[name="SERVER_URL"]')?.getAttribute('content') || defaultServerUrl;

const client = new ApolloClient({
  uri: serverUrl,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <FirstQuery />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
