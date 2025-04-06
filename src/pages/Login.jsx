import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import './Login.css';

function LoginPage() {
  return (
    <div className="login-container">
      <h2>Sign In to GameHub</h2>
      <div className="clerk-signin-wrapper">
        <SignIn
          routing="path"
          path="/signin"
          signUpUrl="/signup"
          redirectUrl="/"
          afterSignInUrl="/"
        />
      </div>
    </div>
  );
}

export default LoginPage;