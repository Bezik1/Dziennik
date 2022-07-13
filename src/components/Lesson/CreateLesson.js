import React, { Component } from 'react';
import { isLogin } from '../../helpers/isLogin'

import axios from 'axios';
class CreateLesson extends Component {
  constructor(props) {
    isLogin()

    super(props);

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
      date: '',
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
      students: [],
      classroom: '',
    }
  }
  getPlan(number, plan){
    switch(number){
      case 0:
        return plan.plan1 
      case 1:
        return plan.plan2 
      case 2:
        return plan.plan3 
      case 3:
        return plan.plan4 
      case 4:
        return plan.plan5 
    }
  }
  
  getDate(number, date){
    switch(number){
      case 0:
        return date.date1 
      case 1:
        return date.date2 
      case 2:
        return date.date3 
      case 3:
        return date.date4 
      case 4:
        return date.date5 
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
      if(month==='Styczeń' || month==='Marzec' || month==='Maj' || month==='Lipiec' || month==='Sierpień' || month==='Październik' || month==='Grudzień' ){
        return 31
      }else if(month==='Kwiecień' || month==='Czerwiec' || month==='Wrzesień' || month==='Listopad'){
        return 30
      }else if(month === 'Luty'){
        return this.isLeapYear(Number(new Date().getFullYear()))
      }
  } 

  isGoodDay(number, plus, month){
    let goodDay = number
    if(number + plus > this.getMonth(month)){
      goodDay = number - this.getMonth(month) + plus
      return goodDay
    }else{
      goodDay = number + plus
      return goodDay
    }
}
  onChangeDate(e){
    this.setState({
      date: e.target.value,
    })
  }

  onChangeMonth(e){
    this.setState({
      month: e.target.value
    })
  }
  // componentDidMount
  componentDidMount() {
    axios.get('http://localhost:3000/students/')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            students: res.data.map(student => student.name),
            student: res.data[0].name
          })
        }
      });
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
    e.preventDefault();

    for(let i=0; i<5; i++){
      const attendance = {
        "subjects": this.getPlan(i, this.state),
        "students": this.state.students,
        "attendance": [],
        "date": this.getDate(i, this.state),
        "classroom": this.state.classroom
      }
      axios.post('https://dzienniczek-backend.herokuapp.com/attendance/add', attendance)
      .then(res => console.log(res.data))
      console.log(attendance)
    }

    const lesson = {
      "date1": this.isGoodDay(Number(this.state.date), 0, this.state.month),
      "date2": this.isGoodDay(Number(this.state.date), 1, this.state.month),
      "date3": this.isGoodDay(Number(this.state.date), 2, this.state.month),
      "date4": this.isGoodDay(Number(this.state.date), 3, this.state.month),
      "date5": this.isGoodDay(Number(this.state.date), 4, this.state.month),
      "month": this.state.month,
      "plan1": this.state.plan1,
      "plan2": this.state.plan2,
      "plan3": this.state.plan3,
      "plan4": this.state.plan4,
      "plan5": this.state.plan5,
      "classroom": this.state.classroom
    }

     console.log(lesson);

      axios.post('https://dzienniczek-backend.herokuapp.com/lessons/add', lesson)
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

  render() {
    return (
      <div>
        <h1 className="text-center mx-auto text-light">Utwórz plan</h1>
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
                value={this.state.date}
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
          <div className="form-group text-center p-2">
            <input type="submit" value="Utwórz" className="btn btn-success btn-block w-100"/>
          </div>
        </form>        
      </div>
    )
  }
}

export default CreateLesson;
