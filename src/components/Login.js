import React, { Component } from 'react';


import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link,Redirect } from "react-router-dom";

import { fetchCreateUser,itemsHasErrored } from "../_redux/actions.js";
import AllUsers from "./AllUsers.js";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
  };
    
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    }

  onChange(e) {
    this.setState({name: e.target.value});
  }

  onSubmit() {

   if(this.state.name.length > 0 ) {
        this.props.fetchCreateUser(`/api/createUser/${this.state.name}`,{
          method:'get'
        });
    }
  }

	render() {

    if (this.props.name) {
       return <Redirect to='/schedule'/>;
     }

      return (
        <React.Fragment>
            <div className="login">
              <form>
                <label>
                  Name: <input type="text" name="name" onChange={ (e) => this.onChange(e)}/>
                </label>
                <input type="button" value="Submit" onClick={this.onSubmit}/>
              </form>
            </div>

            <div className="allUsers">
              <AllUsers />
            </div>
        </React.Fragment>
        );
    }
}

export default connect(
  (store) => {return {
    arr: store.appState.arr,
    name: store.appState.name
  }},
  (dispatch) => {return {
    fetchCreateUser: (url,options) => dispatch(fetchCreateUser(url,options)),
    itemsHasErrored: (bool) => dispatch(itemsHasErrored(bool))

  }}
  
  )(Login);