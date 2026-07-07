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

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import { loginUser } from "../../services/authService";

import { createSession } from "../../services/loginDeviceService";

import {
  trackLogin
}
from "../../services/activityService";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [error,
    setError] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const browser = navigator.userAgent;

    const deviceName = navigator.platform;

    const ipResponse = await fetch(
      "https://api.ipify.org?format=json"
    );

    const ipData = await ipResponse.json();

    const ipAddress = ipData.ip;

    // Login with device information

    const user = await loginUser({

      email,

      password,

      browser,

      ip_address: ipAddress,

      device_name: deviceName

    });

    const session = await createSession({

        user_id: user.id,
    
        company_id: user.company_id,
    
        user_name: user.name,
    
        email: user.email,
    
        browser: browser,
    
        ip_address: ipAddress,
    
        device_name: deviceName,
    
        trusted: true
    
    });
    
    localStorage.setItem(
    
        "session_id",
    
        session.session_id
    
    );

    console.log(user);

    setUser(user);

    const currentUser = user;

const currentIp = ipData.ip;

await trackLogin({

  user_id:
    currentUser.id,

  company_id:
    currentUser.company_id,

  user_name:
    currentUser.name,

  email:
    currentUser.email,

  browser:
    navigator.userAgent,

  ip_address: currentIp

});

/* USER STATUS CHECK */

if (
  user.status === "Deactivated"
) {

  navigate(
    "/account-deactivated"
  );

} else if (
  user.status === "Suspended"
) {

  navigate(
    "/account-suspended"
  );

} else {

  navigate(
    "/dashboard"
  );
}
      } catch (err) {

        setError(
          err.message
        );
      }
    };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h2>
          Login
        </h2>

        <form
          onSubmit={
            handleLogin
          }
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <div className="password-box">

  <input
    type={
      showPassword
        ? "text"
        : "password"
    }
    placeholder="Password"
    value={password}
    onChange={(e) =>
      setPassword(
        e.target.value
      )
    }
  />

  <span
    className="eye-icon"
    onClick={() =>
      setShowPassword(
        !showPassword
      )
    }
  >

    {showPassword ? (
      <FaEyeSlash />
    ) : (
      <FaEye />
    )}

  </span>

</div>


<Link
  className="forgot-link"
  to="/forgot-password"
>
  Forgot Password?
</Link>


          {error && (

            <p
              style={{
                color: "red",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
          >

            Login

          </button>

        </form>

        <p>

          Don't have an account?

          <Link
            to="/signup"
          >

            Signup

          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;