import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import myboard from "./modules/myboard";

const middlewares = [thunk];
const rootReducer = combineReducers({ myboard });
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;
