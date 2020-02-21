import * as React from 'react';
import * as ReactDom from 'react-dom';
import { App } from './components/App';
import { UserProvider } from './components/context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './style.css';

ReactDom.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')); 