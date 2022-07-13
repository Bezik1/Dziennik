import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isLogin } from "../../helpers/isLogin";

import "../Layout/Links.scss";

class ChooseUser extends Component {
  render() {
    isLogin();
    return (
      <>
        <h1 className="text-center">Utwórz konto</h1>
        <ul className="navbar-nav ml-auto links">
          <li className="navbar-item">
            <Link to="/student" className="link text-decoration-none">
              Uczeń
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/teacher" className="link text-decoration-none">
              Nauczyciel
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/admin" className="link text-decoration-none">
              Admin
            </Link>
          </li>
        </ul>
      </>
    );
  }
}

export default ChooseUser;
