import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Logginned } from "../../helpers/Logginend";

class Login extends Component {
  render() {
    Logginned();
    return (
      <>
        <h1 className="text-center">Zaloguj</h1>
        <ul className="navbar-nav ml-auto links">
          <li className="navbar-item">
            <Link to="/student-login" className="link text-decoration-none">
              Uczeń
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/teacher-login" className="link text-decoration-none">
              Nauczyciel
            </Link>
          </li>
        </ul>
      </>
    );
  }
}

export default Login;
