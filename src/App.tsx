import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SecondPage from './pages/SecondPage';

const AppRouter = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        {userDetails.userName && userDetails.email && userDetails.number ? (
          <Route path="/second-page" component={SecondPage} />
        ) : (
          <Redirect to="/" />
        )}        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
