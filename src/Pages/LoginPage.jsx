import "./LoginPage.css"
import { useState, useContext} from "react";
import { Link, useNavigate} from "react-router-dom"
import authService from "../services/auth.service";
import { AuthContext } from "../context/auth.context";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const {storeToken, authenticateUser} = useContext(AuthContext)

  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleLogin = (e) => {
    e.preventDefault()
    const requestBody = { email, password }
    
    authService
    .login(requestBody)
    .then((res) => {
      storeToken(res.data.authToken)
      authenticateUser()
      navigate("/")
    })

  };
  

    return (
        <div className="login">
         <form onSubmit={handleLogin}>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmail}
          placeholder="Your email.."
        />
        <label htmlFor="password">Password</label>
        <input 
        type="password" 
        id="password" 
        name="password" 
        value = {password}
        onChange={handlePassword}
        placeholder="Your password.." />
         <button type="submit">
            Login
          </button>
      </form>
        {errorMessage && <p>{errorMessage}</p>}
        <p>Don't have an account yet?</p>
      <Link className="link" to={"/signup"}> Sign Up</Link>
        </div>
          
    )
}

export default LoginPage