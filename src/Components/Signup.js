import React from 'react';
import './SignUp.css';



const SignUp = props => (
      <div className="login-box">
        <input
          type="text"
          value={props.signupName}
          name="signupName"
          placeholder="username"
          onChange={props.handleChange}
        />
        <input
          type="text"
          value={props.signupPass}
          name="signupPass"
          placeholder="password"
          onChange={props.handleChange}
        />
        <input
        type="text"
        value={props.email}
        name="signupEmail"
        placeholder="ex. janedoe@gmail.com"
        onChange={props.handleChange}
        />
        <button
          id="signup-button"
          onClick={props.submit}
        >
          Sign up!
        </button>
      </div>
);

export default SignUp;
