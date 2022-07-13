import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { isError } from "../../helpers/isError";

import "../Layout/Navbar.scss";

const Navbar = () => {
  const role = window.localStorage.getItem("role");

  useEffect(() => isError);

  const logout = () => {
    window.localStorage.clear();
    window.location = "/";
  };

  const isTeacher = (role) => {
    if (role === "teacher" || role === "admin") {
      return (
        <li className="navbar-item">
          <Link to="/students" className="nav-link">
            Uczniowie
          </Link>
        </li>
      );
    }
  };

  const isAdmin = (role) => {
    if (role === "admin") {
      return (
        <>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">
              Utwórz plan lekcji
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/choose-user" className="nav-link">
              Utwórz konto
            </Link>
          </li>
        </>
      );
    }
  };

  const isLogin = () => {
    return (
      <div className="navbar position-fixed">
        <Link to="/lessons" className="navbar-brand logout button">
          DZIENNIK
        </Link>
        <div className="text-right pr-4">
          <ul className="navbar-nav ml-auto">
            <li className="navbar-item">
              <Link to="/lessons" className="nav-link">
                Lekcje
              </Link>
            </li>
            {isTeacher(role)}
            {isAdmin(role)}
            <li className="navbar-item">
              <Link to="/change-password" className="nav-link">
                Zmień hasło
              </Link>
            </li>
            <li className="navbar-item">
              <button className="nav-link logout" onClick={logout}>
                Wyloguj
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      {role && !isError() ? isLogin() : null}
    </nav>
  );
};

export default Navbar;
