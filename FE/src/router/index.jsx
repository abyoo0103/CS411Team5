/**
 * 项目的路由配置文件
 * react router
 */

import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Index from '../pages';
import Home from '@/pages/Home';
import ArticleDetail from '@/pages/ArticleDetail';
import Author from '@/pages/Author';
import Setting from '@/pages/Setting';
import Result from '@/pages/Result';

const routes = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/detail/:id',
    component: ArticleDetail,
  },
  {
    path: '/author/:id',
    component: Author,
  },
  {
    path: '/user',
    component: Author,
  },
  {
    path: '/setting',
    component: Setting,
  },
  {
    path: '/result',
    component: Result,
  },
];

class SelfRouter extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          {routes.map((route, index) => (
            <Route path={route.path} key={index} exact component={route.component}></Route>
          ))}
        </Switch>
      </HashRouter>
    );
  }
}

export default SelfRouter;
