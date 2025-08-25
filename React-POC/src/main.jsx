import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from 'axios'
import App from './App.jsx'

axios.interceptors.request.use(request => {
  console.log("Request:", request);
  request.headers['Authorization'] = `Bearer ${localStorage.getItem("authToken")}`;
  return request;
})

axios.interceptors.response.use(response => {
  console.log("Response:", response);
  return response;
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
