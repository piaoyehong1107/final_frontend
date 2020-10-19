import React from "react";
// import { Link } from "react-router-dom";
import Login from "../auth/Login"
import Signup from "../auth/Signup"
import "./Home.css";
const Home = () => {
  // const [roomName, setRoomName] = React.useState("");
  // const handleRoomNameChange = (event) => {
  //   setRoomName(event.target.value);
  // };
  return (
    <div className="home-container">
      <div className="login-container">
        <Login/>
        <Signup/>
      </div>
      {/* <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/${roomName}`} className="enter-room-button">
        Join room
      </Link> */}
    </div>
  );
};
export default Home;