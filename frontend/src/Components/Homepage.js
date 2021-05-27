import React, { Component } from 'react'
import {Divider, Grid, Image, Segment} from 'semantic-ui-react'

export default class HomePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}

	render() {
		return(
			<>
				<h1>Welcome to Booking</h1>
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
  </Segment>
				
				
			</>

		)
	}
}