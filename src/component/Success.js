import React from 'react' 
import { Table, Segment, Form, Button, Icon, Container, Checkbox } from 'semantic-ui-react'

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
				<Form>
				    <Form.Group widths='equal'>
				      <Form.Input
				        fluid
				        id='form-subcomponent-shorthand-input-first-name'
				        label='First name'
				        placeholder='First name'
				      />
				      <Form.Input
				        fluid
				        id='form-subcomponent-shorthand-input-last-name'
				        label='Last name'
				        placeholder='Last name'
				      />
				    </Form.Group>
				    <Form.Group widths='equal'>
				      <Form.Input
				        fluid
				        id='form-subcomponent-shorthand-input-first-name'
				        label='First name'
				        placeholder='First name'
				      />
				      <Form.Input
				        fluid
				        id='form-subcomponent-shorthand-input-last-name'
				        label='Last name'
				        placeholder='Last name'
				      />
				    </Form.Group>
				    <Form.Group widths='equal'>
				      <Form.Input
				        fluid
				        id='form-subcomponent-shorthand-input-first-name'
				        label='First name'
				        placeholder='First name'
				      />
				      <Form.Input
				        fluid
				        id='form-subcomponent-shorthand-input-last-name'
				        label='Last name'
				        placeholder='Last name'
				      />

				    </Form.Group>
				    <Form.Field control={Checkbox} label={{ children: 'I agree to the Terms and Conditions' }} />

				  </Form>
			</Segment>

			<Segment padded  basic>
			  <Container padded>
			  	<Button onClick={()=>this.props.handleChangeTab("billing")} color="red" floated='left'>
			  	<Icon name='left chevron' />

	            Billing
	          </Button>
			  	<Button color="red" floated='right'>
	            Success
	            <Icon name='right chevron' />
	          </Button>
	          </Container>
			</Segment>
			</Segment>
		);
	}
}

export default Success;