import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import {bindActionCreator} from 'redux';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import * as action from "./_redux/actions.js";
import ScheduleList from "./components/ScheduleList.js";
import Form from "./components/Form.js";
import Login from "./components/Login.js";




class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="login">
            
            <Login />

          </div>
         <Route path="/schedule" component={ScheduleList} />
        </div>
      </ Router>
    
    )
  }
}

export default connect(
  (store) => {return {
    appStste: store.appStste,
  }},
  (dispatch) => {return {
    //onTudaClick: (e)     => { dispatch(action.CHANGE_STOPS(e)); },
  }}
  
  )(App);