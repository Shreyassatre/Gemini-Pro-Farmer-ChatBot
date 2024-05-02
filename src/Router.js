import React from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Chatbot from './Components/Chatbot'

function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Chatbot/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router