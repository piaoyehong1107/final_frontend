import React from "react";
import "./index.css";
import {Button} from '@material-ui/core';
import './App.css';
import {withRouter} from 'react-router'

class App extends React.Component {
  goToLogin=()=>{
    return this.props.history.push('/login')
  }
  goToSignup=()=>{
    return this.props.history.push('/signup')
  }
  render(){
    return (
      <div style={{
      }}>
          <h2> OurChat </h2>
              <form className={'first-page'} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '300px',
                  margin: '250px 300px',
                  justifyContent: 'space-evenly'
                }}>
                  <Button variant="contained" color="primary" onClick={this.goToLogin}>Login</Button>
                  <Button variant="contained" color="primary" onClick={this.goToSignup}>Signup</Button>
              </form>

      </div>
        )
    }
}

export default withRouter(App);