import React from 'react' 
import {Segment, Message } from 'semantic-ui-react'

class Success extends React.Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}
	render() {
		return (
			<Segment basic>
			<Segment basic>
				  <Message info>
			    <Message.Header>Your Order has been received</Message.Header>
			    <p>Thank you for trusting us?</p>
			  </Message>
			</Segment>
			</Segment>
		);
	}
}

export default Success;