import React, { Component } from 'react';
import './App.css';
//import CalendarComponent from './CalendarComponent';
const { Schedule } = require('./Schedule');

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timezone:["UTC -12", "UTC -11", "UTC -10", "UTC -9", "UTC -8", "UTC -7", "UTC -6", "UTC -5", "UTC -4", "UTC -3", "UTC -2", "UTC -1", 
      "UTC 0", "UTC 1", "UTC 2", "UTC 3", "UTC 4", "UTC 5", "UTC 6", "UTC 7", "UTC 8", "UTC 9", "UTC 10", "UTC 11", "UTC 12"],
      numberOfHours: 2,
      currentZone: "UTC -12",
      targetZone: "UTC -12",
      bedTime: "22:00",
      wakeUpTime: "08:00",
      startDate: "",
      endDate: "",
      clicked: false,
      generated: false,
      schedule: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCurrentZone = this.handleCurrentZone.bind(this);
    this.handleTargetZone = this.handleTargetZone.bind(this);
    this.handleBedTime = this.handleBedTime.bind(this);
    this.handleWakeTime = this.handleWakeTime.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    
  }

  componentDidMount(){
    this.setState({startDate: this.getDATE(), endDate: this.getDATEArrive()}, ()=>{
      console.log(this.state.startDate);
    });
  }

  handleInputChange(event) {
    this.setState({numberOfHours: event.target.value});
  }

  handleCurrentZone(event){
    this.setState({currentZone: event.target.value});
  }

  handleTargetZone(event){
    this.setState({targetZone: event.target.value});
  }

  handleBedTime(event){
    this.setState({bedTime: event.target.value});
  }

  handleWakeTime(event){
    this.setState({wakeUpTime: event.target.value});
  }

  handleStartDate(event){
    this.setState({startDate: event.target.value, clicked: true}, () => {
      console.log(`startdate: ${this.state.startDate}, clicked: ${this.state.clicked}`)
    });
   
  }

  handleEndDate(event){
    this.setState({endDate: event.target.value});
  }



  getDATE() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();          
    today = yyyy+ '-' + mm + '-' + dd;
    /*this.setState({startDate: today}, ()=>{
      console.log(`startdate: ${this.state.startDate}`);
    });*/
    return today;
    //2019-05-28
  }

  getDATEArrive(){
    var today = new Date();
    var dd = String(today.getDate() + 2).padStart(2,'0');
    var mm = String(today.getMonth() + 1).padStart(2,'0'); 
    var yyyy = today.getFullYear();
    today = yyyy+ '-' + mm + '-' + dd;
    /*this.setState({endDate: today}, ()=>{
      console.log(`enddate: ${this.state.endDate}`);
    });*/
    return String(today);
  }

  updateArrive(){
    var update = new Date(this.state.startDate);
    update.setDate(update.getDate() + 4)
    var dd = String(update.getDate()).padStart(2,'0');
    var mm = String(update.getMonth() + 1).padStart(2,'0'); 
    var yyyy = update.getFullYear();
    update = yyyy+ '-' + mm + '-' + dd;
    /*this.state.setState({endDate: update}, ()=>{
      console.log(`enddate: ${this.state.endDate}`);
    });*/
    return String(update);
  }

  sendData() {
    if(this.state.startDate == ""){
      window.alert("Please pick a start date");
    }
    else if(this.state.endDate == ""){
      window.alert("Please pick a end date");
    }
    //redirect to another page
    else if(this.state.currentZone == this.state.targetZone){
      window.alert("Your current timezone and the abroad timezone cannot be the same");
    }
    else if(this.state.bedTime == this.state.wakeUpTime){
      window.alert("Your bed time and wake up time cannot be the same")
    }
    else if(this.state.currentZone == ""){
      window.alert("Please pick timezone");
    }
    else if(this.state.targetZone == ""){
      window.alert("Please pick a destination timezone");
    }
    else if(this.state.bedTime == ""){
      window.alert("Please pick a bedtime");
    }
    else if(this.state.wakeUpTime == ""){
      window.alert("Please pick a wake up time");
    }
    else {
      var testSchedule = new Schedule(this.state.currentZone, this.state.startDate,
                                      this.state.targetZone, 
                                      this.state.bedTime, this.state.wakeUpTime);
      let d = testSchedule.packageJSON();
      console.log(d); // **TEST**
      var schedz = testSchedule.getCalendar() // **TEST**
      this.setState({generated: true, schedule: schedz});
      window.alert("Your Schedule has been generated!")
    }
    
  }  

  render() {
    
    if(this.state.generated){
      return(
        <div className="content">
          {  
            this.state.schedule.map(day => {
              const current =[
                <p>{day}</p>
              ];
            return current;
          })
          }
            <button id="signout-btn" className="btn" onClick={() => this.props.signOutCallback()}>Sign out</button>
        </div>
      );
    }
      
      else{
        return (       
          <div className="content">
          <form name="input" target="_self">
              <label>
              Pick your current timezone:
              <br />
              <select onChange={this.handleCurrentZone}>
                  { this.state.timezone.map(zone =>{
                  const current= [
                  <option value={zone}>{zone}</option>
                  ];
                  return current;              
                  })
                  }
              
              </select>
              </label>
              <br />
              <label>
              Pick your destination timezone:
              <br />
              <select onChange={this.handleTargetZone}>
                  { this.state.timezone.map(zone =>{
                  const current= [
                  <option value={zone}>{zone}</option>
                  ];
                  return current;              
                  })
                  }
              
              </select>
              </label>
              <br />        
              <label>Please enter your bed time:
                <br />
                  <input type="time" defaultValue="22:00" onChange={this.handleBedTime}></input>
              </label>
              <br />
              <label>Please enter your wake up time:
                <br />
                  <input type="time" defaultValue="08:00" onChange={this.handleWakeTime}></input>
              </label>
              <br />
              <label>Please enter your trip start date:  
              <br />
              <input type="date" defaultValue={this.getDATE()} min={this.getDATE()} onChange={this.handleStartDate}></input>
              </label>
              <br />
              <label>Please enter your trip end date:  
              <br />
              {
                  this.state.clicked === false ? (            
                  <input type="date" defaultValue={this.getDATEArrive()} min={this.getDATEArrive()} onChange={this.handleEndDate}></input>) 
                  : (<input type="date" defaultValue={this.updateArrive()} min={this.updateArrive()} onChange={this.handleEndDate}></input>)
              }
              </label>
              <br />
          </form>
          
          <button className="btn"  onClick={()=> this.sendData()}>Submit</button>
  
          <button id="signout-btn" className="btn" onClick={() => this.props.signOutCallback()}>Sign out</button>
  
        </div>
        ); 
      }   
    }
  }   
            
    export default Input;