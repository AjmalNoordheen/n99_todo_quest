import { Toaster } from 'react-hot-toast'
import './App.css'
import LoginPage from './Components/Login/LoginPage'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Components/Home/HomePage'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LoginPage/>} />
      <Route path='/signUp' element={<LoginPage/>} />
      <Route path='/home' element={<HomePage/>} />
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
