import React, {Component} from 'react'
import {Form, Button, Icon, Label} from 'semantic-ui-react'

export default class Org_userRegister extends Component {
	constructor(props) {
		super(props)
		this.state = {
			org_name: '',
			first_name: '',
			last_name: '',
			username: '',
			email: '',
			password: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
		 console.log(e.target.value)
	}


	register = (e) => {
		e.preventDefault()
		fetch(this.props.baseUrl + '/users/org_user/register', {
			method: 'POST',
			body: JSON.stringify({
				org_name: this.state.org_name,
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				email:this.state.email,
				username:this.state.username,
				password:this.state.password
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
			}).then (res => {
				return res.json()
			}).then (data => {
				console.log(data)
			}).catch(error => console.error)
	}

	render() {
		console.log(this.state.org_name)
		return(
			<>
				<Form>
    				<Form.Input
      				error={{ content: 'Please enter your organization name', pointing: 'below' }}
      				fluid
      				label='Organization Name'

      				placeholder='Organization Name'
      				id='org_name'
      				onChange={(e) => {this.handleChange(e)}}
      				value={this.state.org_name}
    				/>
    				<Form.Input
      				error='Please enter your first name'
      				fluid
      				label='First Name'
      				placeholder='First Name'
      				id='first_name'
      				onChange={(e) => {this.handleChange(e)}}
      				value={this.state.first_name}
    				/>
    				<Form.Input
      				error='Please enter your last name'
      				fluid
      				label='Last Name'
      				placeholder='Last name'
      				id='last_name'
      				onChange={(e) => {this.handleChange(e)}}
      				value={this.state.last_name}
    				/>
    				<Form.Input
      				error='Please enter a username'
      				fluid
      				label='Username'
      				placeholder='Username'
      				id='username'
      				onChange={(e) => {this.handleChange(e)}}
      				value={this.state.username}
    				/>
    				<Form.Input
      				error='Please enter your email address'
      				fluid
      				label='Email Address'
      				placeholder='Email Address'
      				id='email'
      				onChange={(e) => {this.handleChange(e)}}
      				value={this.state.email}
    				/>
    				<Form.Input
      				error='Please enter a password'
      				fluid
      				label='Password'
      				placeholder='Password'
      				id='password'
      				onChange={(e) => {this.handleChange(e)}}
      				value={this.state.password}
    				/>
    				<Button primary onClick={(e) => {this.register(e)}}>Register</Button>
  				</Form>
			</>
		)
	}
}