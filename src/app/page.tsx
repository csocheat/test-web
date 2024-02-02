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
        withCredentials: true,
        headers: {
          apikey: "037cb34d-c5ee-4169-b2fd-bec049f77ecf"
        }
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


  const handleFacebookLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    window.location.href = `${url}/auth/facebook`
  } 
  const handleGoogleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    window.location.href = `${url}/auth/google?callback=${url}/home`;
  };
  const handleAppleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    window.location.href = `${url}/auth/apple?callback=${url}`;
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
        <button onClick={handleFacebookLogin}>Facebook</button>
        <button onClick={handleAppleLogin}>Apple</button>
      </div>
    </div>
  );
}