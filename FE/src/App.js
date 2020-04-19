import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './common/header';
import Home from './pages/home';
import Detail from './pages/detail/loadable.js';
import Login from './pages/login';
import Author from './pages/author';
import Author2 from './pages/author2';
import Accounts from './pages/accounts';
import Register from './pages/register';
import Write from './pages/write';
import store from './store';


class App extends Component {
  render() {
    return (
    	<Provider store={store}>
      	<BrowserRouter>
      		<div>
            <Header />
      			<Route path='/' exact component={Home}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/author' exact component={Author}></Route>
            <Route path='/author2' exact component={Author2}></Route>
            <Route path='/accounts' exact component={Accounts}></Route>
            <Route path='/register' exact component={Register}></Route>
            <Route path='/write' exact component={Write}></Route>
      			<Route path='/detail/:id' exact component={Detail}></Route>
      		</div>
      	</BrowserRouter>
      </Provider>
    );
  }
}

export default App;
