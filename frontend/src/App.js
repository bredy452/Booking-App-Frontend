import React from 'react'
import './App.css';
import {Inject, ScheduleComponent, Day, Month } from '@syncfusion/ej2-react-schedule'


export default class App extends React.Component{
  render() {
    
    return (
      <ScheduleComponent currentView='Month'>
        <Inject services={[Day, Month]}/>
      </ScheduleComponent>

      )
  }

}