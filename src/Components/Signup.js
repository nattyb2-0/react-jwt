import React from 'react';
// import './SignUp.css';

const SignUp = props => (
      <div className="login-box">
        <input
          type="text"
          value={props.signupName}
          name="signupName"
          placeholder="username"
          onChange={props.changeSignupName}
        />
        <input
          type="text"
          value={props.signupPass}
          name="signupPass"
          placeholder="password"
          onChange={props.changeSignupPass}
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
