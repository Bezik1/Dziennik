import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Import styles
import "./App.scss";
import "./components/Layout/Scrollbar.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Import components
import Navbar from "./components/Navbar/Navbar";

import Lessons from "./components/Lesson/Lessons";
import Students from "./components/Student/Students";

import EditLesson from "./components/Lesson/EditLesson";
import AtendanceLesson from "./components/Lesson/AtendanceLesson";

import EditStudent from "./components/Student/EditStudent";
import ChooseUser from "./components/Navbar/ChooseUser";

import CreateLesson from "./components/Lesson/CreateLesson";
import CreateStudent from "./components/Users/CreateStudent";
import CreateAdmin from "./components/Users/CreateAdmin";
import CreateTeacher from "./components/Users/CreateTeacher";

import Login from "./components/Login/Login";
import StudentLogin from "./components/Login/StudentLogin";
import TeacherLogin from "./components/Login/TeacherLogin";
import ChangePassword from "./components/Login/ChangePassword";

import Error from "./components/Error/ErrorPage";

function App() {
  return (
    <div className="pb-5 text-white bg-dark">
      <Router>
        <Navbar />
        <div className="container my-5">
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/lessons" exact element={<Lessons />} />
            <Route path="/students" exact element={<Students />} />
            <Route path="/edit/:id" exact element={<EditLesson />} />
            <Route
              path="/attendance/:id2/:id/:month/:date/:weekday"
              exact
              element={<AtendanceLesson />}
            />
            <Route path="/student/edit/:id" exact element={<EditStudent />} />
            <Route path="/create" exact element={<CreateLesson />} />
            <Route path="/choose-user" exact element={<ChooseUser />} />
            <Route path="/student" exact element={<CreateStudent />} />
            <Route path="/admin" exact element={<CreateAdmin />} />
            <Route path="/teacher" exact element={<CreateTeacher />} />
            <Route path="/teacher-login" exact element={<TeacherLogin />} />
            <Route path="/student-login" exact element={<StudentLogin />} />
            <Route path="/change-password" exact element={<ChangePassword />} />
            <Route path="/error/:type" exact element={<Error />} />
            <Route path="/:type" exact element={<Error />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
