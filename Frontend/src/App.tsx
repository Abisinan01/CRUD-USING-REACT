import Login from './pages/User/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/User/Signup'
import { ToastContainer } from 'react-toastify'
import Home from './pages/User/Home'
import Profile from './pages/User/Profile'
import { ProtectedRoutes, PublicRoutes } from './routes/ProtectedRoutes'
import AdminLogin from './pages/admin/AdminLogin'
import { AdminProtectedRoutes, AdminPublicRoutes } from './routes/adminProtecetedRoute'
import Dashboard from './pages/admin/AdminDashboard'
import NotFound from './pages/NotFound'
const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<AdminPublicRoutes />}>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        <Route element={<AdminProtectedRoutes />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  )
}


export default App