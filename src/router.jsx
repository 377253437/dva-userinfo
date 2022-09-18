/**
 * @file 路由管理
 * @author  lizhengtai@sensordata.cn
 */
import * as React from 'react';

import { Router, Switch, Route } from 'dva/router';

// import UserInfo from './pages/userInfo/index';

// import DeepSelect from './pages/multiSelect'

// import Step from './pages/Step'

// import ThreeSelect from './pages/ThreeSelect'

import TabPage from './pages/TabPage'

export default function RouterConfig({ history }) {
  // 路由配置
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={TabPage}></Route>
      </Switch>
    </Router>
  );
}
