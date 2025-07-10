import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from './Add'
import TodosTable from './todos'

const Todos = () => {
  return (
    <Routes>
      <Route path="/todos/add"  element={<Add />}/>
      <Route path="/"  element={<TodosTable />}/>
    </Routes>
  )
}

export default Todos
