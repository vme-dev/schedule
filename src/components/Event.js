

import React from 'react';
import './Event.css';

export default function (props) {
	let ofsetLeft = 60;
	let styleObj = {};
	styleObj.width = `${(props.data.w)}px`;
	styleObj.height = `${props.data.duration}px`;
	styleObj.left = `${ofsetLeft + (props.data.w * (props.data.col))}px`;
	styleObj.top = `${props.data.start*60-(8*60)}px`;
	


	return (
		<li style={styleObj}  className="event-item" data-id={props.data._id} onClick={()=>{props.del()}} >{props.data.title}</li>
		);
}


// function columSort () {
// 	let next = 0;
//     let prev = 0;
//     let eventArr = [];

//     for (var j = 0; j < arr.length; j++) {
                            
//         if (i != j) {

//             if (item.start*60+item.duration > arr[j].start*60 && arr[j].start*60+arr[j].duration > item.start*60) {
                            
//                 if (eventArr.length == 0) {
//                     eventArr.push([arr[j]]);
//                     if (i < j) {next++;} else {prev++;}
//                 } else {
//                     for (var x = 0; x < eventArr.length; x++) {
//                   	for (var y = 0; y < eventArr.length; y++) {
//                         if (arr[j].start*60+arr[j].duration > eventArr[x][y].start*60 && eventArr[x][y].start*60+eventArr[x][y].duration > arr[j].start*60) {
//                           eventArr.push([arr[j]]);
//                       	} else {
//                         eventArr[x].push(arr[j]);
//                         if (i < j) {next++;} else {prev++;}
//                     	};
//                 	};};
//             	} ;     
//         	};
//     	};           
// 	};
// };