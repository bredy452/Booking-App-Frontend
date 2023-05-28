import React, {Component} from 'react'
import './App.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import InteractionPlugin from '@fullcalendar/interaction' 
import Login from './Components/Login'
import Homepage from './Components/Homepage'
import ClientPage from './Components/ClientPage'
import Bookings from './Components/Bookings'
import Logout from './Components/Logout'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import {Button} from 'semantic-ui-react'

let baseUrl = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseUrl= 'http://localhost:8000'
} else {
  baseUrl= process.env.REACT_APP_BASEURL
}

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      date: [],
      availability: [],
      isLogin: false,
      org_user: false,
      client_user: false,
      current_user: '',
      login_button: true,
      client_page: false,
      old_availability: [],
      client_info: [],
      post_button: false, 
    }
  }

  getOrgSchedule = (e) => {
    fetch(baseUrl + `/schedules/${this.state.current_user.org_name}`, {
      credentials: 'include'})
    .then(res => {
      return res.json()
    }).then(data => {

      if (data.message === "Schedule does not exist") {
        this.setState({
          // availability: [],
          post_button: true
        })
        return
      } else {

      let arr = []
      this.setState({
        post_button: false
      })
        arr = data.data.availability.split(',')
        let newArr = []
        let masterArr = []

        for(let j = 0; j < arr.length; j += 6){
            let bitArr = arr.slice(j, j + 6)
            newArr.push(bitArr)
        }
        console.log(newArr)
        for(let x = 0; x < newArr.length; x++){
            let chunk = newArr[x]
            let tempObj ={}
            console.log(chunk)
            for(let y = 0; y < chunk.length; y++) {
                if (y % 2 === 0){
                  let key = chunk[y]
                  let value = chunk[y+1]
                  tempObj[key] = value
              }
          }

            masterArr.push(tempObj)
        }
        this.setState({
          availability: masterArr
          
        }) 
        }      
    })
  }

  getPotentialClientSchedule = (e) => {
    fetch(baseUrl + `/schedules/client_schedule/${this.state.current_user.org_name}`, {
      credentials: 'include'})
    .then(res => {
      return res.json()
    }).then(data => {

      if (data.message === "Schedule does not exist") {
        return
      } else {

      let arr = []
        arr = data.data.client_availability.split(',')
        let newArr = []
        let masterArr = []
        const copyAvailability = [...this.state.availability]

        for(let j = 0; j < arr.length; j += 4){
            let bitArr = arr.slice(j, j + 4)
            newArr.push(bitArr)
        }
    
        for(let x = 0; x < newArr.length; x++){
            let chunk = newArr[x]
            let tempObj ={}
            console.log(chunk)
            for(let y = 0; y < chunk.length; y++) {
                if (y % 2 === 0){
                  let key = chunk[y]
                  let value = chunk[y+1]
                  tempObj[key] = value

              }

          }
          copyAvailability.push(tempObj)
        }

      this.setState({
        availability: copyAvailability,
        client_info: [data.data.client_id]
      })
    }
    
    })
  }

  org_Login = (e) => {
    e.preventDefault();
    this.setState({
      org_user:!this.state.org_user
    })
  }

  client_Login = (e) => {
    this.setState({
      client_user:!this.state.client_user
    })
  }

  checkLogin = (status, user) => {
    if (status === 200) {
      this.setState({
        current_user: user,
        isLogin: !this.state.isLogin,
        login_button: !this.state.login_button,
      })
      //What can we check to confirm schedule
      
      console.log(status)
      console.log(this.state.current_user.id)
    }

    if (this.state.org_user) {
      this.getOrgSchedule()
      this.getPotentialClientSchedule()
    }

   
  }

  handleDateClick = (e) => {
    console.log(e.jsEvent)
    const dupState = {}
    dupState.date = e.dateStr
    const copyState = [...this.state.availability]
    copyState.push(dupState)

    copyState.forEach((data) => {
      if (data.title == undefined) {
        data.display = 'background'
        data.color = '#FF000D'
      }

    })

    this.setState({
      availability: copyState
    })

    
    console.log(this.state.availability)
    console.log(this.state.current_user.id)
    
  
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
    console.log(separateFromObject)
    separateFromObject.forEach(data => {
      string.push(data.toString())
      together = string.join()
    })

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
  }

  updateSchedule = (e) => {
    e.preventDefault()
    let separateFromObject = []
    let string = []
    let together = ''

    this.state.availability.forEach(item => {
      separateFromObject.push(Object.entries(item))
    })
    console.log(separateFromObject)
    separateFromObject.forEach(data => {
      string.push(data.toString())
      together = string.join()
    })
    console.log(together)
    fetch(baseUrl + `/schedules/org_user/editSchedule/${this.state.current_user.id}`, {
      method: 'PUT',
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
  }

  logout = (e) => {
    fetch(baseUrl + '/users/logout', {
      'credentials': 'include'})
    .then(res => {
      return res.json()
    }).then(data => {
      this.setState({
        client_user: false,
        org_user: false,
        isLogin: false,
        client_page: false,
        login_button: true
      })
      alert('You have successfully logged out')
    })
  }


  render() {
    const data = this.state.availability
    
    return (
      <>
       {this.state.isLogin && <Logout logout={this.logout}/>}
      {((this.state.org_user || this.state.client_user) && this.state.login_button) && <Login state={this.state} baseUrl={baseUrl} checkLogin={this.checkLogin}/>} 

      {(!this.state.org_user && !this.state.client_user) && <Homepage org_Login={this.org_Login} client_Login={this.client_Login}/>}


      
      {this.state.isLogin && this.state.org_user && 

      <FullCalendar 
      plugins={[dayGridPlugin, InteractionPlugin, bootstrapPlugin]} 
      intialView='dayGridMonth' 
      events={data}
      selectable='true'
      themeSystem='bootstrap'
      dateClick={(e)=> this.handleDateClick(e)}/>}


      {this.state.isLogin && this.state.org_user && 
      <Button onClick={(e)=>{this.undoEntry(e)}}>Undo</Button>
      }

      {this.state.isLogin && this.state.org_user && this.state.post_button === true &&
      <Button primary onClick={(e)=>{this.submitSchedule(e)}}>Post Schedule</Button>
      }

      {this.state.isLogin && this.state.org_user && this.state.post_button === false &&
      <Button primary onClick={(e)=>{this.updateSchedule(e)}}>Update Schedule</Button>}

      {this.state.isLogin && this.state.client_user && <ClientPage baseUrl={baseUrl} state={this.state}/>}
      {this.state.isLogin && this.state.org_user && <Bookings clients={this.state.client_info}/>}
      </>

    )

  }

}

