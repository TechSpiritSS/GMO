import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SecondPage from './pages/SecondPage';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/second-page" component={SecondPage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;

