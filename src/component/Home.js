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

class Chat extends React.Component {
  state = {
    friends: [],
    error: null,
    search: false,
    searchedValue: "",
    searchedFriend: null,
  };
  componentDidMount() {
    fetch("http://localhost:3000/friendships", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Auth-key": localStorage.getItem("auth_key"),
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        this.setState({
          friends: resp,
        });
      });
  }

  handleLogout = () => {
    console.log("logout");
    this.props.history.push("/logout");
  };
  handleInput = (searchedValue) => {
    this.setState({ searchedValue: searchedValue });
  };

  searchFriend = (searchedValue) => {
    this.setState({
      error: null,
    });
    fetch(`http://localhost:3000/users?username=${searchedValue}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Auth-key": localStorage.getItem("auth_key"),
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        // console.log(resp)
        if (resp.error)
          this.setState({
            error: resp.error,
            searchedValue: "",
          });
        else
          this.setState({
            searchedFriend: { id: resp[0].id, username: resp[0].username },
            searchedValue: "",
          });
      });
  };
  addFriend = (user2) => {
    this.setState({
      searchedFriend: null,
    });
    console.log(user2);
    fetch("http://localhost:3000/friendships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth-key": localStorage.getItem("auth_key"),
      },
      body: JSON.stringify({ user2_id: user2.id }),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        this.setState({
          friends: [...this.state.friends, user2],
        });
      });
  };
  render() {
    return (
      <>
        <Dialog
          open={this.state.search}
          onClose={() => {
            this.setState({
              search: false,
            });
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <Typography style={{marginBottom: '10px'}}>Search my friend ...</Typography>
            <div className="search">
              <input
                type="text"
                style={{
                  height: "25px",
                  marginRight: "10px",
                }}
                onChange={(e) => this.handleInput(e.target.value)}
                value={this.state.searchedValue}
              ></input>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.searchFriend(this.state.searchedValue)}
              >
                Search
              </Button>
              {this.state.searchedFriend ? (
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Username:
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {this.state.searchedFriend.username}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => this.addFriend(this.state.searchedFriend)}
                    >
                      Add Friend
                    </Button>
                  </CardActions>
                </Card>
              ) : null}
              {this.state.error ? (
                <ul style={{ color: "red" }}>
                  <li>{this.state.error}</li>
                </ul>
              ) : null}
            </div>
          </DialogContent>
        </Dialog>
        <div style={{ display: "flex", height: "800px" }}>
          <Card
            style={{
              background: "#b1d6d8",
              display: "flex",
              width: "500px",
              flexDirection: "column",
            }}
          >
            <CardContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  style={{ margin: 0 }}
                  color="textSecondary"
                  gutterBottom
                >
                  Friends:
                </Typography>
                <IconButton
                  aria-label="add"
                  onClick={() => {
                    this.setState({
                      search: true,
                    });
                  }}
                >
                  <AddIcon fontSize="medium" />
                </IconButton>
              </div>
              {this.state.friends.map((friend) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      background: "#eee",
                      border: "1px solid",
                      borderRadius: "10px",
                      width: "200px",
                      margin: "10px 0",
                    }}
                  >
                    <Typography variant="h6">{friend.username}</Typography>
                    <ChatIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      // delete user here
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
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
