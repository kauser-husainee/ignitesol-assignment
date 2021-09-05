import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import Routes from "./Routes";
import configureStore from "./Store/configureStore";

import "./App.css";

const store = configureStore();

function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <Routes />
        </Provider>
      </Router>
    </div>
  );
}

export default App;
