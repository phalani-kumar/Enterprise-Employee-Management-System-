import {
  useState,
  useEffect
} from "react";

import {
  useSearchParams
} from "react-router-dom";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import axios from "axios";

function Signup() {

  const navigate = useNavigate();

  const [searchParams] =
  useSearchParams();

const token =
  searchParams.get("token");

const [isInvitation,
  setIsInvitation] =
  useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [role, setRole] =
    useState("");

  const [company, setCompany] =
  useState(""); 
  
  useEffect(() => {

  if (!token)
    return;

  axios.get(
    `http://127.0.0.1:8000/invitation/${token}`
  )
  .then((response) => {

    const invitation =
      response.data;

    setEmail(
      invitation.email
    );

    setRole(
      invitation.role
    );

    setCompany(
      invitation.company_name
    );

  });

}, [token]);

  const handleSignup = async (e) => {

  e.preventDefault();

  if (
  !name ||
  !email ||
  !password ||
  !role ||
  !company
) {

    alert(
      "Please fill all fields"
    );

    return;
  }

  try {

  await axios.post(
  "http://127.0.0.1:8000/signup",
  {
    name,
    email,
    password,
    role,

    company_id:
      company === "Company A"
        ? 1
        : 2
  }
);

  alert(
    "Signup Successful"
  );

  navigate("/login");

} catch (error) {

  console.log(error);

  alert(
  error.response?.data?.message ||
  "Signup Failed"
);
}
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
            disabled={!!token}
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

  value={company}
   disabled={!!token}
  onChange={(e) =>
    setCompany(
      e.target.value
    )
  }
>

  <option value="">
    Select Company
  </option>

  <option value="Company A">
    Company A
  </option>

  <option value="Company B">
    Company B
  </option>

</select>

          <select
            value={role}
            disabled={!!token}
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