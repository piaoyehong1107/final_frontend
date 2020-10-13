import React from 'react';
import {Button, Paper, TextField, Card, CardContent} from '@material-ui/core';
import { BrowserRouter, Route, Switch, Redirect, NavLink} from 'react-router-dom';
import {withRouter} from 'react-router'

class SignUp extends React.Component {

  state = {
    username: '',
    password: '',
    error: []
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      user: {
        username: this.state.username,
        password: this.state.password
      }
    }
    fetch('http://localhost:3000/signup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then(res=>res.json())
    .then(resp=>{
      console.log(resp)
      if (resp.error){
        resp.error.map(mes=>{
          this.setState({
            error: [...this.state.error, `${mes[0][0].toUpperCase()+mes[0].slice(1)} ${mes[1]}`]
          })
        })
      }else
        {
          this.props.history.push('/login')
        }
      }
      )
  }

  render(){
    console.log(this.state.error)
    return (
      <div style={{
        display: 'flex',
      }}>
        <span className={'form-outer'}>
        <h2 style={{marginLeft: '20px'}}> Sign Up </h2>
        <form className={'add-user'} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '300px',
          margin: '100px 300px',
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
          {this.state.error.length>0 ? 
          <ul style={{color: 'red'}}>{this.state.error.map(mes=><li>{mes}</li>)} </ul> : null
          }
        </form>
      </span>
      </div>
      
    )
  }
}

export default withRouter(SignUp);