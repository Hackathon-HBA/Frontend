import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
//import Profile from "./pages/UserProfile/Profile";
//import Contact from "./pages/Contact/Contact";


//import About from "./pages/about/About";
//import Admin from "./pages/Admin/Admin";
//import User from "./pages/Admin/User";


import { CustomTokenContextProvider } from "./utils/TokenContext";

import Menu from "./components/menu/Menu";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import PrivateRoutes from "./components/user/PrivateRoutes";
import LoginPage from "./pages/LoginPage";
import SendEmailPage from "./pages/SendEmailPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";


import './index.css'
import { AuthProviderComponent } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <CustomTokenContextProvider>
        <Menu />
        <div className="pages" id="pages">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            {PrivateRoute() ? (<Route path="/admin" element={<Admin />} />) : <Route path="/*" element={<Error />} />}
            {PrivateRoute() ? (<Route path="/users" element={<User />} />) : <Route path="/*" element={<Error />} />} */}
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </CustomTokenContextProvider>
    </Router>
  </React.StrictMode>
)
