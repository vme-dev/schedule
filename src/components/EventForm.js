import React, { Component } from 'react';


import { connect } from 'react-redux';


import { fetchAddEvent,itemsHasErrored } from "../_redux/actions.js";


class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: '',
      duration:'',
      title:''
  };
    
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    
    }

    onChange(e,item) {

      let obj = {};
      obj[item]=e.target.value;
      this.setState(function(state, props) {
          return obj;
      });
      console.log(this.state);
      e.preventDefault();

      //this.props.setName({item:e.target.innerHTML});
    }

    onSubmit() {


      // this.setState(function(state, props) {
      //     return {
      //       start:"1"
      //     };
      // });
      // console.log(this.state);
    let data = {
      start:this.state.start,
      duration:this.state.duration,
      title:this.state.title,
      name: this.props.name
    }

    for ( let key in data) {
      if (data[key].length <= 0 ) {
        return
      }
    }

  
    
      this.props.fetchAddEvent('/api/addEvent',{
        method:"post",
        body: JSON.stringify(data),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
        });
    }

	render() {

      return (
            <div className="addEvent">
              <form>
                <label>
                  Start: <input type="text" name="start" value={this.state.start} onChange={ (e) => this.onChange(e,"start")}/>
                </label>
                <label>
                  Duration: <input type="text" name="duration" value={this.state.duration} onChange={ (e) => this.onChange(e,"duration")}/>
                </label>
                <label>
                  Title: <input type="text" name="title" value={this.state.title} onChange={ (e) => this.onChange(e,"title")}/>
                </label>
                
                <input type="button" value="Submit" onClick={this.onSubmit}/>
              </form>
            </div>
        );
    }
}

export default connect(
  (store) => {return {
    name: store.appState.name,
    items: store.items
  }},
  (dispatch) => {return {
    fetchAddEvent: (url,options) => dispatch(fetchAddEvent(url,options)),
    itemsHasErrored: (bool) => dispatch(itemsHasErrored(bool)),

  }}
  
  )(EventForm);