import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import LoginScreen from './pages/Login'
import RegisterScreen from './pages/Register'
import CategoryScreen from './pages/Category'
import TaskScreen from './pages/Task'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/category' element={<CategoryScreen />} />
            <Route path='/task' element={<TaskScreen />} />
          </Routes>
        </div>
        <Footer />
      </Router>
      
      <ToastContainer />
    </>
  )
}

export default App
