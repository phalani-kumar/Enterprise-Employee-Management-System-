// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     navigate("/dashboard");
//   };

//   return (
//     <div className="login-container">
//       <form className="login-card" onSubmit={handleLogin}>
//         <h1>Welcome Back</h1>

//         <input type="email" placeholder="Enter Email" required />

//         <input type="password" placeholder="Enter Password" required />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import {
  loginUser,
} from "../../services/authService";

import {
  useAuth,
} from "../../context/AuthContext";

function Login() {

  const navigate =
    useNavigate();

  const { setUser } =
    useAuth();

  const [isSignup,
    setIsSignup] =
    useState(false);

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [formData,
    setFormData] =
    useState({

      name: "",

      email: "",

      password: "",
    });

  const [error,
    setError] =
    useState("");

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      /* VALIDATION */

      if (
        !formData.email ||
        !formData.password
      ) {

        setError(
          "Please fill all fields"
        );

        return;
      }

      try {

        /* SIGNUP */

        if (isSignup) {

          const newUser = {

            id: Date.now(),

            name:
              formData.name,

            email:
              formData.email,

            role: "Admin",
          };

          localStorage.setItem(
            "authUser",
            JSON.stringify(
              newUser
            )
          );

          setUser(newUser);

          navigate(
            "/dashboard"
          );

        } else {

          /* LOGIN */

          const user =
            await loginUser(
              formData.email,
              formData.password
            );

          setUser(user);

          navigate(
            "/dashboard"
          );
        }

      } catch (error) {

        setError(
          "Invalid Email or Password"
        );
      }
    };

  return (

    <div className="login-page">

      <div className="login-card">

        <form
          onSubmit={
            handleSubmit
          }
        >

          <h1>

            {isSignup
              ? "Create Account"
              : "Welcome Back"}

          </h1>

          {error && (

            <div className="error-box">

              {error}

            </div>
          )}

          {/* NAME */}

          {isSignup && (

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
            />
          )}

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
          />

          {/* PASSWORD */}

          <div className="password-box">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Enter Password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
            />

            <span
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >

              {showPassword
                ? <FaEyeSlash />
                : <FaEye />}

            </span>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
          >

            {isSignup
              ? "Sign Up"
              : "Login"}

          </button>

          {/* SWITCH */}

          <p className="switch-text">

            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}

            <span
              onClick={() =>
                setIsSignup(
                  !isSignup
                )
              }
            >

              {isSignup
                ? " Login"
                : " Sign Up"}

            </span>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;