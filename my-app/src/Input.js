import React, { Component } from 'react';
import './App.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timezone:["UTC -12", "UTC -11", "UTC -10", "UTC -9", "UTC -8", "UTC -7", "UTC -6", "UTC -5", "UTC -4", "UTC -3", "UTC -2", "UTC -1", 
      "UTC 0", "UTC 1", "UTC 2", "UTC 3", "UTC 4", "UTC 5", "UTC 6", "UTC 7", "UTC 8", "UTC 9", "UTC 10", "UTC 11", "UTC 12"],
      numberOfHours: 2,
      currentZone: "",
      targetZone: "",
      bedTime: "",
      wakeUpTime: "",
      startDate: "",
      endDate: "",
      clicked: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCurrentZone = this.handleCurrentZone.bind(this);
    this.handleTargetZone = this.handleTargetZone.bind(this);
    this.handleBedTime = this.handleBedTime.bind(this);
    this.handleWakeTime = this.handleWakeTime.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    
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



  getDATE(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();          
    today = yyyy+ '-' + mm + '-' + dd;
    this.setState({startDate: today});
    return today;
    //2019-05-28
  }

  getDATEArrive(){
    var today = new Date();
    var dd = String(today.getDate() + 2).padStart(2,'0');
    var mm = String(today.getMonth() + 1).padStart(2,'0'); 
    var yyyy = today.getFullYear();
    today = yyyy+ '-' + mm + '-' + dd;
    this.setState({endDate: today});
    return String(today);
  }

  updateArrive(){
    var update = new Date(this.state.startDate);
    update.setDate(update.getDate() + 4)
    var dd = String(update.getDate()).padStart(2,'0');
    var mm = String(update.getMonth() + 1).padStart(2,'0'); 
    var yyyy = update.getFullYear();
    update = yyyy+ '-' + mm + '-' + dd;
    this.setState({endDate: update});
    return String(update);
  }

  sendData(){
    //sends to their component
    //redirect to another page
    console.log(this.state.);
  }



  render() {
    return (
    <div>
      <form>
         <label>
          Pick your current timezone:
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
        <label>Bed time:
            <input type="time" defaultValue="22:00" onChange={this.handleBedTime}></input>
        </label>
        <br />
        <label>Wake Up time:
            <input type="time" defaultValue="08:00" onChange={this.handleWakeTime}></input>
        </label>
        <br />
        <label>Start date:  
          <input type="date" defaultValue={this.getDATE()} min={this.getDATE()} onChange={this.handleStartDate}></input>
        </label>
        <br />
        <label>End date:  
          {
            this.state.clicked ==false ? (            
              <input type="date" defaultValue={this.getDATEArrive()} min={this.getDATEArrive()} onChange={this.handleEndDate}></input>) 
              : (<input type="date" defaultValue={this.updateArrive()} min={this.updateArrive()} onChange={this.handleEndDate}></input>)
          }
        </label>
        <br />
        <label>
          Number of hours of sleep:
          <input
            type="number"
            value={this.state.numberOfHours}
            onChange={this.handleInputChange} />
        </label>
        <br />
      </form>
      <div>
        <button onClick={()=> this.sendData()}>Submit</button>
      </div>
    </div>
    );
  }
}

  export default Input;