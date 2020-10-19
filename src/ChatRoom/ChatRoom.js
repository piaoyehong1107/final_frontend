import React from "react";
import SideBar from './SideBar'
import { Button } from "@material-ui/core";
import { withRouter } from "react-router";
import "./ChatRoom.css";
import useChat from "./useChat";

const ChatRoom = (props) => {
  console.log({props})
  const [roomId, setRoomId] = React.useState("Choose Room")
  console.log({roomId})
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };
  const handleLogout = () => {
    console.log("logout")
    props.history.push("/logout");
  };
  
  const handleChatRoom = (friend_username) => {
    const user_username = localStorage.getItem("user_name");
    const roomId = [user_username, friend_username].sort().join("&");
    console.log(roomId);
    // this.props.history.push(`/${roomId}`);
    setRoomId(roomId)
  };

  return (
    <div>
      <div className="page-container" style={{
        display: 'flex',
        height: '85vh',
        padding: '10px'
      }}>
      <SideBar roomId={console.log(props.roomId)} handleChatRoom={handleChatRoom}/>
        <div className="chat-room-container">
          <h1 className="room-name">Room: {roomId}</h1>
          <div className="messages-container">
            <ol className="messages-list">
              {messages.map((message, i) => (
                <li
                  key={i}
                  className={`message-item ${
                    message.ownedByCurrentUser ? "my-message" : "received-message"
                  }`}
                >
                  {message.body}
                </li>
              ))}
            </ol>
          </div>
          <textarea
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Write message..."
            className="new-message-input-field"
            style={{marginTop: '20px'}}
          />
          <button style={{marginTop: '5px'}} onClick={handleSendMessage} className="send-message-button">
            Send
          </button>
        </div>
      </div>
      <Button style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
export default withRouter(ChatRoom);