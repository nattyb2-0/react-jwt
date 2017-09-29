import React from 'react';
import Login from './Login.js'
import Signup from './Signup.js'


export default class App extends React.Component{
  constructor(){
    super();
    this.state ={
      loginName: '',
      loginPass: '',
      signupName: '',
      signupPass: '',
      email:'',
      userID: 0,
    }
  }

  componentWillMount() {
    // fetch call to authenticate the user here
    // this.authenticateUser();
  }

//handle change in state for signup form SigupName
handleSignupName(e){
  this.setState({
    signupName: e.target.value,
    signupPass: this.state.signupPass
  })
}

handleSignupPass(e){
  this.setState({
    signupName: this.state.signupName,
    signupPass: e.target.value
  })
}

handleSignupEmail(e){
  this.setState({
    signupName: this.state.signupName,
    signupEmail: e.target.value,
    signupPass: this.state.signupPass
  })
}

// sends the signup data to the api server
  // encrypts new user data and saves in db
  // authenticates the response and returns the user id
  handleSignup(e) {
    if(this.state.signupName === '' || this.state.signupPass=== ''){
     e.preventDefault()
    } else{
      fetch('/signup', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.signupName,
        password: this.state.signupPass,
      }),
    })
    .then(r => r.json())
    .then((response) => {
      console.log("this is the response--->" +response);
      if (response.id) {
        this.setState({
          userID: response.id,
        })
        localStorage.id = response.id;
        localStorage.token = response.token;
      } else {
        alert(response.message);
      }
    })
    .then(this.setState({
      signupName: '',
      signupPass: ''
    }))
    .then(console.log('signup successful'))
    .catch(err => console.log(err));
    }

  }
   // this authenticates the user on each page load
  // uses a token from local storage to verify access
  authenticateUser() {
    let token;
    if ((localStorage.getItem('token') === null)) {
      token = 'invalid';
    } else {
       token = localStorage.getItem('token')
    }
    console.log(token)
    fetch('/auth/verify', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        id: this.state.id,
        token: token,
      }),
    })
    .then(r => r.json())
    .then((response) => {
      if (response.name === 'JsonWebTokenError') {
        this.setState({ userID: 0 });
        localStorage.setItem('token', null);
      } else {
        this.setState({ userID: response.id });
        localStorage.setItem('token', response.token)
      }
    })
    .catch(err => console.log(err));
  }

   render(){
    return(
      <div>
        <Signup
        signupName={this.state.signupName}
        signupPass={this.state.signupPass}
        signupEmail={this.state.email}
        changeSignupName={this.handleSignupName.bind(this)}
        changeSignupPass={this.handleSignupPass.bind(this)}
        changeSignupEmail={this.handleSignupEmail.bind(this)}
        submit={this.handleSignup.bind(this)}
        />
        <Login
         loginName={this.state.loginName}
         loginPass={this.state.loginPass}

         />
      </div>

      )
   }
}
