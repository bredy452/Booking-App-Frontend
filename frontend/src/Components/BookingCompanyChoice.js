import React, { Component} from 'react'
import {Dropdown, Button} from 'semantic-ui-react'


export default class BookingCompanyChoice extends Component {
	constructor(props) {
		super(props)
		this.state={
			companies: [],
			companyChoice: [],
			bookedDates: []
		}
	}

	pushSchedule = (e) => {
		e.preventDefault()
		this.setState({
			companyChoice: e.target.textContent
		})
	}

	getBookedDates = (e) => {
    fetch(this.props.baseUrl + `/schedules/client_schedule/${this.state.companyChoice}`, {
      credentials: 'include'})
    .then(res => {
      return res.json()
    }).then(data => {

      let arr = []
        arr = data.data.client_availability.split(',')
        let newArr = []
        let masterArr = []
        let tempObj ={}


        for(let j = 0; j < arr.length; j += 6){
            let bitArr = arr.slice(j, j + 6)
            newArr.push(bitArr)
        }

        for(let x = 0; x < newArr.length; x++){
            let chunk = newArr[x]
            
            for(let y = 0; y < chunk.length; y++) {
                if (y % 2 ==0){
                  let key = chunk[y]
                  let value = chunk[y+1]
                  tempObj[key] = value
              }
          }

            // masterArr.push(tempObj)
            // console.log(masterArr)
        }

        const copybookedDates = [...this.state.bookedDates]
        copybookedDates.push(tempObj)
        // console.log(masterArr)
        this.setState({
          bookedDates: copybookedDates
        })
        console.log(this.state.bookedDates)

    })
  }

	getSchedule = (e) => {
		this.getBookedDates()
		fetch(this.props.baseUrl + `/schedules/${this.state.companyChoice}`, {
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

    		for(let x = 0; x < newArr.length; x++){
      			let chunk = newArr[x]
      			let tempObj ={}

      			for(let y = 0; y < chunk.length; y++) {
          			if (y % 2 ==0){
          				let key = chunk[y]
          				let value = chunk[y+1]
          				tempObj[key] = value
      				}
    			}

    				masterArr.push(tempObj)
    				
  			}
  			
  			this.state.bookedDates.forEach(item => {
  				masterArr.push(item)
  			})
  			// masterArr.push(this.state.bookedDates)
  			console.log(masterArr)
  			this.props.bookingSchedule(masterArr, this.state.companyChoice)
  			// this.setState({
  			// 	org_availability: masterArr
  			// })
		})
	}




	getCompanies = () => {
		fetch(this.props.baseUrl + '/users/organizations', {
			credentials: 'include'})
		.then(res => {
			return res.json()
		}).then(data => {
			let companies = []

			data.organizations[0].forEach((name, index) => {
				companies.push({'text': name.org_name, 'value': name.org_name})		
			})
			
			this.setState({
				companies: companies
			})
			
			console.log(this.state.companies)
			console.log(companies)
		})

	}

	componentDidMount() {
		this.getCompanies()
	}

	render() {

		let companyOptions = this.state.companies

		return(
			<>
			<Dropdown
    			placeholder='Company Selection'
    			fluid
    			options={companyOptions}
    			search
    			selection
    			onChange={(e) => {this.pushSchedule(e)}} 
    			// value={this.state.companyChoice}
  			/>

  			<Button schedule onClick={(e) => {this.getSchedule(e)}}>View Availability</Button>
  			</>
		)
	}
}

