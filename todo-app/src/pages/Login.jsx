import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();

    /* console.log("Email:", email);
    console.log("Password:", password);
    navigate("/todos"); */
     // get saved user
  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (
    savedUser &&
    savedUser.email === email &&
    savedUser.password === password
  ) {
    console.log("Login successful");

    navigate("/todos");
  } else {
    console.log("Invalid email or password");

    alert("Invalid email or password");
  }

  }

  return (
    <div className="login-page">

      <div className="login-box">

        <h1>Todo App</h1>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>
  Don't have an account?{" "}
  <span onClick={() => navigate("/signup")}>
    Sign Up
  </span>
</p>

      </div>

    </div>
  );
}

export default Login;