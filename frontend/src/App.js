import React, {Component} from 'react'
import './App.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import InteractionPlugin from '@fullcalendar/interaction'
// import {Inject, ScheduleComponent, Day, Month } from '@syncfusion/ej2-react-schedule'


export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      date: [],
      info: []
    }
  }

  handleDateClick = (e) => {
    alert(e.dateStr)
    const copyState = [...this.state.date]
    copyState.push(e.dateStr)
    this.setState({
      date: copyState
    })
  }

  render() {
    console.log(FullCalendar.events)
    const events = [{title: 'unavailable', date: '2021-05-21'}]

    return (
      <FullCalendar 
      plugins={[dayGridPlugin, InteractionPlugin]} 
      intialView='dayGridMonth' 
      events={events}
      dateClick={(e)=> this.handleDateClick(e)}/>

    )


    // return (
    //   <ScheduleComponent currentView='Month'>
    //     <Inject services={[Day, Month]}/>
    //   </ScheduleComponent>

    //   )
  }

}

