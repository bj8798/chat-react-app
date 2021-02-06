import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import LoginView from "./components/LoginView";
import SignUpView from "./components/SignUpView";
import ChatView from "./components/ChatView";
import * as serviceWorker from "./serviceWorker";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Switch>
          <Route path="/login" component={LoginView} />
          <Route path="/signup" component={SignUpView} />
          <Route path="/chat" component={ChatView} />
          <Route path="/" component={LoginView} />
        </Switch>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
