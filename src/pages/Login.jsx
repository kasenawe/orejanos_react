import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../redux/adminSlice";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";

import "./Login.css";

function Login() {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_DOMAIN}/login`,
        data: {
          username: usernameValue,
          password: passwordValue,
        },
      });

      if (response.data.error) {
        // Mostrar error de credenciales inválidas
        setError(response.data.error);
      } else {
        dispatch(setToken(response.data));

        navigate("/");
      }
    } catch (error) {
      setError("Error en el servidor");
    }
  }

  return (
    <div className="login-container mt-5">
      <div className="login-form">
        {error && <p className="text-center login-alert">{error}</p>}
        <p className="text-center login-title">Login </p>
        <p className="text-center login-title mb-4">Administradores</p>

        <form className="form" onSubmit={handleSubmit} autoComplete="off">
          <div className="input-group">
            <label htmlFor="username" className="login-text">
              Usuario
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              onChange={(event) => setUsernameValue(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="login-text">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={(event) => setPasswordValue(event.target.value)}
            />
            <Link to="/reset-password" className="forgot login-text">
              Olvido su contraseña?
            </Link>
          </div>
          <div className="login-btn-container mt-5">
            <button className="login-btn" type="submit">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
