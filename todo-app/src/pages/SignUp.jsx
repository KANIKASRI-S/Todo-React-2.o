import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


/*   function handleSignUp(event) {
    event.preventDefault(); */

    async function handleSignUp(event) {
  event.preventDefault();

  try {
    // Send user details to backend
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });

    const data = await response.json();

    console.log("Signup response:", data);

    if (response.ok) {
      alert("Signup successful!");
      navigate("/login");
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.log("Signup error:", error);
    alert("Cannot connect to backend");
  }
}

    /* // save user details

    const user = {
      name: name,
      email: email,
      password: password
    };


    localStorage.setItem("user", JSON.stringify(user));

    console.log("User saved:", user);

    navigate("/login");
  }

    localStorage.setItem("user", JSON.stringify(user)); */

    // console.log("User saved:", user);

   /*  navigate("/login");
  } */


  return (
    <div className="login-page">

      <div className="login-box">

        <h1>Todo App</h1>

        <h2>Sign Up</h2>

        <form onSubmit={handleSignUp}>

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

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
            Sign Up
          </button>

        </form>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default SignUp;