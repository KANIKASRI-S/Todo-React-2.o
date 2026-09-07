import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


/* 
  function handleLogin(event) {
    event.preventDefault(); */


    /* console.log("Email:", email);
    console.log("Password:", password);
    navigate("/todos"); */
     // get saved user

  // const savedUser = JSON.parse(localStorage.getItem("user"));


/* console.log("Saved user:", savedUser);
console.log("Entered email:", email);
console.log("Entered password:", password);


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

  } */
     async function handleLogin(event) {
  event.preventDefault();

  try {
    // Send login details to backend
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();

    console.log("Login response:", data);

    if (response.ok) {
      console.log("Login successful");

      // Save logged-in user
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/todos");
    } else {
      console.log("Invalid email or password");

      alert(data.message);
    }

  } catch (error) {
    console.log("Login error:", error);

    alert("Cannot connect to backend");
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