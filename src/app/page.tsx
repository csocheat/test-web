"use client"

import axios from "axios";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { headers } from "next/headers";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('chea.socheat@icloud.com');
  const [password, setPassword] = useState('P@ss@194!');

  // const url = "http://localhost:3001"
  const url = "https://dev.tovtrip.com/usersvc/api/v1"
  useEffect(() => {
    // Check if user is already logged in
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get(`${url}/users/me`, { withCredentials: true, headers : {
          apikey: "037cb34d-c5ee-4169-b2fd-bec049f77ecf"
        } });
        const status = response.status;
        if(status){
          setLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoggedIn();
  }, []);


  const handleLogout = async () => {
    try {
      const response = await axios.post(`${url}/auth/web/logout`, {}, {
        withCredentials: true
      });
      console.log(response.status);
      console.log(response.data)
      if(response.status == 200){
        setLoggedIn(false);
      }
      // router.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/auth/login`, {
        email,
        password,
      }, { withCredentials : true, headers : {
        apikey: "037cb34d-c5ee-4169-b2fd-bec049f77ecf"
      }});
      console.log(response.data);
      // Redirect or perform additional actions on successful login
    } catch (error) {
      console.error(error);
    }
  };


  const handleGoogleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    try {
      const response = await axios.get('https://dev.tovtrip.com/usersvc/api/v1/auth/google');
      if(response.status === 200 && response.data){
        console.log(response.data.data.redirectUrl);
        window.location.href = response.data.data.redirectUrl;
      }else {
        console.error('Failed to initiate Google authentication:', response.data.error);
        
      }
    } catch (error) {
      console.error('Error during Google authentication initiation:', error);
      
    }
  };


  return (
    <div>
      {
        loggedIn ? (
          <div>
            <p>You've already logged in</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) :  (
      <div>
              <h1>Login</h1>
              <form onSubmit={handleLogin}>
                <label>
                  Email:
                  <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                  Password:
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Login</button>
              </form>
      </div>
  )
      }

      <div>
        <h2>Social Login</h2>
        <button onClick={handleGoogleLogin}>Google</button>
      </div>
    </div>
  );
}