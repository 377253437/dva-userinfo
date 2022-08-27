/**
 * @file 路由管理
 * @author  lizhengtai@sensordata.cn
 */
import * as React from 'react';

import { Router, Switch, Route } from 'dva/router';

// import UserInfo from './pages/userInfo/index';

import DeepSelect from './pages/multiSelect'

export default function RouterConfig({ history }) {
  // 路由配置
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={DeepSelect}></Route>
      </Switch>
    </Router>
  );
}
