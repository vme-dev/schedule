import React, { Component } from 'react';


import { connect } from 'react-redux';


import { fetchApi,itemsHasErrored } from "../_redux/actions.js";


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description:''
  };
    
    this.onSubmit = this.onSubmit.bind(this);
    
    }

    onSubmit() {
    
    let data = {
      name:this.state.name,
      description:this.state.description
    }

    for ( let key in data) {
      if (data[key].length <= 0 ) {
        return
      }
    }

  
    
      // this.props.fetchApi('/api/add',{
      //     method:'post',
      //     body: data,
      //   });
    }

	render() {

      return (
            <div className="addEvent">
              <form>
                <label>
                  Name: <input type="text" name="name" onChange={ (e) => this.onChange(e,"name")}/>
                </label>
                <label>
                  Текст сообщения: <textarea type="text" 
                                              name="description" value={this.state.message}
                                              onChange={ (e) => this.onChange(e,"description")}/>
                </label>
                <input type="button" value="Submit" onClick={this.onSubmit}/>
              </form>
            </div>
        );
    }
}

export default connect(
  (store) => {return {
    arr: store.appState.arr,
    items: store.items
  }},
  (dispatch) => {return {
    fetchApi: (url,options) => dispatch(fetchApi(url,options)),
    itemsHasErrored: (bool) => dispatch(itemsHasErrored(bool)),

  }}
  
  )(Form);