import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CommentsPage from '../pages/CommentsPage/CommentsPage'
import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/comments" element={<CommentsPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router