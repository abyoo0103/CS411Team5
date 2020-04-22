import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SelfRouter from './router';
import * as serviceWorker from './serviceWorker';
import enUS from 'antd/es/locale/en_US';
import { ConfigProvider } from 'antd';

// 设置登陆状态
window.$isLogin = false;

ReactDOM.render(
  <ConfigProvider locale={enUS}>
    <React.StrictMode>
      <SelfRouter />
    </React.StrictMode>
  </ConfigProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
