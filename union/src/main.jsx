import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Contact from "./pages/Contact/Contact";

import About from "./pages/about/About";
//import Admin from "./pages/Admin/Admin";
//import User from "./pages/Admin/User";

import { CustomTokenContextProvider } from "./utils/TokenContext";

import Menu from "./components/menu/Menu";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import PrivateRoutes from "./components/user/PrivateRoutes";
import LoginPage from "./pages/LoginPage";
import SendEmailPage from "./pages/SendEmailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import NewTransaction from "./pages/NewTransaction/NewTransaction";
import FilterTransaction from "./pages/FilterTransaction/FilterTransaction";
import BalanceTransaction from "./pages/BalanceTransaction/BalanceTransaction";
import FuturePlans from "./pages/FuturePlans/FuturePlans";

import "./index.css";
import { AuthProviderComponent } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProviderComponent>
        <Menu />
        <div className="pages" id="pages">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/new-transaction" element={<NewTransaction />} />
            <Route path="/filter-transaction" element={<FilterTransaction />} />
            <Route
              path="/balance-transaction"
              element={<BalanceTransaction />}
            />
            <Route path="/future-plans" element={<FuturePlans />} />
            {/* {PrivateRoute() ? (<Route path="/admin" element={<Admin />} />) : <Route path="/*" element={<Error />} />}
            {PrivateRoute() ? (<Route path="/users" element={<User />} />) : <Route path="/*" element={<Error />} />} */}
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </AuthProviderComponent>
    </Router>
  </React.StrictMode>
);
