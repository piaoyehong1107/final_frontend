import React from 'react';
import {
  withRouter
} from 'react-router';
import {Button,  TextField} from '@material-ui/core';

class Login extends React.Component {

  state = {
    username: '',
    password: '',
    error: null,
    currentUser: ''
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newUser = {
        username: this.state.username,
        password: this.state.password
    }
    fetch('http://localhost:3000/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then(res => res.json())
    .then(resp=>{
      console.log(resp)
      localStorage.setItem('auth_key', resp['auth_key'],)
      localStorage.setItem('user_name',resp['user'])
      localStorage.setItem('email',resp['email'])
      localStorage.setItem('photo_id',resp['photo_id'])
      if (resp.error){
          this.setState({
            error: resp.error,
          })
      }else
        {
          // console.log("Home")
          this.props.history.push('/chat')
        }
      }
      )
  }

  render(){
    // console.log(this.state.error)
    return (
      <div style={{
        display: 'flex',
      }}>
      <span className={'form-outer'} >
        <h2 style={{marginLeft: '20px'}}> Login </h2>
        <form className={'add-user'} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '300px',
          margin: '250px 300px',
          justifyContent: 'space-evenly'
        }}>
          <TextField
            id="username"
            name="username"
            label="Username"
            type="username"
            style={{width: '250px'}}
            value={this.state.username}
            autoComplete="current-username"
            variant="outlined"
            onChange={this.handleInputChange}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            style={{width: '250px'}}
            value={this.state.password}
            autoComplete="current-password"
            variant="outlined"
            onChange={this.handleInputChange}
          />
          <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
          {this.state.error? 
          <ul style={{color: 'red'}}><li>{this.state.error}</li></ul> : null
          }
        </form>
      </span>
    </div>
    )
  }
}

export default withRouter(Login);