import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaUserPlus } from "react-icons/fa";

import { registerUserService } from "../services";
import IconoUserRegister from "../components/icons/UserRegister";
import Email from "../components/icons/Email";
import Password from "../components/icons/Password";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    if (pass1 !== pass2) {
      toast.error(
        `The "passwords" you entered do not match. Please make sure to enter the same password in both fields.`
      );
      return;
    }

    try {
      const data = await registerUserService({
        username,
        email,
        password: pass1,
      });

      const { token } = data;
      navigate(`/registered`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="login-page">
      <form onSubmit={handleForm} style={{ margin: "2rem" }}>
        <fieldset
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",

            padding: "1.7rem",
            margin: "0.5rem",
            borderRadius: "15px",
            backgroundColor: "#dcdcdccf",
          }}
        >
          <h2
            style={{
              color: "rgb(194, 178, 128)",
              fontSize: "1.75rem",
              fontWeight: "600px",
              lineHeight: "1.5715",
              textAlign: "center",
            }}
          >
            Regístrate <Link to="/">"Añadir nombre de web"</Link>
          </h2>
          <ul>
            <li className="input-register">
              <IconoUserRegister />
              <input
                className="input-reg"
                type="text"
                id="username"
                name="username"
                required
                placeholder="Nombre de usuario"
                onChange={(e) => setUsername(e.target.value)}
              />
            </li>
            <li className="input-register">
              <Email />
              <input
                className="input-reg"
                type="email"
                id="email"
                name="email"
                required
                placeholder="Correo electrónico "
                onChange={(e) => setEmail(e.target.value)}
              />
            </li>
            <li className="input-register">
              <Password />
              <input
                className="input-reg"
                type="password"
                id="pass1"
                name="pass1"
                required
                placeholder="Contraseña"
                onChange={(e) => setPass1(e.target.value)}
              />
            </li>
            <li className="input-register">
              <Password />
              <input
                className="input-reg"
                type="password"
                id="pass2"
                name="pass2"
                required
                placeholder="Repetir contraseña"
                onChange={(e) => setPass2(e.target.value)}
              />
            </li>
            <li className="input-register">
              <button className="boton-reg">
                <span>Registro</span>
                <FaUserPlus />
              </button>
            </li>
          </ul>
          <div className="alta-login">
            <p>¿Tienes ya cuenta con nosotros?</p>
            <Link style={{ textAlign: "center" }} to="/login">
              {" "}
              <p className="anchor">Inicia sesión</p>
            </Link>
          </div>{" "}
        </fieldset>
      </form>
    </section>
  );
};

export default RegisterPage;
