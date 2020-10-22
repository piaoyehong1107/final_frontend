import React from 'react';
import {Button, TextField} from '@material-ui/core';
import {withRouter} from 'react-router'
import ImageSelection from './ImageSelection'


class SignUp extends React.Component {

  state = {
    username: '',
    password: '',
    email: '',
    photo_id: '',
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
        password: this.state.password,
        email: this.state.email,
        photo_id: this.state.photo_id
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
  
  onPick=(image)=>{
    this.setState({
      photo_id : `img_${image.value}`
    })
    console.log(image.value)
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
          height: '800px',
          margin: '0px 300px',
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
           <TextField
            id="email"
            name="email"
            label="Email"
            type="mail"
            style={{width: '250px'}}
            value={this.state.email}
            autoComplete="current-email"
            variant="outlined"
            onChange={this.handleInputChange}
          />
          <div style={{marginTop: '20px', fontSize: '20px', color: 'grey'}}>Choose your avartar</div>
          <ImageSelection onPick={this.onPick}/>
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