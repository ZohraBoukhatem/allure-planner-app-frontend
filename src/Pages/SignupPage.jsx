import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignup = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    console.log(requestBody)
    console.log("handleSubmit, signuppage")

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        console.log(".then")
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = "unable to sign up"
        setErrorMessage(errorDescription);

  })
  }

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
            required={true}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder="Type password"
            required={true}
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
