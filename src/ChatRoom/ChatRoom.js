import React from "react";
// import Chat from '../../Chat'
import SideBar from './SideBar'
import { Button } from "@material-ui/core";
import "./ChatRoom.css";
import useChat from "../useChat";

const ChatRoom = (props) => {
  // const { roomId } = props.match.params;
  const { roomId } = 1;
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
  
  return (
    <div>
      <div className="page-container">
      <SideBar/>
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
          />
          <button onClick={handleSendMessage} className="send-message-button">
            Send
          </button>
        </div>
      </div>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
export default ChatRoom;