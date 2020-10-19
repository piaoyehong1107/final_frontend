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
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ChatIcon from "@material-ui/icons/Chat";
import { withRouter } from "react-router";

class SideBar extends React.Component {
  state = {
    friends: [],
    error: null,
    error2: null,
    search: false,
    searchedValue: "",
    searchedFriend: null,
    roomId: null,
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
        resp.map((friendship) =>
          this.setState({
            friends: [
              ...this.state.friends,
              {
                friend_id: friendship.friend_id,
                friend_username: friendship.friend_username,
                friendshipID: friendship.id,
              },
            ],
          })
        );
      });
  }

  searchFriend = (searchedValue) => {
    this.setState({
      error: null,
      error2: null,
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
      body: JSON.stringify({
        user2_id: user2.id,
        friend_username: user2.username,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        if (resp.error) {
          this.setState({
            error2: resp.error,
          });
        } else {
          user2.friendshipID = resp.id;
          this.setState({
            friends: [
              ...this.state.friends,
              {
                friend_id: resp.friend_id,
                friend_username: resp.friend_username,
                friendshipID: resp.id,
              },
            ],
          });
        }
      });
  };
  handleInput = (searchedValue) => {
    this.setState({ searchedValue: searchedValue });
  };

  deleteFriend = (selectedFriend) => {
    console.log(selectedFriend.friendshipID);
    console.log(selectedFriend.friend_id);
    console.log(this.state.friends);
    fetch(`http://localhost:3000/friendships/${selectedFriend.friendshipID}`, {
      method: "DELETE",
    }).then(
      this.setState({
        friends: this.state.friends.filter(
          (friend) => friend.friend_id !== selectedFriend.friend_id
        ),
      })
    );
  };

  // handleChatRoom = (friend_username) => {
  //   const user_username = localStorage.getItem("user_name");
  //   const roomId = [user_username, friend_username].sort().join("&");
  //   console.log(roomId);
  //   this.props.history.push(`/${roomId}`);
  //   this.setState({
  //     roomId: roomId,
  //   });
  // };

  render() {
    return (
      <div>
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
            <Typography style={{ marginBottom: "10px" }}>
              Search my friend ...
            </Typography>
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
              {this.state.error2 ? (
                <ul style={{ color: "red" }}>
                  <li>{this.state.error2}</li>
                </ul>
              ) : null}
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
        <Card
          style={{
            height: "100%",
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
                  onClick={() => this.props.handleChatRoom(friend.friend_username)}
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
                  <Typography variant="h6">{friend.friend_username}</Typography>
                  <ChatIcon />
                </Button>
                <Button
                  onClick={() => {
                    this.deleteFriend(friend);
                  }}
                >
                  <DeleteIcon />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default withRouter(SideBar);
