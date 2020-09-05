import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import FirstQuery from './FirstQuery';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <p>
            <FirstQuery />
          </p>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
