import React, { useEffect, useState } from 'react';
import '../css/login.css'; // Import CSS file for styling
import { useCookies,Cookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import apifunctions from '../api/api';
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['userid']);
  const cookie=new Cookies();
  useEffect(()=>{
    let token=cookie.get('userid')
    if(token) navigate('/');
  })
  const handleLogin = async (e) => {
    e.preventDefault();
    const result=await apifunctions.login(email,password);
    if(result.flag){
      setCookie('userid',result);
    return navigate('/');
    }
    return;
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className='last-section'>Register here <a href='/signup'>Sign Up</a></div>
      </div>
    </div>
  );
}

export default LoginPage;
