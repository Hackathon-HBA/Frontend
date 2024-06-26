import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import SidebarLink from "./SidebarLink";
import { IoMdLogOut, IoMdInformationCircle, IoIosPerson } from "react-icons/io";
import { FaHome, FaStar } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { RiAdminFill } from "react-icons/ri";
import { TbUsersGroup, TbWritingSign } from "react-icons/tb";
import { BsPencilSquare } from "react-icons/bs";
import fakNews from "../../assets/faknews-logo.svg";
import isAdmin from "../../utils/isAdmin";
import isAuth from "../../utils/isAuth";

const Sidebar = ({ handleSectionChange }) => {
  const [activeLink, setActiveLink] = useState("home");
  const navigate = useNavigate();
  //const { token, setToken, loggedUser } = useContext(TokenContext);
  const { setToken, setLogin, setAuth, token, userData } =
    useContext(AuthContext);

  useEffect(() => {
    const path = location.pathname;

    const linkMap = {
      "/": "home",
      "/register": "register",
      "/profile": "profile",
      "/contact": "contact",
      "/users": "users",
      "/balance-transaction": "balance-transaction",
      "/filter-transaction": "filter-transaction",
      "/future-plans": "future-plans",
      "/login": "login",
      "/about": "about",
      "/admin": "admin",
      "/createpost": "createpost",
      "/favorites": "favorites",
    };
    setActiveLink(linkMap[path] || "home");
    localStorage.setItem("activeLink", linkMap[path]);
  }, [location.pathname]);

  const handleLinkClick = (link, url) => {
    setActiveLink(link);
    localStorage.setItem("activeLink", link);
    navigate(url);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div>
      <div className="sidebar" id="sidebar">
        <nav className="sidebar__container">
          <div className="sidebar__logo">
            <img src={fakNews} alt="" className="sidebar__logo-img" />
          </div>

          <div className="sidebar__content">
            <div className="sidebar__list">
              <SidebarLink
                name="Inicio"
                isActive={activeLink === "home"}
                onClick={() => handleLinkClick("home", "/")}
                icon={<FaHome />}
              />
              {isAuth(token) && (
                <SidebarLink
                  name="Crear Transacción"
                  isActive={activeLink === "createpost"}
                  onClick={() =>
                    handleLinkClick("createpost", "/new-transaction")
                  }
                  icon={<BsPencilSquare />}
                />
              )}
              {isAuth(token) && (
                <SidebarLink
                  name="Filtrar Transacciones"
                  isActive={activeLink === "filter-transaction"}
                  onClick={() =>
                    handleLinkClick("filter-transaction", "filter-transaction")
                  }
                  icon={<FaStar />}
                />
              )}
              {isAuth(token) && (
                <SidebarLink
                  name="Balance de transacciones"
                  isActive={activeLink === "balance-transaction"}
                  onClick={() =>
                    handleLinkClick(
                      "balance-transaction",
                      "/balance-transaction"
                    )
                  }
                  icon={<TiMessages />}
                />
              )}
              {isAuth(token) && (
                <SidebarLink
                  name="Planes de futuro"
                  isActive={activeLink === "future-plans"}
                  onClick={() =>
                    handleLinkClick("future-plans", "/future-plans")
                  }
                  icon={<FaStar />}
                />
              )}
              <SidebarLink
                name="Sobre nostros"
                isActive={activeLink === "about"}
                onClick={() => handleLinkClick("about", "/about")}
                icon={<IoMdInformationCircle />}
              />
              <SidebarLink
                name="Contacto"
                isActive={activeLink === "contact"}
                onClick={() => handleLinkClick("contact", "/contact")}
                icon={<TiMessages />}
              />
            </div>

            {isAdmin(token) && (
              <div>
                <h3 className="sidebar__title">
                  <span>Admin</span>
                </h3>

                <div className="sidebar__list">
                  <SidebarLink
                    name="Usuarios"
                    isActive={activeLink === "users"}
                    onClick={() => handleLinkClick("users", "/users")}
                    icon={<TbUsersGroup />}
                  />
                  <SidebarLink
                    name="Admin"
                    isActive={activeLink === "admin"}
                    onClick={() => handleLinkClick("admin", "/admin")}
                    icon={<RiAdminFill />}
                  />
                </div>
              </div>
            )}

            <h3 className="sidebar__title">
              <span>Mi perfil</span>
            </h3>

            <div className="sidebar__list">
              {isAuth(token) && (
                <SidebarLink
                  name="Perfil"
                  isActive={activeLink === "profile"}
                  onClick={() => handleLinkClick("profile", "/profile")}
                  icon={<IoIosPerson />}
                />
              )}
              {!isAuth(token) && (
                <SidebarLink
                  name="Login"
                  isActive={activeLink === "login"}
                  onClick={() => handleLinkClick("login", "/login")}
                  icon={<IoMdLogOut />}
                />
              )}
              {!isAuth(token) && (
                <SidebarLink
                  name="Register"
                  isActive={activeLink === "register"}
                  onClick={() => handleLinkClick("register", "/register")}
                  icon={<TbWritingSign />}
                />
              )}
              {isAuth(token) && (
                <SidebarLink
                  name="Logout"
                  isActive={activeLink === "logout"}
                  onClick={handleLogout}
                  icon={<IoMdLogOut />}
                />
              )}
            </div>
          </div>
          {isAuth(token) && userData && (
            <div className="sidebar__account">
              <div className="sidebar__names">
                <h3 className="sidebar__name">
                  {userData.name} {userData.lastname}
                </h3>
                <span className="sidebar__email">{userData.email}</span>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
