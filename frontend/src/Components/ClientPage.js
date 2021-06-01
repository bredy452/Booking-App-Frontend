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
			client_schedule: []
		}
	}

	bookingSchedule = (scheduleInfo) => {
		this.setState({
			org_availability: scheduleInfo
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
      		selectable='true'/>

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



