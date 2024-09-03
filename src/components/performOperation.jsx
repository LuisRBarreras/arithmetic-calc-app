import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import {useNavigate} from 'react-router-dom'


import { API_URL } from '../constants';

function PerformOperation() {
    const navigate = useNavigate()
  const [operation, setOperation] = useState("")
  const [number1, setNumber1] = useState(null)
  const [number2, setNumber2] = useState(null)
  const [show, setShow] = useState(false);
  const token = localStorage.getItem('token')
  const credit = localStorage.getItem('credit')

  const createRequest = (data) => {
    console.log({data})
    return axios.post(`${API_URL}/operation`, data, { 
      headers: { Authorization: token },  
    }).then((result) => {
      setShow(true)
      
      setTimeout(() => {
        navigate("/records")

      }, 4000)
    }).catch(error => {
      console.error(error)
      
      
    }) 
  }
  useEffect(() => {
  }, [])
  
  async function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    console.log({operationType: operation})
    const data = {number1, number2, operation, credit}
    const result = await createRequest(data)
    console.log('Create operation result', result)
  
  }

  return (
    <div>
      <h3>Perform Operation</h3>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} bg='success'>
        <Toast.Header>
          <strong className="me-auto">Operation successful</strong>
        </Toast.Header>
        {/* <Toast.Body>Hello, world! This is a toast message.</Toast.Body> */}
      </Toast>

      <Container fluid>

        <Form method='post'  onSubmit={handleSubmit}>
          <Form.Group className="mb-3" >
            
            <Form.Select aria-label="Default select example"
             onChange = {(event)=> setOperation(event.target.value)}  >
                <option>Select Operation</option>
                <option value="addition">Addition</option>
                <option value="subtraction">Subtraction</option>
                <option value="multiplication">Multiplication</option>
                <option value="division">Division</option>
                <option value="square_root">Square root</option>
                <option value="random_string">Random string</option>
              </Form.Select>
          </Form.Group>
          
          <Button className="mb-3" type="submit" >Perform</Button>
          
        </Form>
        <Row>
          <Col>
            
          </Col>
        </Row>
        <Row>
          <Col >
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
              <Form.Control
                aria-describedby="basic-addon1"
                onChange = {(event)=> setNumber1(event.target.value)}
              />
            </InputGroup>
          </Col>
          <Col >
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
              <Form.Control
                aria-describedby="basic-addon1"
                onChange = {(event)=> setNumber2(event.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

      </Container>


      <Row>
        <Col>
        </Col>
        <Col>
          <Button className="mb-3" variant="secondary">Clear</Button>
        </Col>
        <Col> </Col>
        <Col> </Col>
      </Row>
          


    </div>
  )
}

export default PerformOperation;