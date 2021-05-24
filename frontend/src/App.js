import React, {Component} from 'react'
import './App.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import InteractionPlugin from '@fullcalendar/interaction' 
// import invert from 'lodash.invert'


export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      date: [],
      availability: []
    }
  }

  handleDateClick = (e) => {
    
    const dupState = {}
    dupState.date = e.dateStr
    const copyState = [...this.state.availability]
    copyState.push(dupState)

    copyState.forEach((data) => {
      data.title = 'unavailable'
      

    })

    // copyState[0].title='unavailable'
    // console.log(copyState[0])
    this.setState({
      availability: copyState
    })

    
    console.log(this.state.availability)
    console.log(e)
  
  }

  undoEntry = (e) => {
    const copyState = [...this.state.availability]
    copyState.splice(-1)

    this.setState({
      availability: copyState
    })

  }

  render() {

    const data = this.state.availability
    
    // info.title = 'unavailable'
    // info.date = '2021-05-27'
    // data.push(info)
    // info = {}
    // console.log(info)
    // console.log(this.state.date)
    

    return (
      <>
      <FullCalendar 
      plugins={[dayGridPlugin, InteractionPlugin]} 
      intialView='dayGridMonth' 
      events={data}
      dateClick={(e)=> this.handleDateClick(e)}/>

      <button onClick={(e) => {this.undoEntry(e)}}>undo</button>
      </>
    )

  }

}

