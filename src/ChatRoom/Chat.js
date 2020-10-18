import React from "react";
import {
  Button,
  Paper,
  TextField,
  Card,
  CardContent,
  CardActions,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { withRouter } from "react-router";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ChatIcon from "@material-ui/icons/Chat";
import SideBar from './SideBar'
import "./Chat.css";
import ChatRoom from './ChatRoom'

class Chat extends React.Component {
  state = {
    friends: [],
    error: null,
    error2: null,
    search: false,
    searchedValue: "",
    searchedFriend: null,
  };
  handleLogout = () => {
    console.log("logout");
    this.props.history.push("/logout");
  };
  handleInput = (searchedValue) => {
    this.setState({ searchedValue: searchedValue });
  };
  
  render() {
    return (
      <>
        <div style={{ display: "flex", height: "800px" }}>
        <SideBar />
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
              />
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
export default withRouter(Chat);