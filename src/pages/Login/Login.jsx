import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h1>Welcome Back</h1>

        <input type="email" placeholder="Enter Email" required />

        <input type="password" placeholder="Enter Password" required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;