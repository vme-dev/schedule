import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import './media.css';
import App from './App';


import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware } from 'redux';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import  reduser  from './_redux/reduser';

import configureStore from './store/configureStore';

import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'

import { BrowserRouter as Router, Switch, Route, Link ,match} from "react-router-dom";

const history = createHistory();;

const store = configureStore();


ReactDOM.render(
	<Router history={history}>
		<Provider store={store}>
		<React.Fragment>
			
			<Route exact path='/' component={App} />
			

		</React.Fragment>
		</Provider>
	</Router>
	, 
  	document.getElementById('root'));

