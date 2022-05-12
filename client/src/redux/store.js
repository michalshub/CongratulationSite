import { createStore,combineReducers } from 'redux';
import userReducer from './reducers/user';
import fetchDataReducer from './reducers/fetchData';

const reducer=combineReducers({userReducer,fetchDataReducer})
const store = createStore(reducer);
window.store = store;
export default store;