import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import ForgetPassword from "./pages/ForgetPassword"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./context/AuthProvider"


const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<div>Dashboard</div>} />
          </Route>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
