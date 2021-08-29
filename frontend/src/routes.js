import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/index';
import SignUp from './pages/signup'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cadastro" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}