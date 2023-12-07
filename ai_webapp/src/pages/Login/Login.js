import React, { useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import './Login.css';
import { useAuth } from '../../components/useAuth/useAuth';

const Login = () => {
  const { login } = useAuth(); 
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error,setError]=useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res=await fetch('http://localhost:3000/api/users/login',{
      method:'POST',
      credentials: "include", // added this part
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,password
      })
    })

    console.log(res)
    const userData=await res.json()

    if (userData && userData.token && userData.user) {
      // Check if the necessary properties are present
      if (typeof Storage !== 'undefined') {
        setTimeout(() => {
          localStorage.setItem('authToken', userData.token);
        }, 1000);
        // Continue with the rest of your code after successful login
        login(userData.user);
        window.alert('Login Successful');
        navigate('/');
      } else {
        console.error('Local storage is not supported');
      }
    }
    else{
      if(res.status===500){
        console.log(userData)
        window.alert("userData")
      }
      else if(res.status===400){
        setError({[userData.errors[0].path]:userData.errors[0].msg})
      }
      else{
        console.log(userData)
        window.alert("Invalid Credential")
      }
    }
  };

  return (
    <div className="login-container">
      <form method='POST' onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="email"
            id="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder='Password'
            value={password}
            onChange={(e) => {setPassword(e.target.value);setError({})}}
            required
          />
          {error.password && <div className="error">{error.password}</div>}
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <NavLink to="/signup">Create an Account</NavLink>
      </form>
    </div>
  );
};

export default Login;
