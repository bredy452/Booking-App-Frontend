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
      title: 'Unavailable',
      date: '2021-05-22'
    }
  }
  render() {
    // console.log(props)
    return (
      <FullCalendar 
      plugins={[dayGridPlugin, InteractionPlugin]} 
      intialView='dayGridMonth' 
      events={[
        {title: this.state.title, date: this.state.date},
        {title: this.state.title, date: '2021-05-20'}

        ]}
      dateClick={this.handleDateClick}/>

    )


    // return (
    //   <ScheduleComponent currentView='Month'>
    //     <Inject services={[Day, Month]}/>
    //   </ScheduleComponent>

    //   )
  }

  handleDateClick = (arg) => {
    alert(this.title)
  }

}
