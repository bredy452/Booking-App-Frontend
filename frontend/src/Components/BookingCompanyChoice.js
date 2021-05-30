import React, { Component} from 'react'
import {Dropdown} from 'semantic-ui-react'


export default class BookingCompanyChoice extends Component {
	constructor(props) {
		super(props)
		this.state={
			companies: []
		}
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
			// companies.forEach(company => {
			// 	company.title=company
			// })
			
			console.log(this.state.companies)
			console.log(companies)
			// this.setState({
			// 	companies: companiesList
			// })
		})

	}

	componentDidMount() {
		this.getCompanies()
	}

	render() {

		let companyOptions = this.state.companies

		return(
			<Dropdown
    			placeholder='Company Selection'
    			fluid
    			options={companyOptions}
    			search
    			selection
  			/>
		)
	}
}

