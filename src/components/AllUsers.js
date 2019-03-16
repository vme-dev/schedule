import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from "../_redux/actions.js";

import { itemsFetchData } from "../_redux/actions.js";


class AllUsers extends Component {
  constructor(props) {
    super(props);

    this.onSetName = this.onSetName.bind(this);
    }

    onSetName(e) {
        this.props.setName({name:e.target.innerHTML});
    }

    componentDidMount() {

        if (!this.props.items.length) {
            this.props.fetchData('/api/getUsers',{
                method:'get',
                headers: {
                  "Accept": "application/json"
                }
              });
        }
    }

	render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if ( this.props.isLoading )  {
            return <p>Loading…</p>;
        }

        return (
            <div className="card-block">
                <ul className="card-block_wrap">
                    {this.props.items.map((item) => (
                        <li onClick={ (e) => this.onSetName(e)} >{item}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default connect(
  (store) => {return {
    arr: store.appState.arr,
    items: store.items,
    hasErrored: store.itemsHasErrored,
    isLoading: store.itemsIsLoading
  }},
  (dispatch) => {return {
    setName: (obj) => dispatch(action.SET_NAME(obj)),
    fetchData: (url,options) => dispatch(itemsFetchData(url,options)),
  }}
  
  )(AllUsers);