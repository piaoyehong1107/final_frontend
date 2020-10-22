import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  NavLink,
} from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/Signup";
import {
  Button,
  CardMedia,
  Paper,
  TextField,
  Card,
  CardContent,
} from "@material-ui/core";
import bg from "./bg.png";
import ChatRoom from "./ChatRoom/ChatRoom";

ReactDOM.render(
  <Card
    style={{
      diplay: "flex",
      height: "100%",
      background: "#eeeeee",
      height: "100vh",
    }}
  >
    <CardContent style={{}}>
      {/* <img src={bg} alt="Logo" > */}
      <Paper style={{ padding: "20px" }}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={() => {
                if (localStorage.getItem("auth_key")) {
                  return <ChatRoom />;
                } else {
                  return <App />;
                }
              }}
            />
            <Route
              exact
              path="/login"
              component={() => {
                return <Login />;
              }}
            />
            <Route
              exact
              path="/signup"
              component={() => {
                return <SignUp />;
              }}
            />
            <Route
              exact
              path="/logout"
              component={() => {
                localStorage.clear();
                return <App />;
              }}
            />
            <Route
              exact
              path="/chat/:roomId"
              component={() => {
                return <ChatRoom />;
              }}
            />
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </BrowserRouter>
      </Paper>
      {/* </img> */}
    </CardContent>
  </Card>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
