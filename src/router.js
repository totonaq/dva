import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import DataTable from './routes/DataTable';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/table" exact component={DataTable} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
