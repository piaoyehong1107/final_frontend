import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import Home from "./Home/Home";
import ChatRoom from "./ChatRoom/ChatRoom";
// import Chat from "./ChatRoom/Chat";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/chat" component={ChatRoom} />
        {/* <Route exact path="/oldchat" component={Chat} /> */}
        <Route exact path="/:roomId" component={ChatRoom} />
      </Switch>
    </Router>
  );
}
export default App;