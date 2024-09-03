import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


import { API_RULE } from '../constants';


function Records() {
  const [records, setRecords] = useState([])
  const [totalPages, setTotalPages] = useState([])
  const [activePage, setActivePage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const token = localStorage.getItem('token')
  const size = 10

  const makeRecordRequest = (params) => {
    return axios.get(`${API_RULE}/records`, { headers: { Authorization: token }, params })
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
          </tr>
        </thead>
        <tbody>
          {records.map((e) => {
            return (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.type}</td>
                <td>{e.operationResponse}</td>
                <td>{e.amount}</td>
                <td>{e.userBalance}</td>
              </tr>
            )
          })}
          <Pagination size="md">
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