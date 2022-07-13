import React, { Component } from 'react';

import axios from 'axios';
class CreateStudent extends Component {
  constructor(props) {
    super(props);

    // Bind state to event handler callbacks
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeInstrument = this.onChangeInstrument.bind(this);
    this.onChangeAge= this.onChangeAge.bind(this);
    this.onChangeParent = this.onChangeParent.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeClassroom = this.onChangeClassroom.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)

    // State management for new lesson
    this.state = {
      name: '',
      instruments: ['Gitara', 'Pianino', 'Bass', 'Bębny', 'Ukulele', 'Waltornia', 'Trąbka'],
      age: 0,
      parent: '',
      email: '',
      phone: '',
      classroom: '',
      password: ''
    }
  }

  // componentDidMount
  componentDidMount() {
    this.setState({
      instrument: 'Gitara'
    });
  }

  onChangePassword(e){
    this.setState({
      password: e.target.value,
    });
  }

  // onChangeName
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  // onChangeInstrument
  onChangeInstrument(e) {
    this.setState({
      instrument: e.target.value,
    });
  }

  // onChangeAge
  onChangeAge(e) {
    this.setState({
      age: Number(e.target.value),
    });
  }

  // onChangeParent
  onChangeParent(e) {
    this.setState({
      parent: e.target.value,
    });
  }

  onChangeClassroom(e) {
    this.setState({
      classroom: e.target.value,
    });
  }

  // onChangeEmail
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  // onChangePhone
    onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  // onChangeComments
  onChangeComments(e) {
    this.setState({
      comments: e.target.value,
    });
  }

  // onSubmit
  onSubmit(e) {
    e.preventDefault();

    const student = {
      "name": this.state.name,
      "instrument": this.state.instrument,
      "age": this.state.age,
      "parent": this.state.parent,
      "email": this.state.email,
      "phone": this.state.phone,
      "classroom": this.state.classroom,
      "role": "student",
      "password": this.state.password
    }

     console.log(student);

     // Add student to database
      axios.post('https://dzienniczek-backend.herokuapp.com/students/add', student)
       .then(res => {
         this.setState({
          name: '',
          instruments: ['Gitara', 'Pianino', 'Bass', 'Bębny', 'Ukulele', 'Waltornia', 'Trąbka'],
          age: 0,
          parent: '',
          email: '',
          phone: '',
          classroom: '',
          role: '',
          password: '',
         })
         window.location ='/students';
      });
  }

  render() {
    return (
      <div>
        <h1 className="text-center mx-auto text-light">Utwórz ucznia</h1>
        <form className="col-lg-6 col-md-8 mx-auto text-light" onSubmit={this.onSubmit} >
          <div className="form-group p-2">
            <label>Imię: </label>
            <input
              type="text" className="form-control p-2"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group p-2">
            <label>Klasa: </label>
            <input
              type="text" className="form-control p-2"
              value={this.state.classroom}
              onChange={this.onChangeClassroom}
            />
          </div>
          <div className="form-group p-2">
            <label>Instrument: </label>
            <select
              required
              className="form-control"
              value={this.state.instrument}
              onChange={this.onChangeInstrument}>
              {
               this.state.instrument && this.state.instruments.map(function(instrument) {
                  return <option key={instrument} value={instrument}>{instrument}</option>
                })
              }
            </select>
          </div>
          <div className="form-group p-2">
            <label>Wiek: </label>
            <input
              type="text" className="form-control"
              value={this.state.age}
              onChange={this.onChangeAge}
            />
          </div>
          <div className="form-group p-2">
            <label>Rodzic: </label>
            <input
              type="text" className="form-control"
              value={this.state.parent}
              onChange={this.onChangeParent}
            />
          </div>
          <div className="form-group p-2">
            <label>Email: </label>
            <input
              type="text" className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group p-2">
            <label>Numer telefonu: </label>
            <input
              type="text" className="form-control"
              value={this.state.phone}
              onChange={this.onChangePhone}
            />
          </div>
          <div className="form-group p-2">
            <label>Hasło: </label>
            <input
              type="text" className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group p-2">
            <input type="submit" value="Utwórz" className="btn btn-success btn-block w-100"/>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateStudent;
