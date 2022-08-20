import dva from 'dva';
import createhistory from 'history/createBrowserHistory';
import './index.less';
import 'sensd/dist/sensd.css';

const app = dva({
  history: createhistory(),
});

app.router(require('./router.jsx').default);

app.start('#root');

