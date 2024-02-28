import "./LoginPage.css"
import { useState, useContext} from "react";
import { Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL

function LoginPage(props) {

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
    
    axios
    .post(`${API_URL}/auth/login`, requestBody)
    .then((response) => {
      storeToken(response.data.authToken);
      authenticateUser();
      navigate("/");
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
          required={true}
        />
        <label htmlFor="password">Password</label>
        <input 
        type="password" 
        id="password" 
        name="password" 
        value = {password}
        onChange={handlePassword}
        placeholder="Your password.." 
        required={true}
        />
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