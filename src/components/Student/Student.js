import React from 'react';
import { Link } from 'react-router-dom';

import '../Layout/Cards.scss'

const Student = (props) => {
  
  const { _id, name, instrument, email, classroom } = props.student;
  
  const studentLink = `/student/edit/${_id}`;

  return (
   <div className="card text-center col-11 p-4 m-3 cards border border-secondary">
    <h4 className="card-title">{name} </h4>
    <h5>({instrument})</h5>
    <h6>Klasa: {classroom}</h6>
    <p className="p">{email}</p>
    <Link to={studentLink} className="btn btn-success mb-2">Edytuj</Link> 
    <a href="#" className="btn btn-danger" onClick={() => { props.deleteStudent(_id) }}>Usuń</a>
   </div>
  )
}

export default Student;
