import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";

import reducer from "./redux/reducer";
import App from "./components/App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = [];
console.log("initialState :", initialState);
//este es el store e redux
const store = createStore(reducer, initialState, composeEnhancers());
console.log("STORE", store);

const container = document.getElementById("app");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);
