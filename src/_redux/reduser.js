import { combineReducers } from 'redux';
import mainState from "./mainState.js";

import { routerReducer } from 'react-router-redux';

const appState = (state = mainState(), action) => {


    switch (action.type) {

        case 'CHANGE_STOPS':
            {  
                return Object.assign({}, state, {
                });
                break;
            }
        case "RECEIVE_POSTS":
        {   
                return Object.assign({}, state, { arr: action.posts, f:false
            });
            break;
        }
        case 'SET_NAME':{
            console.log(action.name);
            return {...state, name:action.name};
            break;
        }

        default:
            return state
    }
};

const eventState = (state = [], action) => {


    switch (action.type) {

        case 'ADD_EVENT':
        {  
            
            return [
                    ...state,
                    ...[action.obj]
          ]
          break;
        } 
        case 'GET_EVENT':
        {  
            
            return [
                    ...state,
                    ...action.event
          ]
          break;
        }
        case 'DELETE_EVENT':
        {  
            let newState = state.map(function(item, i,arr) {
                if (!item._id == action.id) {
                    return item
                }
            });
            return [
                    ...newState,
                    
          ]
          break;
        }       

        default:
            return state
    }
};


const itemsHasErrored = (state = false, action) => {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;
            break;

        default:
            return state;
    }
}

const itemsIsLoading = (state = false, action) => {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

const items = (state = [], action) => {
    
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':{
            
            
            return [...state, ...action.items];
            break;
        }
        default:
            return state;
    }
}

const reduser = combineReducers({
    routing: routerReducer,
    appState,
    eventState,
    itemsHasErrored,
    itemsIsLoading,
    items
});

export default reduser;