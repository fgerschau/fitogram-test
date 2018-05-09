import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from 'components/Dashboard';

const Routes = () => (
  <Switch>
    <Route
      path="/"
      render={() => (
        <Route path="/" component={Dashboard} />
      )}
    />
  </Switch>
);

export default Routes;
