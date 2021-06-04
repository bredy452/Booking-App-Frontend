import React, {Component} from 'react'
import {Button, Form, Grid, Header, Segment, Label} from 'semantic-ui-react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import InteractionPlugin from '@fullcalendar/interaction'
import Org_userRegister from './Org_userRegister'
import ClientRegister from './Org_userRegister'

export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password:'',
			clientRegister: false,
			org_userRegister: false
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		if (this.props.state.org_user) {

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
		} else if (this.props.state.client_user) {

			fetch(this.props.baseUrl + '/users/client/login', {
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
	}

	render() {
		console.log(this.state.clientRegister)
		console.log(this.state.org_userRegister)

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
     				{this.props.state.org_user && this.props.state.login_button && 
     					<Button as='div' labelPosition='right'>
      						<Button color='blue' onClick={(e) => {
      						this.setState({org_userRegister: !this.state.org_userRegister})}}
      						>
        						Register
      						</Button>
      					<Label as='a' basic color='red' pointing='left'>
        					Organization
      					</Label>
    					</Button>}

    			{this.props.state.client_user && this.props.state.login_button && 
    				<Button as='div' labelPosition='right'>
      					<Button color='blue' onClick={(e) => {
      						this.setState({clientRegister: !this.state.clientRegister})}}
      					>
        					Register
      					</Button>
      				<Label as='a' basic color='red' pointing='left'>
        					Client
      				</Label>
    				</Button>}
    			{this.props.state.client_user && this.props.state.login_user && this.state.clientRegister &&
    				<ClientRegister/>}

    			{this.props.state.org_user && this.props.state.login_user && this.state.Org_userRegister &&
    				<Org_userRegister/>}
    			</Grid.Column>
  			</Grid>
  			{/*{this.props.state.org_user && this.props.state.login_button && <Org_userRegister state={this.state.props}/>}*/}

 		 	</>



		)
	}
}