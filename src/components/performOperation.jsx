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
import {useNavigate} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

import { API_URL } from '../constants';

function PerformOperation() {
    const navigate = useNavigate()
  const [operation, setOperation] = useState("")
  const [number1, setNumber1] = useState(null)
  const [number2, setNumber2] = useState(null)
  const token = localStorage.getItem('token')
  const credit = localStorage.getItem('credit')

  const notifySuccess = () => toast.success('Successful operation');
  const notifyError = () => toast.error('Something went wrong with the operation');

  const createRequest = (data) => {
    return axios.post(`${API_URL}/operation`, data, { 
      headers: { Authorization: token },  
    })
  }
  useEffect(() => {
  }, [])
  
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {number1, number2, operation, credit}
    await createRequest(data).then((result) => {
      const newCredit = Number.parseInt(result.data?.newRecord?.user_balance)
      localStorage.setItem('credit', newCredit)

      notifySuccess()
      setTimeout(() => {
        navigate("/records")
      }, 4000)
    }).catch(error => {
      console.error(error)
      notifyError()
    }) 
  
  }

  return (
    <div>
      <h3>Perform Operation</h3>
      <Container fluid>
        <Form method='post'  onSubmit={handleSubmit}>
          <Form.Group className="mb-3" >
            
            <Form.Select aria-label="Default select example"
             onChange = {(event)=> setOperation(event.target.value)}  >
                <option value="addition" selected>Addition</option>
                <option value="subtraction">Subtraction</option>
                <option value="multiplication">Multiplication</option>
                <option value="division">Division</option>
                <option value="square_root">Square root</option>
                <option value="random_string">Random string</option>
              </Form.Select>
          </Form.Group>
        <Row>
          <Col >
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputNum1">1st:</InputGroup.Text>
              <Form.Control
                aria-describedby="inputNum1"
                onChange = {(event)=> setNumber1(event.target.value)}
              />
            </InputGroup>
          </Col>
          <Col >
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputNum2">2nd:</InputGroup.Text>
              <Form.Control
                aria-describedby="inputNum2"
                onChange = {(event)=> setNumber2(event.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className="mb-3" type="submit" >Perform</Button>
          </Col>
          <Col></Col> <Col></Col> <Col></Col> <Col></Col> <Col></Col> </Row>
        </Form>
      </Container>
      <Toaster />
      <div>
    </div>
    </div>
  )
}

export default PerformOperation;