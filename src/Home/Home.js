import React from "react";
// import { Link } from "react-router-dom";
import Login from "../auth/Login"
import Signup from "../auth/Signup"
import "./Home.css";
const Home = () => {
  return (
    <div className="home-container">
      <div className="login-container">
        <Login/>
        <Signup/>
      </div>
    </div>
  );
};
export default Home;