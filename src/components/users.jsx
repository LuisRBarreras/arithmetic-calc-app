import React, { useState, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'

import axios from 'axios'

function Users() {
  const [users, setUsers] = useState([])
  
  const getUsers = async() => {
    await axios.get('http://localhost:3000/users')
    .then(response => {
      console.log(`Get Users: ${response.data}`)
      setUsers(response.data)
    })
  }
  

  useEffect(() => {
    getUsers()
  }, [])


  
  return (
  <div>
    <h1>Hello Users</h1>
    <ListGroup>
      { users.map((e) => {
          return <ListGroup.Item key={e.id}>{e.firstName}</ListGroup.Item>
      })}
    </ListGroup>
    
    <Badge bg="secondary">New</Badge>
  </div>
  )
}

export default Users;