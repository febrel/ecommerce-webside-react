import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "../contexts/AuthContext";

function AuthPage() {
  // Variables - Estado
  const [mode, setMode] = useState("signup");
  const { signUp, user, logout, login } = useAuth();
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


  // Funciones
  function onSubmit(data) {
    setError(null); // reset al error
    let result;

    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }

    // Logica para error
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }

    console.log(result);
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {user && <p> <strong>User logged:</strong>  {user.email}</p>}
          <h1 className="page-title">{mode === "signup" ? "Sign Up" : "Login"}</h1>

          <form action="" className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="text" id="email" className="form-input" {...register("email", {
                required: "Email is required"
              })} />

              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" className="form-input" {...register("password", {
                required: "Password is required",
                required: "Password requerido",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characteres"
                },
                maxLength: {
                  value: 12,
                  message: "Password must be less than 12 characteres"
                }
              })} />

              {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-large"> {mode === "signup" ? "Sign Up" : "Login"}</button>
          </form>

          <div className="auth-switch">
            {mode === "signup" ? (<p>Already have an account? <span onClick={() => setMode("login")} className="auth-link">Login</span> </p>) : (<p>Don't have an account?   <span onClick={() => setMode("signup")} className="auth-link">Sign Up</span> </p>)}
          </div>

        </div>
      </div>
    </div>
  )
}

export default AuthPage;