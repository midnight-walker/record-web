import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/Login';

import Users from "./routes/Users.js";
import Region from "./routes/Region.js";
import Station from "./routes/Station.js";
import Defence from "./routes/Defence.js";
import ScxcSupervisor from "./routes/ScxcSupervisor.js";

function isLogin(nextState, replace){
    if(window.location.search.indexOf('?clkj')===-1){
        replace({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname,
                nextSearch: location.search
            }
        })
    }
}

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/login" component={Login} />
      <Route path="/" onEnter={isLogin} component={IndexPage} />
      <Route path="/users" onEnter={isLogin} component={Users} />
      <Route path="/region" onEnter={isLogin} component={Region} />
      <Route path="/station" onEnter={isLogin} component={Station} />
      <Route path="/defence" onEnter={isLogin} component={Defence} />
      <Route path="/scxcSupervisor" onEnter={isLogin} component={ScxcSupervisor} />
    </Router>
  );
}

export default RouterConfig;
