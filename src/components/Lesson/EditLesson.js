import React, { Component } from 'react';
import { useParams } from "react-router-dom";

import Loading from '../Loading/Loading';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}


import axios from 'axios';
class EditLesson extends Component {
  constructor(props) {
    super(props);

    console.log(this.props)
    // Bind state to event handler callbacks
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onChangePlan = this.onChangePlan.bind(this);
    this.onChangePlan2 = this.onChangePlan2.bind(this);
    this.onChangePlan3 = this.onChangePlan3.bind(this);
    this.onChangePlan4 = this.onChangePlan4.bind(this);
    this.onChangePlan5 = this.onChangePlan5.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeClassroom = this.onChangeClassroom.bind(this)
    
    // State management for new lesson
    this.state = {
      date1: '',
      date2: '',
      date3: '',
      date4: '',
      date5: '',
      month: '',
      plan1: '',
      plan2: '',
      plan3: '',
      plan4: '',
      plan5: '',
      classroom: '',
      isLoading: true
    }
  } 

  isLeapYear(year){
    if (Number.isInteger(year/4) == true){
      return 29
    }else if(Number.isInteger(year/4) == false){
      return 28
    }
  }

  getMonth(month){
      if(month=='Styczeń' || month=='Marzec' || month=='Maj' || month=='Lipiec' || month=='Sierpień' || month=='Październik' || month=='Grudzień' ){
        return 31
      }else if(month=='Kwiecień' || month=='Czerwiec' || month=='Wrzesień' || month=='Listopad'){
        return 30
      }else if(month == 'Luty'){
        return this.isLeapYear(Number(new Date().getFullYear()))
      }
  } 

  isGoodDay(number, plus, month){
    let goodDay = number
    if(number + plus> this.getMonth(month)){
      goodDay = number - this.getMonth(month) + plus
      return goodDay
    }else{
      goodDay = number + plus
      return goodDay
    }
  }

  // componentDidMount
  componentDidMount() {
    // Get all data for current lesson
    axios.get(`https://dzienniczek-backend.herokuapp.com/lessons/${this.props.params.id}`)
      .then(res => {
        this.setState({
          date1: res.data.date1,
          month: res.data.month,
          student: res.data.student,
          plan1: res.data.plan1,
          plan2: res.data.plan2,
          plan3: res.data.plan3,
          plan4: res.data.plan4,
          plan5: res.data.plan5,
          classroom: res.data.classroom
        })       
      })
      .catch(function(error) {
        console.log(error);
      })

    // Get all students to populate dropdown menu
    axios.get('https://dzienniczek-backend.herokuapp.com/students/')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            students: res.data.map(student => student.name),
          })
        }
      }).then(() => this.setState({isLoading: false}));
  }
  onChangeDate(e){
    this.setState({
      date1: e.target.value
    })
  }

  onChangeMonth(e){
    this.setState({
      month: e.target.value
    })
  }
  
  onChangeClassroom(e) {
    this.setState({
      classroom: e.target.value,
    });
  }

  // onChangePlan
  onChangePlan(e) {
    this.setState({
      plan1: e.target.value,
    });
  }

  onChangePlan2(e) {
    this.setState({
      plan2: e.target.value,
    });
  }

  onChangePlan3(e) {
    this.setState({
      plan3: e.target.value,
    });
  }

  onChangePlan4(e) {
    this.setState({
      plan4: e.target.value,
    });
  }

  onChangePlan5(e) {
    this.setState({
      plan5: e.target.value,
    });
  }

  // onSubmit
  onSubmit(e) {
    this.setState({isLoading: true})
    e.preventDefault();

    const lesson = {
      "date1": this.isGoodDay(Number(this.state.date1), 0, this.state.month),
      "date2": this.isGoodDay(Number(this.state.date1), 1, this.state.month),
      "date3": this.isGoodDay(Number(this.state.date1), 2, this.state.month),
      "date4": this.isGoodDay(Number(this.state.date1), 3, this.state.month),
      "date5": this.isGoodDay(Number(this.state.date1), 4, this.state.month),
      "month": this.state.month,
      "plan1": this.state.plan1,
      "plan2": this.state.plan2,
      "plan3": this.state.plan3,
      "plan4": this.state.plan4,
      "plan5": this.state.plan5,
      "classroom": this.state.classroom
    }

     console.log(lesson);

     // Add student to database
      axios.post(`https://dzienniczek-backend.herokuapp.com/lessons/update/${this.props.params.id}`, lesson)
       .then(res => {
         this.setState({
          date1: '',  
          date2: '',
          date3: '',
          date4: '',
          date5: '',
          month: '',
          plan1: '',
          plan2: '',
          plan3: '',
          plan4: '',
          plan5: '',
          classroom: ''
         })
         window.location ='/lessons';
      });
  }
  page(){
    return (
      <div>
        <h1 className="text-center mx-auto text-light">Edit Lesson</h1>
        <form className="col-lg-6 col-md-8 mx-auto text-light" onSubmit={this.onSubmit}>
        <div className="form-group p-2">
            <label>Grupa: </label>
            <input
              type="text" className="form-control"
              value={this.state.classroom}
              onChange={this.onChangeClassroom}
            />
          </div>
          <div className="form-group p-2">
              <label>Dzień rozpoczęcia planu: </label>
              <input 
                type="text" className="form-control" 
                value={this.state.date1}
                onChange={this.onChangeDate}
              />
          </div>
          <div className="form-group p-2">
              <label>Miesiąc rozpoczęcia planu: </label>
              <input 
                type="text" className="form-control" 
                value={this.state.month}
                onChange={this.onChangeMonth}
              />
          </div>
          <div className="form-group p-2">
              <label>Poniedziałek plan: </label>
              <input 
                type="text" className="form-control" 
                value={this.state.plan1}
                onChange={this.onChangePlan}
              />
          </div>
          <div className="form-group p-2">
              <label>Wtorek plan: </label>
              <input 
                type="text" className="form-control" 
                value={this.state.plan2}
                onChange={this.onChangePlan2}
              />
          </div>
          <div className="form-group p-2">
              <label>Środa plan: </label>
              <input 
                type="text" className="form-control" 
                value={this.state.plan3}
                onChange={this.onChangePlan3}
              />
          </div>
          <div className="form-group p-2">
              <label>Czwartek plan: </label>
              <input 
                type="text" className="form-control" 
                value={this.state.plan4}
                onChange={this.onChangePlan4}
              />
          </div>
          <div className="form-group p-2">
              <label>Piątek plan: </label>
              <input 
                type="text" className="form-control" 
                value={this.state.plan5}
                onChange={this.onChangePlan5}
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

export default withParams(EditLesson);
