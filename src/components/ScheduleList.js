import React, { Component } from 'react';

import './ScheduleList.css';

import { connect } from 'react-redux';

import EventForm from './EventForm.js';
import Event from './Event.js';

import * as action from "../_redux/actions.js";

class ScheduleList extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
    }
    componentDidMount() {
            this.props.fetchGetEvent(`/api/getUserEvent/${this.props.name}`,{
                method:'get',
              });
    }

    onDelete(){

        console.log("ff");
        //console.log(e.target.getAttribute('data-id'));
     
          // this.props.fetchDeleteEvent(`/api/delete/${this.props.name}`,{
          //   method:"post",
          //   body: JSON.stringify({"_id":e.target.getAttribute('data-id')}),
          //   headers: {
          //     "Accept": "application/json",
          //     "Content-Type": "application/json"
          //   }           
          // });
      
    } 

	render () {

    const start = this.props.appState.start;
    const end = this.props.appState.end;

    var time = (start, end) => {
      var arr = [];

      for (var i = start * 60 ; i <= (end * 60); i = i+30) {

        let hours = Math.floor(i/60); 
        let min = i % 60;
        if ( min < 10) min = "0" + min;
        if( hours > 12) hours = hours - 12;
        if( hours < 10) hours = "0" + hours;
        
        
        arr.push(`${hours}:${min}`);
      }

      return arr;
    };
    var time2 = time(start, end);

		return (
		<div className="scheduleList">
            
                <h2 className="scheduleList-head" onClick={()=>{console.log("!")}} >Schedule List</h2>

                <EventForm />
            <div className="scheduleList-wrap">
                <ul className="scheduleList-list"> 
                  {time2.map((item) => (
                        <li className="scheduleList-item">{item}</li>
                    ))}
                </ul>

                <ul className="event-list"> 
                  {this.props.event.map(function(item, i,arr) {

                  let next = 0;
                  let prev = 0;
                  let eventArr = [];

                  for (var j = 0; j < arr.length; j++) {
                                          
                      if (i != j) {

                          if (item.start*60+item.duration > arr[j].start*60 && arr[j].start*60+arr[j].duration > item.start*60) {
                                          
                              if (eventArr.length == 0) {
                                  eventArr.push([arr[j]]);
                                  if (i < j) {next++;} else {prev++;}
                              } else {
                                  var g = eventArr.length;
                                  for (var x = 0; x < g; x++) {
                                  for (var y = 0; y < eventArr[x].length; y++) {
                                      if (arr[j].start*60+arr[j].duration > eventArr[x][y].start*60 
                                          && eventArr[x][y].start*60+eventArr[x][y].duration > arr[j].start*60) {
                                        if (x === (eventArr.length-1)){eventArr.push([arr[j]]); if (i < j){next++;}else{prev++;}break; }
                                      }else {
                                      eventArr[x].push( arr[j] );
                                      break;  
                                    }
                                }}
                            } ;     
                        };
                    };           
                };


                  {item.col = 0;
                  for (let j = 0; j < eventArr.length+1; j++) {

                  let oneSome = eventArr.some(function(el) {
                      return el[0].col == j;
                  })

                  if (!oneSome) {
                    item.col = j;
                    break;
                  }
                                          
                  }}
                  item.w = 200/(prev+next+1);
                  
                  console.log(this);

                    return ( <Event data={item} next={next} prev={prev}  /> )
                         
                  })}
                </ul>
                
            </div>
        </div>
		)}
}

export default connect(
  (store) => {return {
    appState: store.appState,
    name: store.appState.name,
    event: store.eventState
  }},
  (dispatch) => {return {
    fetchGetEvent: (url,options) => dispatch(action.fetchGetEvent(url,options)),
    fetchDeleteEvent: (url,options) => dispatch(action.fetchDeleteEvent(url,options)),
  }}
  
  )(ScheduleList);

