import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import MainPage from './MainPage.jsx';
import UserPage from './UserPage.jsx'

export const App = () => {
  return (
    <div className="router">
      <Router>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/userpage" component={UserPage} />
      </Router>
    </div>
  );
};