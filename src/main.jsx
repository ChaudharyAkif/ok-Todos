import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './config/global.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authcontext.jsx'
import '@ant-design/v5-patch-for-react-19';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
       <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
