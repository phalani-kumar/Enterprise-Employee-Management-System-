import { useState } from "react";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [role, setRole] =
    useState("");

  const handleSignup = (e) => {

  e.preventDefault();

  if (
    !name ||
    !email ||
    !password ||
    !role
  ) {

    alert(
      "Please fill all fields"
    );

    return;
  }

  const users =
    JSON.parse(
      localStorage.getItem(
        "users"
      )
    ) || [];

  const userExists =
    users.find(
      (user) =>
        user.email.toLowerCase() ===
        email.toLowerCase()
    );

  if (userExists) {

    alert(
      "User already exists"
    );

    return;
  }

  const newUser = {

    id: Date.now(),

    name,

    email,

    password,

    role,
  };

  users.push(newUser);

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  alert(
    "Signup Successful"
  );

  navigate("/login");
};

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h2>
          Signup
        </h2>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

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
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
          >

            <option value="">
              Select Role
            </option>

            <option value="Admin">
              Admin
            </option>

            <option value="User">
              User
            </option>

          </select>

          <button type="submit">

            Signup

          </button>

        </form>

        <p>

          Already have an account?

          <Link to="/login">

            Login

          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;