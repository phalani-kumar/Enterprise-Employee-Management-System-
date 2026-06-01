import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const navigate =
    useNavigate();

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const handleReset = () => {

    const users =
      JSON.parse(
        localStorage.getItem(
          "users"
        )
      ) || [];

    const index =
      users.findIndex(
        (user) =>
          user.email === email
      );

    if (index === -1) {

      alert(
        "User not found"
      );

      return;
    }

    users[index].password =
      password;

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert(
      "Password Updated"
    );

    navigate("/login");
  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h2>
          Forgot Password
        </h2>

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

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={
            handleReset
          }
        >

          Update Password

        </button>

      </div>

    </div>
  );
}

export default ForgotPassword;