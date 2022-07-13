import React, { Component } from "react";
import axios from "axios";

import { Logginned } from "../../helpers/Logginend";
import Loading from "../Loading/Loading";

class StudentLogin extends Component {
  constructor(props) {
    super(props);

    Logginned();

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      isLoading: false
    };
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit() {
    this.state.isLoading = true;
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post(
        "https://dzienniczek-backend.herokuapp.com/users/student-login",
        user
      )
      .then((res) => {
        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem("class", res.data.user.instrument);
        localStorage.setItem("id", res.data.user._id);
      })
      .then(() => {
        window.location = "/lessons";
        this.state.isLoading = false;
      })
      .catch((err) => {
        alert(err);
        this.state.isLoading = false;
        window.location = "/student-login";
      });

    this.setState({
      email: "",
      password: ""
    });
  }
  page() {
    return (
      <div className="col-lg-6 col-md-8 mx-auto text-light">
        <h1 className="text-center mx-auto text-light">Logowanie</h1>
        <div className="form-group p-2">
          <label>Email: </label>
          <input
            type="text"
            className="form-control"
            value={this.state.email}
            onChange={this.onChangeEmail}
          />
        </div>
        <div className="form-group p-2">
          <label>Hasło: </label>
          <input
            type="password"
            className="form-control"
            value={this.state.password}
            onChange={this.onChangePassword}
          />
        </div>
        <div className="form-group text-center p-2">
          <input
            type="submit"
            onClick={this.onSubmit}
            value="Zaloguj"
            className="btn btn-success btn-block w-100"
          />
        </div>
      </div>
    );
  }
  render() {
    return this.state.isLoading ? <Loading /> : this.page();
  }
}

export default StudentLogin;
