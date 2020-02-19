import * as React from 'react';
import * as ReactDom from 'react-dom';
import { App } from './components/App';
import { UserProvider } from './components/context/UserContext';

ReactDom.render(
  <UserProvider>
    <App />
  </UserProvider>, 
  document.getElementById('root'));