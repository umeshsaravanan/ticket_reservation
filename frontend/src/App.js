import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
import Layout from "./auth/Layout";
import RequireAuth from "./auth/RequireAuth";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Page404 from "./pages/Page404";
import Admin from "./pages/Admin";
import AdminAuth from "./auth/AdminAuth";
import NewBus from "./pages/NewBus";
import History from "./pages/History";
import CancelPage from "./pages/CancelPage";
import Users from "./pages/Users";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer newestOnTop autoClose={2000} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route path="/:id" element={<Booking />} />
            <Route path="/cancel" element={<CancelPage />} />
            <Route path="/dashboard" element={<AdminAuth />}>
              <Route index element={<Admin/>} />
              <Route path="addbus" element={<NewBus />} />
              <Route path="history" element={<History />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Route>
          <Route path="/*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
