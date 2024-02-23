import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import authService from "../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignup = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .signup(requestBody)
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <div className="login">
        <form onSubmit={handleSignup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            placeholder="Type email"
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder="Type password"
          />

          <button type="submit">Sign Up</button>
        </form>

        {errorMessage && <p>{errorMessage}</p>}

        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    </>
  );
}

export default SignupPage;
