import React, { Component, Suspense  } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

import "../Layout/Button.scss";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class AtendanceLesson extends Component {
  constructor(props) {
    super(props);

    // Bind state to event handler callbacks
    this.onChangeAttendance = this.onChangeAttendance.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State management for new lesson
    this.state = {
      status: [" ", "•", "-", "s", "z", "u"],
      date: "",
      month: "",
      classroom: "",
      students: [],
      attendance: [],
      attendances: [],
      subjects: [],
      isLoading: true
    };
  }
  whatDay(res, day) {
    switch (day) {
      case "Poniedziałek":
        return res.data.plan1.split(" ");
      case "Wtorek":
        return res.data.plan2.split(" ");
      case "Środa":
        return res.data.plan3.split(" ");
      case "Czwartek":
        return res.data.plan4.split(" ");
      case "Piątek":
        return res.data.plan5.split(" ");
    }
  }
  getNumber(number) {
    if (number === 0) {
      return 0;
    } else {
      return number * this.state.subjects.length;
    }
  }
  // componentDidMount
  componentDidMount() {
    axios
      .get(
        `https://dzienniczek-backend.herokuapp.com/attendance/${this.props.params.id}`
      )
      .then((res) => {
        this.setState({
          attendance: res.data.attendance
        });
      })
      .catch(function (error) {
        window.location = "/error";
      });

    axios
      .get(
        `https://dzienniczek-backend.herokuapp.com/lessons/${this.props.params.id2}`
      )
      .then((res) => {
        this.setState({
          subjects: this.whatDay(res, this.props.params.weekday),
          date: res.data.date1,
          month: res.data.month,
          classroom: res.data.classroom
        });
      })
      .catch(function (error) {
        window.location = "/error/500";
      });

    axios
      .get("https://dzienniczek-backend.herokuapp.com/students")
      .then((res) => {
        this.setState({
          students: res.data.filter(
            (student) => student.instrument === this.state.classroom
          )
        });
      })
      .catch((error) => {
        window.location = "/error/500";
      })
      .then(() => this.setState({ isLoading: false }));
  }

  // onSubmit
  onSubmit(e) {
    this.setState({ isLoading: true });
    e.preventDefault();

    const attendances = {
      date: `${this.state.date} ${
        this.state.month
      } ${new Date().getFullYear()}`,
      classroom: this.state.classroom,
      students: this.state.students,
      attendance: this.state.attendance,
      subjects: this.state.subjects
    };

    // Add student to database
    axios
      .post(
        `https://dzienniczek-backend.herokuapp.com/attendance/update/${this.props.params.id}`,
        attendances
      )
      .then((res) => {
        this.setState({
          date: "",
          classroom: "",
          students: [],
          attendance: [],
          subjects: []
        });
        window.location = "/lessons";
      })
      .then(() => this.setState({ isLoading: false }))
      .catch((err) => (window.location = "/error/500"));
  }

  onChangeAttendance(e) {
    this.setState({
      attendance: this.state.attendance.concat(e.target.value)
    });
  }

  page() {
    return (
    <Suspense fallback={<Loading/>}>
      <form onSubmit={this.onSubmit}>
        <div className="text-center text-white h3 d-block border border-secondary bg-dark ">
          <h1>{this.state.classroom}</h1>
          <h2>{this.props.params.weekday}</h2>
          <h3>
            {this.props.params.date} {this.props.params.month} 2022
          </h3>
        </div>
        <table className="table table-dark table-striped table-bordered text-center">
          <tbody>
            <tr className="text-center">
              <td>Imię</td>
              {this.state.students.map((student) => (
                <td>{student.name}</td>
              ))}
            </tr>
            {this.state.subjects.map((subject, i) => (
              <tr>
                <td>{subject}</td>
                {this.state.students.map((student, j) => (
                  <td>
                    <select
                      className="buttons text-center"
                      defaultValue={
                        this.state.attendance[this.getNumber(i) + j*i]
                      }
                      onChange={this.onChangeAttendance}
                    >
                      {this.state.status.map((state) => {
                        if (subject == "") {
                          return null;
                        } else {
                          return (
                            <option
                              key={state}
                              value={state}
                              className="text-center"
                            >
                              {state}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="form-group text-center">
          <input
            type="submit"
            value="Zapisz"
            className="btn btn-success m-2 w-25"
          />
        </div>
      </form>
      </Suspense>
    );
  }

  render() {
    return this.state.isLoading ? <Loading /> : this.page();
  }
}

export default withParams(AtendanceLesson);
