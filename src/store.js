import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {getUsersReducer, getSingleUserReducer} from './reducers/userReducers'

const reducer = combineReducers({
    UsersList: getUsersReducer,
    singleUser: getSingleUserReducer
})

let initialState = {};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;