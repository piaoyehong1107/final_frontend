import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Dialog,
  DialogContent,
  makeStyles
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ChatIcon from "@material-ui/icons/Chat";
import { withRouter } from "react-router";
import Avatar from '@material-ui/core/Avatar';

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
        console.log(resp)
        resp.map((friendship) =>
          this.setState({
            friends: [
              ...this.state.friends,
              {
                friend_id: friendship.friend_id,
                friend_username: friendship.friend_username,
                friendshipID: friendship.id,
                friend_photoId: friendship.friend_photoId
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
            searchedFriend: { id: resp[0].id, username: resp[0].username, photo_id: resp[0].photo_id },
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
        friend_photoId: user2.photo_id
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
                friend_photoId: user2.photo_id
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

  chatStart=(friend)=>{
    console.log({friend})
    const { friend_username, friend_photoId }=friend
    const user_username = localStorage.getItem("user_name");
    const roomId = [user_username, friend_username].sort().join(" & ");
    console.log(roomId);
    this.props.history.push(`/chat/${roomId}`);
    this.props.handleChatRoom(roomId,friend_username, friend_photoId)
  }

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
                    <Avatar src={require(`../static/images/avatar/${this.state.searchedFriend.photo_id}.png`)} />
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
            width: "300px",
            flexDirection: "column",
          }}
        >
          <CardContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: 'column'
              }}
            >
              <CardContent style={{display: 'flex', alignItems: 'center'}}>
                    <Avatar src={require(`../static/images/avatar/${localStorage.getItem("photo_id")}.png`)} /> 
                    <Typography style={{ margin: '10px 10px 10px 5px'}} color="textSecondary" gutterBottom>
                      {localStorage.getItem("user_name").toUpperCase()}
                    </Typography>
                    <Typography style={{ margin: '10px 10px 10px 5px'}} color="textSecondary" gutterBottom>
                      {localStorage.getItem("email")}
                    </Typography>
              </CardContent>
                    <Typography style={{ margin: '10px 10px 10px 5px'}} variant="h6" component="h3">
                    Welcome! 
                    </Typography>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
              <Typography
                style={{ margin: 0 }}
                color="textSecondary" 
                gutterBottom
              >
                Friends:
              </Typography>
              <IconButton
                aria-label="add"
                style={{margin: 0, padding: 0}}
                onClick={() => {
                  this.setState({
                    search: true,
                  });
                }}
              >
                <AddIcon fontSize="medium" />
              </IconButton>
              </div>
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
                  onClick={() => this.chatStart(friend)}
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
                  <Avatar src={require(`../static/images/avatar/${friend.friend_photoId}.png`)} />
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
