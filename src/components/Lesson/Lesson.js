import React from "react";
import { Link } from "react-router-dom";

const Lesson = (props) => {
  const role = window.localStorage.getItem("role");

  const {
    _id,
    plan1,
    plan2,
    plan3,
    plan4,
    plan5,
    classroom,
    date1,
    date2,
    date3,
    date4,
    date5,
    month
  } = props.lesson;
  let id2, id3, id4, id5, id6;
  try {
    id2 = props.attendance[0]._id;
    id3 = props.attendance[1]._id;
    id4 = props.attendance[2]._id;
    id5 = props.attendance[3]._id;
    id6 = props.attendance[4]._id;
  } catch (err) {}

  const plans1 = plan1.split(" ");
  const plans2 = plan2.split(" ");
  const plans3 = plan3.split(" ");
  const plans4 = plan4.split(" ");
  const plans5 = plan5.split(" ");

  const lessonLink = `/edit/${_id}`;
  const attendanceLink = (id) => `/attendance/${_id}/${id}`;

  const isTeacher = (role) => {
    if (role === "teacher" || role === "admin") {
      return (
        <tr>
          <th className="pt-4 pb-4">Obecność</th>
          <td>
            {" "}
            <Link
              day={plan1}
              to={`${attendanceLink(id2)}/${month}/${date1}/Poniedziałek`}
              className="btn btn-primary m-2"
            >
              Obecność
            </Link>{" "}
          </td>
          <td>
            {" "}
            <Link
              day={plan2}
              to={`${attendanceLink(id3)}/${month}/${date2}/Wtorek`}
              className="btn btn-primary m-2"
            >
              Obecność
            </Link>{" "}
          </td>
          <td>
            {" "}
            <Link
              day={plan3}
              to={`${attendanceLink(id4)}/-${month}/${date3}/Środa`}
              className="btn btn-primary m-2"
            >
              Obecność
            </Link>{" "}
          </td>
          <td>
            {" "}
            <Link
              day={plan4}
              to={`${attendanceLink(id5)}/${month}/${date4}/Czwartek`}
              className="btn btn-primary m-2"
            >
              Obecność
            </Link>{" "}
          </td>
          <td>
            {" "}
            <Link
              day={plan5}
              to={`${attendanceLink(id6)}/${month}/${date5}/Piątek`}
              className="btn btn-primary m-2"
            >
              Obecność
            </Link>{" "}
          </td>
        </tr>
      );
    }
  };

  const isAdmin = (role) => {
    if (role === "admin") {
      return (
        <>
          <Link to={lessonLink} className="btn btn-success m-2">
            Edytuj
          </Link>
          <a
            className="btn btn-danger m-2 "
            onClick={() => {
              props.deleteLesson(_id);
            }}
          >
            Usuń
          </a>
        </>
      );
    }
  };

  return (
    <>
      <h1 className="text-center text-white h3 d-block border border-secondary bg-dark h33 ">
        Grupa: {classroom}
      </h1>
      <table className="table table-dark table-striped table-bordered">
        <tbody>
          <tr></tr>
          <tr>
            <th>
              Godziny: <br />
              {month}
            </th>
            <th>
              Poniedziałek <br /> {date1}
            </th>
            <th>
              Wtorek <br /> {date2}
            </th>
            <th>
              Środa <br /> {date3}
            </th>
            <th>
              Czwartek <br /> {date4}
            </th>
            <th>
              Piątek <br /> {date5}
            </th>
          </tr>
          <tr key={`${_id} `}>
            <td className="pt-4 pb-4 t">8:00-8:45</td>
            <td>{plans1[0]}</td>
            <td>{plans2[0]}</td>
            <td>{plans3[0]}</td>
            <td>{plans4[0]}</td>
            <td>{plans5[0]}</td>
          </tr>
          <tr key={`${_id} 1`}>
            <td className="pt-4 pb-4 t">8:55-9:40</td>
            <td>{plans1[1]}</td>
            <td>{plans2[1]}</td>
            <td>{plans3[1]}</td>
            <td>{plans4[1]}</td>
            <td>{plans5[1]}</td>
          </tr>
          <tr key={`${_id} 2`}>
            <td className="pt-4 pb-4 t">9:50-10:35</td>
            <td>{plans1[2]}</td>
            <td>{plans2[2]}</td>
            <td>{plans3[2]}</td>
            <td>{plans4[2]}</td>
            <td>{plans5[2]}</td>
          </tr>
          <tr key={`${_id} 3`}>
            <td className="pt-4 pb-4 t">10:55-11:40</td>
            <td>{plans1[3]}</td>
            <td>{plans2[3]}</td>
            <td>{plans3[3]}</td>
            <td>{plans4[3]}</td>
            <td>{plans5[3]}</td>
          </tr>
          <tr key={`${_id} 4`}>
            <td className="pt-4 pb-4 t">11:50-12:35</td>
            <td>{plans1[4]}</td>
            <td>{plans2[4]}</td>
            <td>{plans3[4]}</td>
            <td>{plans4[4]}</td>
            <td>{plans5[4]}</td>
          </tr>
          <tr key={`${_id} 5`}>
            <td className="pt-4 pb-4 t ">12:45-13:30</td>
            <td>{plans1[5]}</td>
            <td>{plans2[5]}</td>
            <td>{plans3[5]}</td>
            <td>{plans4[5]}</td>
            <td>{plans5[5]}</td>
          </tr>
          <tr key={`${_id} 6`}>
            <td className="pt-4 pb-4 t">13:40-14:25</td>
            <td>{plans1[6]}</td>
            <td>{plans2[6]}</td>
            <td>{plans3[6]}</td>
            <td>{plans4[6]}</td>
            <td>{plans5[6]}</td>
          </tr>
          {isTeacher(role)}
        </tbody>
      </table>
      {isAdmin(role)}
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Lesson;
