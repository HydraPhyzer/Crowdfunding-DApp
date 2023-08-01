import {createStore, applyMiddleware, compose} from 'redux'
import Root from "./Combine";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(Root, composeEnhancers(applyMiddleware()));

export default Store;
