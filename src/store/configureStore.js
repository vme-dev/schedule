import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import  reduser  from '../_redux/reduser';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
    return createStore(
        reduser,
        initialState,
        applyMiddleware(thunk,createLogger())
    );
}