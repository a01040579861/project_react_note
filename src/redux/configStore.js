import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// redux-thunk는 위에서 설명한 바와 같이 액션 생성 함수를 작성 할 수 있게하여 액션이 
//발생하기 전에 조건을 주거나 어떠한 행동을 처리할 수있게 한다. 
import myboard from "./modules/myboard";

const middlewares = [thunk];
const rootReducer = combineReducers({ myboard });
const enhancer = applyMiddleware(...middlewares);
//createStore() 할때 reducer들과 옵셔널한 기능을 추가로 넣어줄수 있는데 이때 
//미들웨어의 묶을음 inhancer로 만들때 applyMiddleware를 사용해서 넣어 줄수 있다.
const store = createStore(rootReducer, enhancer);

export default store;