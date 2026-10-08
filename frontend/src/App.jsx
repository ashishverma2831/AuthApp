import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
// import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import ForgetPassword from "./pages/ForgetPassword"


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App