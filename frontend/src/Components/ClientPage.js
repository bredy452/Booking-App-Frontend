import React, {Component} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import InteractionPlugin from '@fullcalendar/interaction'
import BookingCompanyChoice from './BookingCompanyChoice'


export default class ClientPage extends Component {
	constructor(props) {
		super(props)
		this.state= {
			org_availability: [],
			client_schedule: [],
			company_name: ''
		}
	}

	addBooking = (e) => {
		let info = prompt("Description of Booking: ")
    	let dupeState = {}
 		dupeState.date = e.dateStr
 		dupeState.title= info
    	const copyState1 = [...this.state.org_availability]
    	const copyState2 = [...this.state.client_schedule]
    	copyState1.push(dupeState)
    	copyState2.push(dupeState)

    	this.setState({
    		org_availability: copyState1,
    		client_schedule: copyState2
    	}) 
	}

	submitSchedule = (e) => {
    e.preventDefault()
    let separateFromObject = []
    let string = []
    let together = ''

    let separateFromObject2 = []
    let string2 = []
    let together2 = ''

    this.state.org_availability.forEach(item => {
      separateFromObject.push(Object.entries(item))
    })
    console.log(separateFromObject)
    separateFromObject.forEach(data => {
      string.push(data.toString())
      together = string.join()
    })

    this.state.client_schedule.forEach(item => {
      separateFromObject2.push(Object.entries(item))
    })
    console.log(separateFromObject2)
    separateFromObject2.forEach(data => {
      string2.push(data.toString())
      together2 = string2.join()
    })
    console.log(together2)
    console.log(this.state.company_name)

    fetch(this.props.baseUrl + '/schedules/client/bookDate', {
      method: 'POST',
      body: JSON.stringify({
        client_availability: together2,
        org_id: this.state.company_name


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

	bookingSchedule = (scheduleInfo, company) => {
		this.setState({
			org_availability: scheduleInfo,
			company_name: company
		})
		console.log(this.state.org_availability)
// 		fetch(this.props.baseUrl + '/schedules/org_user/viewSchedule', {
// 			credentials: 'include'})
// 		.then(res => {
// 			return res.json()
// 		}).then(data => {
// 			console.log(data.data[0].org_id.org_name)
// 			let arr = []
//     		arr = data.data[0].availability.split(',')
//     		let newArr = []
//     		let masterArr = []

// //   //first loop slices the variable arr into chunck of 6 indexes and pushes to a new arr to make array of arrays (newArr)
//     		for(let j = 0; j < arr.length; j += 6){
//       			let bitArr = arr.slice(j, j + 6)
//       			newArr.push(bitArr)
//     		}

// // //next loop iterates throught each array in the newArr and isolates it into a chunk (which is one array at a time) and declares a blank obj for each chunk.
//     		for(let x = 0; x < newArr.length; x++){
//       			let chunk = newArr[x]
//       			let tempObj ={}
// //    //next loop iterates thrugh each index within the chunk. if it is even it becomes a key and the next index +1 becomes the value. then it adds the key and value to the tempObj
//       			for(let y = 0; y < chunk.length; y++) {
//           			if (y % 2 ==0){
//           				let key = chunk[y]
//           				let value = chunk[y+1]
//           				tempObj[key] = value
//       				}
//     			}
// //    //this is part of the x loop, once the the y loop goes through each index in the chunk, it pushes the tempObj to the masterArr
//     				masterArr.push(tempObj)
//   			}
//   			this.setState({
//   				org_availability: masterArr
//   			})
// 		})
 	}

	// componentDidMount() {
	// 	this.getCalender()
	// }

	render() {

		let data = this.state.org_availability 
		let clientData = this.state.client_schedule
		
		return(
			<>
			<FullCalendar 
     		plugins={[dayGridPlugin, InteractionPlugin]} 
      		intialView='dayGridMonth' 
      		events={data}
      		selectable='true'
      		dateClick={(e) => {this.addBooking(e)}}
      		/>

      		<button onClick={(e)=>{this.submitSchedule(e)}}>Book Dates</button>

      		{/*<FullCalendar 
     		plugins={[dayGridPlugin, InteractionPlugin]} 
      		intialView='dayGridMonth' 
      		events={clientData}
      		selectable='true'/>*/}

      		<BookingCompanyChoice bookingSchedule={this.bookingSchedule} baseUrl={this.props.baseUrl}/>

      		</>


		)
	}

}



