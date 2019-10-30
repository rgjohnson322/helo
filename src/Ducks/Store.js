import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';
import UserReducer from './Reducers/UserReducer';
import PostReducer from './Reducers/PostReducer';


const rootReducer = combineReducers({
    UserReducer,
    PostReducer
});

export default createStore(rootReducer, applyMiddleware(promise))