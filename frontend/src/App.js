import React, {Component} from 'react'
import './App.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import InteractionPlugin from '@fullcalendar/interaction' 
import Login from './Components/Login'
import Homepage from './Components/Homepage'
import ClientPage from './Components/ClientPage'
import Bookings from './Components/Bookings'

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

      let arr = []
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
            console.log(masterArr)
        }
        // console.log(masterArr)
        this.setState({
          availability: masterArr
          
        })       
    })
  }

  getPotentialClientSchedule = (e) => {
    fetch(baseUrl + `/schedules/client_schedule/${this.state.current_user.org_name}`, {
      credentials: 'include'})
    .then(res => {
      return res.json()
    }).then(data => {

      let arr = []
        arr = data.data.client_availability.split(',')
        let newArr = []
        let masterArr = []
        const copyAvailability = [...this.state.availability]

        for(let j = 0; j < arr.length; j += 4){
            let bitArr = arr.slice(j, j + 4)
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
          copyAvailability.push(tempObj)

            // masterArr.push(tempObj)
            // console.log(masterArr)
        }

        // const copyAvailability = [...this.state.availability]
        // console.log(copyAvailability)
        
      
        // console.log(masterArr)
      this.setState({
        availability: copyAvailability,
        client_info: [data.data.client_id]
      })
      console.log(this.state.availability)
      console.log(this.state.availability.length)
      console.log(this.state)
      // if (this.state.availability.length === 0){
      //   console.log(true)
      // }

        // console.log(masterArr)
        // this.setState({
        //   availability: masterArr
          
        // })       
    })
  }

  // getPotentialClientSchedule = (e) => {
  //   fetch(baseUrl + `/schedules/client_schedule/${this.state.current_user.org_name}`, {
  //     credentials: 'include'})
  //   .then(res => {
  //     return res.json()
  //   }).then(data => {
  //     let arr = []
  //     arr = data.data.client_availability.split(',')
  //     console.log ('HERE', arr)
  //     let newArr = []
  //     let masterArr = []
  //     // let tempObj ={}


  //     for(let j = 0; j < arr.length; j += 6){
  //         let bitArr = arr.slice(j, j + 6)
  //         newArr.push(bitArr)  
  //     }

  //       console.log(newArr)

  //     for(let x = 0; x < newArr.length; x++){
  //         let chunk = newArr[x]
  //         let tempoObj ={}
  //         console.log(chunk)  
  //         for(let y = 0; y < chunk.length; y++) {
  //             if (y % 2 === 0){
  //               let key = chunk[y]
  //               let value = chunk[y+1]
  //               tempoObj[key] = value
  //             }
  //         }

  //         masterArr.push(tempoObj)
  //         console.log(masterArr)
  //           // console.log(masterArr)
  //     }

  //     const copyAvailability = [...this.state.availability]
  //     copyAvailability.push(tempoObj)
  //       // console.log(masterArr)
  //     this.setState({
  //       availability: copyAvailability,
  //       client_info: [data.data.client_id]
  //     })
  //     console.log(this.state.availability)
  //     console.log(this.state.availability.length)
  //     console.log(this.state)
  //     // if (this.state.availability.length === 0){
  //     //   console.log(true)
  //     }

  //   })


  // }

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
        post_button: false
      })
      //What can we check to confirm schedule
      
      console.log(status)
      console.log(this.state.current_user.id)
    }

    if (this.state.org_user) {
      this.getOrgSchedule()
      this.getPotentialClientSchedule()
      console.log(this.state.availability.length)


    }

   
  }

  handleDateClick = (e) => {
    console.log(e.jsEvent)
    const dupState = {}
    dupState.date = e.dateStr
    const copyState = [...this.state.availability]
    copyState.push(dupState)

    copyState.forEach((data) => {
      // data.title = 'unavailable'
      if (data.title == undefined) {
        data.display = 'background'
        data.color = '#FF000D'
      }

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
    console.log(together)
  }


  render() {
    console.log(this.state.availability.length)
    console.log(this.state.availability)
    console.log(this.state.post_button)
    // console.log(this.state.org_user)
    const data = this.state.availability
    
    return (
      <>
      {((this.state.org_user || this.state.client_user) && this.state.login_button) && <Login state={this.state} baseUrl={baseUrl} checkLogin={this.checkLogin}/>} 

      {(!this.state.org_user && !this.state.client_user) && <Homepage org_Login={this.org_Login} client_Login={this.client_Login}/>}


      
      {this.state.isLogin && this.state.org_user && 

      <FullCalendar 
      plugins={[dayGridPlugin, InteractionPlugin]} 
      intialView='dayGridMonth' 
      events={data}
      selectable='true'
      dateClick={(e)=> this.handleDateClick(e)}/>}


      {this.state.isLogin && this.state.org_user && 
      <button onClick={(e)=>{this.undoEntry(e)}}>Undo</button>
      }

      {this.state.isLogin && this.state.org_user && this.state.post_button === false &&
      <button onClick={(e)=>{this.submitSchedule(e)}}>Post Schedule</button>
      }

      {this.state.isLogin && this.state.org_user && this.state.post_button === true &&
      <button>Update Schedule</button>}

      {this.state.isLogin && this.state.client_user && <ClientPage baseUrl={baseUrl} state={this.state}/>}
      {this.state.isLogin && this.state.org_user && <Bookings clients={this.state.client_info}/>}
      </>

    )

  }

}

