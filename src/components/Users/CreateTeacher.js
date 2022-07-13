import React, { Component } from 'react';
import axios from 'axios';

class CreateTeacher extends Component {
  constructor(props) {
    super(props);

    // Bind state to event handler callbacks
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State management for new lesson
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }
  // onChangeName
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  // onChangeEmail
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e){
    this.setState({
        password: e.target.value,
    })
  }

  // onSubmit
  onSubmit(e) {
    e.preventDefault();
    
    const teacher = {
      "name": this.state.name,
      "email": this.state.email,
      "role": "teacher",
      "password": this.state.password
    }

     console.log(teacher);

     // Add student to database
      axios.post('https://dzienniczek-backend.herokuapp.com/users/add', teacher)
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

     this.setState({
      name: '',
      email: '',
      password: ''
     })
     window.location ='/lessons';
  }

  render() {
    return (
      <>
        <h1 className="text-center mx-auto text-light">Utwórz nauczyciela</h1>
        <form className="col-lg-6 col-md-8 mx-auto text-light" onSubmit={this.onSubmit} >
          <div className="form-group p-2">
            <label>Imię: </label>
            <input
              type="text" className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
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
      </>
    )
  }
}

export default CreateTeacher;
