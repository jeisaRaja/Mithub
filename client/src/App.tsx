import React from 'react';
import logo from './logo.svg';
import './App.css';
import getGoogleOAuthUrl from './utils/getGoogleOauthUrl';

function App() {
  return (
    <div className="App">
      <a href={getGoogleOAuthUrl()}>Login using google account</a>
    </div>
  );
}

export default App;
