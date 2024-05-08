import axios from "axios";
import { useContext, useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Login.css";
import whiteLogo from "../../assets/fakNews-white-logo-no-bg.svg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { activateUserService, loginUserService } from "../../services/index";
import { AuthContext } from "../../context/AuthContext";


const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setToken, setLogin, setAuth } = useContext(AuthContext);
  
    const { token } = useParams();
    const [activated, setActivated] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
  
    useEffect(() => {
      if (initialLoad) {
        setInitialLoad(false);
        return;
      }
  
      if (token && !activated) {
        activateAccount(token);
      }
    }, [token, activated, initialLoad]);
  
    const submitHandler = async (e) => {
      e.preventDefault();
  
      try {
        const data = await loginUserService({ email, password });
        setToken(data);
        setLogin(true);
        setAuth(true);
  
        if (data) return navigate("/");
      } catch (error) {
        toast.error(error.message);
      }
    };
  
    const activateAccount = async (token) => {
      try {
        const response = await activateUserService({ token });
  
        if (response.message === "Account activated successfully") {
          toast.success("Account activated successfully");
          setActivated(true);
        }
        if (response) return navigate("/account/myprofile");
      } catch (error) {
        toast.error(error.message);
      }
    };

  return (
    <>
      <ToastContainer />
      <main className="loginMainContent">
        <h1>Accede a tu perfil</h1>

        <div className="input-container">
          <form className="loginForm" onSubmit={submitHandler}>
            <input
              type="text"
              onChange={(e) =>
                setEmail(e.target.value)
              }
              id="user"
              name="user"
              placeholder="Email"
              className="loginNickname"
              required
            />
            <div>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                placeholder="Contraseña"
                className="loginPassword"
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <p>
            ¿Aún no tienes cuenta? <Link to="/register"> Registrate aquí</Link>
          </p>
        </div>
        <img src={whiteLogo} className="loginLogo" alt="fakNews logo" />
      </main>
    </>
  );
};

export default Login;