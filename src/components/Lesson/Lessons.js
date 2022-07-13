import React, { Component } from "react";
import Slider from "react-slick";
import axios from "axios";

import { isLogin } from "../../helpers/isLogin";
import Loading from "../Loading/Loading";
import Lesson from "./Lesson";

class Lessons extends Component {
  constructor(props) {
    isLogin();
    super(props);

    this.role = window.localStorage.getItem("role");
    this.classroom = window.localStorage.getItem("class");

    this.deleteLesson = this.deleteLesson.bind(this);

    this.state = {
      lessons: [],
      attendances: [],
      instruments: [
        "Bass",
        "Pianino",
        "Gitara",
        "Bębny",
        "Ukulele",
        "Waltornia",
        "Trąbka"
      ],
      isLoading: true
    };
  }
  getNumber(number, k) {
    let newNumber;
    if (number === 0) {
      newNumber = 0;
    } else {
      newNumber = number * 5 * k;
    }

    if (k === !0) {
      newNumber = k * 10 + number;
    }
    return newNumber;
  }

  whatInstrument(role, classroom) {
    if (role === "student") {
      return (
        <Slider {...this.settings}>
          {this.state.lessons
            .filter((lesson) => lesson.classroom === classroom)
            .map((lesson, i) => (
              <Lesson
                attendance={[
                  this.state.attendances[this.getNumber(i)],
                  this.state.attendances[this.getNumber(i) + 1],
                  this.state.attendances[this.getNumber(i) + 2],
                  this.state.attendances[this.getNumber(i) + 3],
                  this.state.attendances[this.getNumber(i) + 4]
                ]}
                lesson={lesson}
                deleteLesson={this.deleteLesson}
                key={lesson._id}
              />
            ))}
        </Slider>
      );
    } else {
      return this.state.instruments.map((instrument, k) => (
        <Slider {...this.settings} key={`Slider: c${k}`}>
          {this.state.lessons
            .filter((lesson) => lesson.classroom === instrument)
            .map((lesson, i) => (
              <Lesson
                attendance={[
                  this.state.attendances[this.getNumber(i, k)],
                  this.state.attendances[this.getNumber(i, k) + 1],
                  this.state.attendances[this.getNumber(i, k) + 2],
                  this.state.attendances[this.getNumber(i, k) + 3],
                  this.state.attendances[this.getNumber(i, k) + 4]
                ]}
                lesson={lesson}
                deleteLesson={this.deleteLesson}
                key={lesson._id}
              />
            ))}
        </Slider>
      ));
    }
  }
  // Retrieve all lessons from database
  componentDidMount() {
    axios
      .get("https://dzienniczek-backend.herokuapp.com/lessons")
      .then((res) => {
        this.setState({ lessons: res.data });
      })
      .catch(() => (window.location = "/error/500"));

    axios
      .get("https://dzienniczek-backend.herokuapp.com/attendance/")
      .then((res) => {
        this.setState({ attendances: res.data });
      })
      .catch(() => {
        window.location = "/error/500";
      })
      .then(() => this.setState({ isLoading: false }));
  }

  // deleteLesson - removes a single lesson from the database
  deleteLesson(id) {
    axios
      .delete(`https://dzienniczek-backend.herokuapp.com/lessons/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => (window.location = "/error/500"));

    // Remove lesson from DOM - _id refers to autogenerated id assigned by MongoDB
    this.setState({
      attendances: this.state.attendances.filter((el) => el._id !== id)
    });
  }

  deleteAttendance(id) {
    axios
      .delete(`https://dzienniczek-backend.herokuapp.com/attendances/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => (window.location = "/error/500"));

    // Remove lesson from DOM - _id refers to autogenerated id assigned by MongoDB
    this.setState({
      lessons: this.state.lessons.filter((el) => el._id !== id)
    });
  }
  page() {
    return (
      <div className="Lessons">
        <h1 className="text-center mx-auto text-light">Plan Lekcji</h1>
        <br />
        <div className="row justify-content-center d-block text-center">
          {this.whatInstrument(this.role, this.classroom)}
        </div>
      </div>
    );
  }

  render() {
    //const isMobile = window.innerWidth >= 1000 ? true : false;
    this.settings = {
      arrows: false,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return this.state.isLoading ? <Loading /> : this.page();
  }
}

export default Lessons;
