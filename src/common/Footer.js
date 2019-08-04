import React, {Component} from 'react'
import {List} from 'semantic-ui-react'
export default class Footer extends Component{
	render(){
	return(
		<div className="ui inverted vertical footer segment">
		    <div className="ui container">
		        Shopehere Match &copy; {(new Date()).getFullYear()}. All Rights Reserved

			<div>
		    <List floated='right' horizontal>
		      <List.Item  href='#'>
		        © GitHub, Inc.
		      </List.Item>
		      <List.Item href='#'>Terms</List.Item>
		      <List.Item href='#'>Privacy</List.Item>
		      <List.Item href='#'>Contact</List.Item>
		    </List>

		    <List horizontal>
		      <List.Item href='#'>About Us</List.Item>
		      <List.Item href='#'>Jobs</List.Item>
		    </List>
		  </div>
		    </div>

		    
		</div>
		)	
	}
}