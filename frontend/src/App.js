import React, {Component} from 'react'
import './App.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import InteractionPlugin from '@fullcalendar/interaction' 
import Login from './Components/Login'
// import invert from 'lodash.invert'
let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl= 'http://localhost:8000'
} else {
  baseUrl= 'heroku url here'
}

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      date: [],
      availability: [],
      isLogin: false,
      current_user: ''
    }
  }

  checkLogin = (status, user) => {
    if (status === 200) {
      this.setState({
        current_user: user,
        isLogin: !this.state.isLogin
      })
      console.log(status)
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

    this.setState({
      availability: copyState
    })

    
    console.log(this.state.availability)
    
  
  }

  undoEntry = (e) => {
    const copyState = [...this.state.availability]
    copyState.splice(-1)

    this.setState({
      availability: copyState
    })

  }

  submitSchedule = (e) => {
    e.preventDefault()
    let separateFromObject = []
    let string = []
    let together = ''

    this.state.availability.forEach(item => {
      separateFromObject.push(Object.entries(item))
    })
    
    separateFromObject.forEach(data => {
      string.push(data.toString())
      together = string.join()
    })
    console.log(together)
    fetch(baseUrl + '/schedules/org_user/addSchedule', {
      method: 'POST',
      body: JSON.stringify({
        availability: together
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then (res =>{
        return res.json()
    }).then(data => {
      console.log(data)
    }).catch(error => console.error)
    // console.log(together)
  }

  render() {

    const data = this.state.availability
    // let separate = []
    // let join = []
    // let together = ''

    // data.forEach(info => {
    //   separate.push(Object.entries(info))

    // })
    // console.log(separate)
    // separate.forEach(data => {
    //   join.push(data.toString())
    //   together = join.join()
    // })
    // console.log(together)


    
    
    // info.title = 'unavailable'
    // info.date = '2021-05-27'
    // data.push(info)
    // info = {}
    // console.log(info)
    // console.log(this.state.date)
    

    return (
      <>
      
      {this.state.isLogin ? 

      <FullCalendar 
      plugins={[dayGridPlugin, InteractionPlugin]} 
      intialView='dayGridMonth' 
      events={data}
      dateClick={(e)=> this.handleDateClick(e)}/> : 

      <Login baseUrl={baseUrl} checkLogin={this.checkLogin}/>
      }

      {this.state.isLogin? 
      <button onClick={(e)=>{this.undoEntry(e)}}>Undo</button> : null
      }
      {this.state.isLogin ?
      <button onClick={(e)=>{this.submitSchedule(e)}}>Post Schedule</button> :
      null
      }
      
      </>

    )

  }

}

