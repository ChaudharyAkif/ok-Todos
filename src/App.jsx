import { useState } from 'react'
import './App.scss'
import Todos from './Todos'
import Add from './Todos/Add'
import { ConfigProvider } from 'antd'

function App() {

  return (
<>
<ConfigProvider
    theme={{
      token: {
        colorPrimary: '#14213d',

      },
    }}
  >
    <Todos />
  </ConfigProvider>
</>
  )
}

export default App
