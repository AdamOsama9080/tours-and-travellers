import React, { useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://apis-2-4nek.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      // Assuming the response contains a token
      const { token } = response.data;

      // Decode the token
      const decodedToken = jwtDecode(token);

      // Extract user information
      const { firstName, lastName, email: decodedEmail } = decodedToken;

      // Store token and user information in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("email", decodedEmail);

      // Redirect to profile component
      window.location.href = "/profile";

    } catch (error) {
      // Handle errors from the API request
      console.error("Error signing in:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
