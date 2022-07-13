import React, { Component } from 'react';
import { useParams } from "react-router-dom";

import Loading from '../Loading/Loading';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

import axios from 'axios';
class EditStudent extends Component {
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
    // State management for new lesson
    this.state = {
      name: '',
      instrument: '', 
      age: 0, 
      parent: '', 
      email: '', 
      phone: '' ,
      classroom: '',
      role: '',
      password: '',
      isLoading: true
    }
  } 

  // componentDidMount
  componentDidMount() {
    // Get all data for current lesson
    axios.get(`https://dzienniczek-backend.herokuapp.com/students/${this.props.params.id}`)
      .then(res => {
        this.setState({
          name: res.data.name,
          instrument: res.data.instrument, 
          age: res.data.age, 
          parent: res.data.parent, 
          email: res.data.email, 
          phone: res.data.phone,
          classroom: res.data.classroom,
          role: res.data.role,
          password: res.data.password
        })       
      }).then(() => this.setState({isLoading: false}))
      .catch(function(error) {
        console.log(error);
      })
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

  // onChangeLength
  onChangeAge(e) {
    this.setState({
      length: e.target.value,
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

  // onSubmit
  onSubmit(e) {
    this.setState({isLoading: true})
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
      axios.post(`https://dzienniczek-backend.herokuapp.com/students/update/${this.props.params.id}`, student)
       .then(res => {
        this.setState({
          name: '',
          instrument: '',
          age: 0,
          parent: '',
          email: '',
          phone: '',
          classroom: '',
          role: '',
          password: ''
         })
         this.setState({isLoading: false})
         window.location ='/students';
        });
  }
  page(){
    return (
      <div>
        <h1 className="text-center mx-auto text-light">Edit Student</h1>
        <form className="col-lg-6 col-md-8 mx-auto text-light" onSubmit={this.onSubmit}>
          <div className="form-group p-2">
              <label>Imię: </label>
              <input 
                type="text" className="form-control" 
                value={this.state.name}
                onChange={this.onChangeName}
              />
          </div>
          <div className="form-group p-2">
            <label>Klasa: </label>
            <input
              type="text" className="form-control"
              value={this.state.classroom}
              onChange={this.onChangeClassroom}
            />
          </div>
          <div className="form-group p-2">
              <label>Instrument: </label>
              <input 
                type="text" className="form-control" 
                value={this.state.instrument}
                onChange={this.onChangeInstrument}
              />
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
              <label>Numer Telefonu: </label>
              <input 
                type="text" className="form-control" 
                value={this.state.phone}
                onChange={this.onChangePhone}
              />
          </div>
          <div className="form-group p-2">
            <input type="submit" value="Zapisz" className="btn btn-success btn-block w-100"/>
          </div>
        </form>        
      </div>
    )
  }

  render() {
    return (
      this.state.isLoading ? <Loading /> : this.page()
    )
  }
}

export default withParams(EditStudent);
