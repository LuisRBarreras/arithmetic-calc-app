import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { API_URL } from '../constants';

function Records() {
  const [records, setRecords] = useState([])
  const [totalPages, setTotalPages] = useState([])
  const [activePage, setActivePage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const token = localStorage.getItem('token')
  const size = 10

  const makeRecordRequest = (params) => {
    return axios.get(`${API_URL}/records`, { headers: { Authorization: token }, params })
  }
  const searchHandler = async (e) => {
    setSearchValue(e.target.value)
    getRecords(0, e.target.value)
  }

  const handlerPagination = async (page, isActive) => {
    if (!isActive) {
      getRecords(page, searchValue)
      
    }
  }

  const getRecords = async (page, search) => {
    const params = { size, page}
    if(searchHandler) params.search = search

    await makeRecordRequest(params)
      .then(response => {
        const n = Math.ceil(response.data.count / params.size)
        const pagesArray = [...Array(n).keys()].map(i => i + 1)
        setActivePage(page)
        setTotalPages(pagesArray)
        setRecords(response.data.rows)
      })
  }
  const handlerDelete = async (recordId) => {
    await axios.delete(`${API_URL}/records/${recordId}`, { headers: { Authorization: token } })
    getRecords(0)
  }
  
  useEffect(() => {
    getRecords(activePage)
  }, [])

  return (
    <div>
      <h3>Records</h3>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
        <Form.Control
          aria-describedby="basic-addon1"
          onChange={(event) => searchHandler(event) }
        />
      </InputGroup>
      <Table striped="columns">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Operation Response</th>
            <th>Amount/Cost</th>
            <th>User Valance</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            return (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.type}</td>
                <td>{record.operationResponse}</td>
                <td>{record.amount}</td>
                <td>{record.userBalance}</td>
                <td>{record.date}</td>
                <td>
                <Button variant="danger" onClick={(e) => handlerDelete(record.id)}>Delete</Button>
                </td>
              </tr>
            )
          })}
          <Pagination size="md" className='pagination'>
            <Pagination.Prev />
            {totalPages.map((e, index) => {
              return (
                <Pagination.Item
                  key={e}
                  active={index === activePage}
                  onClick={() => handlerPagination(index, (index === activePage))}>{e}</Pagination.Item>
              )
            })}
            <Pagination.Next />
          </Pagination>
        </tbody>
      </Table>
    </div>
  )
}

export default Records;