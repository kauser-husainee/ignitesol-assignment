import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import Reducer from "../Reducers";

export default function configureStore() {
  const composeEnhancers = compose;
  const middleWares = [thunk];
  const enhancer = composeEnhancers(applyMiddleware(...middleWares));

  const store = createStore(Reducer, enhancer);

  return store;
}
