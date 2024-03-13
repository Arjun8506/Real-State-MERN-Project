import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Profile from './pages/Profile'
import { useAuthContext } from './context/authContext'

const App = () => {

  const {authUser} = useAuthContext()

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element = {<Home />} />
      <Route path='/about' element = {<About />} />
      <Route path='/signin' element = {authUser ? <Navigate to="/" /> : <SignIn />} />
      <Route path='/signup' element = {<SignUp />} />
      <Route path='/profile' element = {authUser ? <Profile /> : <Navigate to="/signin" />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App