import React, { useState } from "react";
import SideBar from "./SideBar";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router";
import "./ChatRoom.css";
import useChat from "./useChat";
import Avatar from "@material-ui/core/Avatar";
// import { createBrowserHistory } from "history";

// export const history = createBrowserHistory({forceRefresh:true})

const ChatRoom = (props) => {
  console.log({ props });
  const [roomId, setRoomId] = useState("Choose Room");
  console.log({ roomId });
  const { messages, sendMessage, setMessages } = useChat(roomId);
  console.log({messages})
  const [newMessage, setNewMessage] = useState("");
  const [chatStart, setChatStart] = useState(false);
  const [friendPhotoId, setFriendPhotoId] = useState()
  console.log({ chatStart, friendPhotoId });
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleSendMessage = () => {
    if (!newMessage) return;
    sendMessage(newMessage);
    setNewMessage("");
  };
  const handleLogout = () => {
    console.log("logout");
    props.history.push("/logout");
  };

  const handleChatRoom = (friend_username, friend_photoId) => {
    const user_username = localStorage.getItem("user_name");
    const roomId = [user_username, friend_username].sort().join(" & ");
    console.log(roomId);
    setRoomId(roomId);
    setFriendPhotoId(friend_photoId)
  };

  const handleChatStart = (status) => {
    props.history.push(`/chat/${roomId}`);
    setChatStart(status);
    setMessages([]);
  };

  return (
    <div>
      <div
        className="page-container"
        style={{
          display: "flex",
          height: "85vh",
          padding: "10px",
        }}
      >
        <SideBar
          handleChatStart={handleChatStart}
          roomId={console.log(props.roomId)}
          handleChatRoom={handleChatRoom}
          chatStart={props.chatStart}
        />
        {chatStart ? (
          <div className="chat-room-container">
            <h1 className="room-name">Room: {roomId}</h1>
            <div className="messages-container">
              <ol className="messages-list">
                {messages.map((message, i) => (
                  <li
                    key={i}
                    className={`message-item ${
                      message.ownedByCurrentUser
                        ? "my-message"
                        : "received-message"
                    }`}
                  >
                    <div style={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center' }}>
                      {/* {message.body} */}
                      {message.ownedByCurrentUser ? <Avatar
                        src={require(`../static/images/avatar/${localStorage.getItem(
                          "photo_id"
                        )}.png`)}
                      /> : <Avatar
                        src={require(`../static/images/avatar/${friendPhotoId}.png`)}
                      />}
                      <div style={{marginLeft: '10px', fontSize: '20px'}}>
                        {localStorage.getItem("user_name".toUpperCase())}:{" "}
                        {message.body}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <textarea
              value={newMessage}
              onChange={handleNewMessageChange}
              placeholder="Write message..."
              className="new-message-input-field"
              style={{ marginTop: "20px" }}
            />
            <button
              style={{ marginTop: "5px" }}
              onClick={handleSendMessage}
              className="send-message-button"
            >
              Send
            </button>
          </div>
        ) : null}
      </div>
      <Button
        style={{ marginLeft: "10px" }}
        variant="contained"
        color="primary"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};
export default withRouter(ChatRoom);
