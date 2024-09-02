import React, { Component } from 'react'
import axios from 'axios'

export default function Login () {
  function onSubmitUsername(username, password) {
    axios.post('http://localhost:3000/auth/login', {
      username, password
  }).then(response => {
    console.log(response)
    const { token } = response.data
    localStorage.setItem('token',token);
  })

  }
  
  function handleSubmit(event) {
    event.preventDefault()
    
    const username = event.currentTarget.elements.usernameInput.value
    const password = event.currentTarget.elements.passwordInput.value
    onSubmitUsername(username, password)
  }
  
    return (
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            id="usernameInput"
          />
          <label for="usernameInput" >Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            id="passwordInput"
            />
            <label for="passwordInput">Password</label>
        </div>
        <div className="form-floating ">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    )
}