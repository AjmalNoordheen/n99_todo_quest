import { Toaster } from 'react-hot-toast'
import './App.css'
import LoginPage from './Components/Login/LoginPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './Components/Home/HomePage'
import { useSelector } from 'react-redux'

function App() {
  const token = useSelector((store)=>store.user.token)
  return (
    <>
    <Routes>
      <Route path='/' element={token?<Navigate to={'/home'}/>:<LoginPage/>} />
      <Route path='/signUp' element={<LoginPage/>} />
      <Route path='/home' element={token?<HomePage/>:<Navigate to={'/'} />} />
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
