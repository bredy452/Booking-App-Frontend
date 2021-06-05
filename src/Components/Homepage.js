import React, { Component } from 'react'
import {Menu, Header} from 'semantic-ui-react'

export default class HomePage extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	handleItemClick1 = (e, {name}) => {
		this.setState({
			activeItem: name
		})
		this.props.org_Login(e)
	}

	handleItemClick2 = (e, {name}) => {
			this.setState({
				activeItem: name
			})
			this.props.client_Login(e)
	}

	render() {
		const {activeItem} = this.state

		return(
			<>
				<Header as='h1' color='blue' textAlign='center'>
      		Welcome to Booking
   		 	</Header>
				<Menu fluid widths={2}>
					<Menu.Item
					name='Organization Login'
					active={activeItem === 'Organization Login'}
					onClick={this.handleItemClick1}
					>
					Organization Login
					</Menu.Item>

					<Menu.Item
					name='Client Login'
					active={activeItem === 'Client Login'}
					onClick={this.handleItemClick2}
					>
					Client Login
					</Menu.Item>
				</Menu>

					{/*<
				<Segment>
    <Grid columns={2} relaxed='very'>
      <Grid.Column>
       
        <a href='#' onClick={(e) => {this.props.org_Login(e)}}>Organization Login</a>
       
      </Grid.Column>
      <Grid.Column>
        
        <a href='#' onClick={(e) => {this.props.client_Login(e)}} >Client Login</a>
        
      </Grid.Column>
    </Grid>

    <Divider vertical></Divider>
  </Segment>*/}
				
				
			</>

		)
	}
}