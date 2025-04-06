import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import './SignUp.css';

function SignUpPage() {
  return (
    <div className="signup-container">
      <h2>Create GameHub Account</h2>
      <div className="clerk-signup-wrapper">
        <SignUp 
          routing="path" 
          path="/signup" 
          signInUrl="/signin"
          redirectUrl="/"
          afterSignUpUrl="/"
        />
      </div>
    </div>
  );
}

export default SignUpPage;