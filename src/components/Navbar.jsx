import { useContext } from "react";
import "./Navbar.css";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const handleLogOut = () => {
    logOutUser();
    navigate("/");
  };

  return (
    <>
      <nav className="nav">
        <div className="navbar">
          <section>
            <input id="menu-toggle" type="checkbox" />
            <label className="menu-button-container" htmlFor="menu-toggle">
              <div className="menu-button"></div>
            </label>
            {isLoggedIn ? (
              <ul className="menu">
                <li>
                  <a href="/events">
                    <div>My Events</div>
                  </a>
                </li>
                <li>
                  <a href="/queries">
                    <div>Queries</div>
                  </a>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            ) : (
              <ul className="menu">
                <li>
                  <a href="/signup">Signup</a>
                </li>
                <li>
                  <a href="/login">Login</a>
                </li>
              </ul>
            )}
          </section>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
