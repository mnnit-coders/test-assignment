import React, { useEffect, useState } from 'react';
import '../css/register.css'; // Import CSS file for styling
import { useCookies,Cookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import apifunctions from '../api/api';
function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const cookie=new Cookies();
  useEffect(()=>{
    let token=cookie.get('userid')
    if(token) navigate('/');
  })
  const handleSignup = (e) => {
    e.preventDefault();
    return apifunctions.signup(email,name,password);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-heading">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          
        </form>
        <div className='last-section'>Alredy a user <a href='/login'>Log In</a></div>
      </div>
    </div>
  );
}

export default SignupPage;
