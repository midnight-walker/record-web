import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Users from "./routes/Users.js";
import Region from "./routes/Region.js";
import Station from "./routes/Station.js";
import Defence from "./routes/Defence.js";
import ScxcSupervisor from "./routes/ScxcSupervisor.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/users" component={Users} />
      <Route path="/region" component={Region} />
      <Route path="/station" component={Station} />
      <Route path="/defence" component={Defence} />
      <Route path="/scxcSupervisor" component={ScxcSupervisor} />
    </Router>
  );
}

export default RouterConfig;
