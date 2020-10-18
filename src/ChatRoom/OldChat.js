import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,

} from "@material-ui/core";
import Friends from "./SideBar";


class OldChat extends React.Component {
  
  
  handleLogout = () => {
    console.log("logout");
    this.props.history.push("/logout");
  };

  render() {
    return (
      <>
      <script src="/socket.io/socket.io.js"></script>
        <div>
          <Friends />
          <Card style={{ display: "flex", width: "100%" }}>
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography color="textSecondary" gutterBottom>
                Chat:
              </Typography>
              <TextField
                id="filled-multiline-static"
                label="Type message here ..."
                multiline
                rows={1}
                style={{ width: "100%" }}
                defaultValue=""
                variant="filled"
                // onChange={(e)=>{
                //   this.setMessage(e)}}
              />
             
              {/* <button onClick={this.sendMessage}>Send Message</button> */}
            </CardContent>
          </Card>
        </div>
        <div className="logout" style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleLogout}
            >
              Logout
            </Button>
        </div>
      </>
    );
  }
}
export default OldChat;
