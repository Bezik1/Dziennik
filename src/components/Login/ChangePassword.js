import React, { Component } from 'react';
import axios from 'axios';

class CreateTeacher extends Component {
  constructor(props) {
    super(props);

    this.role = window.localStorage.getItem('role')
    this.id = window.localStorage.getItem('id')

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State management for new lesson
    this.state = {
      password: '',
      role: this.role
    }
  }

  onChangePassword(e){
    this.setState({
        password: e.target.value,
    })
  }

  // onSubmit
  onSubmit(e) {
    e.preventDefault();
    
    const user = {
      "id": this.id,
      "password": this.state.password
    }

    this.whichUser(this.role, user)
     console.log(user);

     this.setState({
      password: '',
      role: ''
     })
     window.location ='/lessons';
  }
  whichUser(role, user){
      if(role === 'teacher' || role === 'admin'){
        axios.post(`https://dzienniczek-backend.herokuapp.com/users/update/${this.id}`, user)
        .then(res => console.log(res.data));
      }else{
        axios.post(`https://dzienniczek-backend.herokuapp.com/students/password/${this.id}`, user)
        .then(res => console.log(res.data));
      }
  }

  render() {
    return (
      <>
        <h1 className="text-center mx-auto text-light">Zmień hasło</h1>
        <form className="col-lg-6 col-md-8 mx-auto text-light" onSubmit={this.onSubmit} >
          <div className="form-group p-2">
            <label>Nowe hasło: </label>
            <input
              type="text" className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group p-2">
            <input type="submit" value="Zmień" className="btn btn-success btn-block w-100"/>
          </div>
        </form>
      </>
    )
  }
}

export default CreateTeacher;
