import React, {Component} from 'react'
import {Button, Form, Grid, Header, Segment} from 'semantic-ui-react'

export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password:''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		fetch(this.props.baseUrl + '/users/org_user/login', {
			method: 'POST',
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}).then (res => {
			return res.json()
		}).then (data => {

			console.log(data)
			this.props.checkLogin(data.status, data.data)
		}).catch(error => console.error)
	}

	render() {
		console.log(this.state)
		return(
			<>
			<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    			<Grid.Column style={{ maxWidth: 450 }}>
      				<Header as='h2' color='teal' textAlign='center'>
    
     		 		</Header>
      				<Form size='large' onSubmit={ (e) => this.handleSubmit(e)}>
        				<Segment stacked>
          					<Form.Input fluid icon='user' iconPosition='left' placeholder='username' name='username' onChange={ (e) => this.handleChange(e)} value={this.state.username} />
          					<Form.Input
            				fluid
            				icon='lock'
           					iconPosition='left'
            				placeholder='Password'
            				type='password'
            				name='password'
            				onChange={ (e) => this.handleChange(e)} value={this.state.password}
          					/>
          					<Button color='red' fluid size='large'>
            				Login
          					</Button>
        				</Segment>
      				</Form>
     				{/*<Button onClick={(e) => this.props.openRegistration(e)}>
         				Sign Up
     		 		</Button>*/}
    			</Grid.Column>
  			</Grid>

 		 	</>



		)
	}
}