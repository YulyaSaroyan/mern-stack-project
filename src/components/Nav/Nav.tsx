import React, { useEffect, useState, useCallback } from "react"
import { Link, NavigateFunction, useNavigate } from "react-router-dom"

import "./Nav.css";

const Nav = () => {
  const navigate: NavigateFunction = useNavigate()

  const [isToken, setIsToken] = useState<boolean>(true)
  const [path, setPath] = useState<string>(window.location.pathname)
  const [loginPage, setLoginPage] = useState<boolean>(true)

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setIsToken(false);
    navigate("/")
  }, [navigate])

  useEffect(() => {
    if (!isToken) {
      setPath("/");
      setLoginPage(true)
    }
  }, [isToken, path])

  return (
    <div className="nav-wrapper">
      <div className="container">
        <nav className="nav">
          <p>User Page</p>
          <div>
            {path !== "/user-account" ? (
              <>
                {loginPage ? (
                  <Link to="/registration" onClick={() => setLoginPage(false)}>
                    sign up
                  </Link>
                ) : (
                  <Link to="/" onClick={() => setLoginPage(true)}>
                    sign in
                  </Link>
                )}
              </>
            ) : (
              <div onClick={() => handleLogout()}>Logout</div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
