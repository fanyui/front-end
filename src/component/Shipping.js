import { Table, Segment, Form, Button, Icon, Container, Checkbox, Select, Dropdown } from 'semantic-ui-react'
import React from 'react'
import helper from '../utils/helper'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../action/customer'

function mapStateToProps(state) {
	return {
		regions: state.customer.shippingregions
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actions, dispatch);
}
class Shipping extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			address_1:"",
			address_2: "",
			city: "",
			region:"",
			postal_code: "",
			country: "",
			shipping_region_id: "",
			options: null,
			errors: {
				address_1:false,
				address_2: false,
				city: false,
				region:false,
				postal_code: false,
				country: false,
				shipping_region_id: false
			},
		}
	}
  	handleDropDownChange = (e, { name, value }) => { 
  		this.setState({ [name]: value })
  		console.log("value of vlaue is ", value)
  	}
  	handleOnBlur = e => {
		const inputs = this.state;
		if (inputs[e.target.name].length === 0) {
		  this.setState({
		    errors: {
		      ...this.state.errors,
		      [e.target.name]: true,
		    },
		  });
		}
		else {
			this.setState({
		    errors: {
		      ...this.state.errors,
		      [e.target.name]: false,
		    },
		  });
		}
		}

	handleChange = (e) => {
		console.log(`submiting this through event, ${e.target.name} with value ${e.target.value}`)
		const state = this.state
		state[e.target.name] = e.target.value
		this.setState(state);
	}
	componentDidMount(){
		this.props.handleGetShippingRegions()
		if(Array.isArray(this.props.regions))
		this.formatData(this.props.regions)
	}	
	componentWillReceiveProps(nextProps){
		console.log("received props", nextProps)
		if(Array.isArray(nextProps.regions))
		this.formatData(nextProps.regions)
	}
	formatData(data){
		if( data && Array.isArray(data) ){

		let result = data.map((row) => {
			return {
				key: row.shipping_region_id,
				value: row.shipping_region_id,
				text: row.shipping_region,
			}
		})
		console.log("I am going home", result)
		this.setState({
			options: result,
		});

		}
	}
	handleSubmit = (tab) => {
		// semd the data to backend and change tab
			// { address_1,address_2,city,region,postal_code,country,shipping_region_id } = this.state.errors


		if( !this.state.errors.address_1 && !this.state.errors.address_2 && !this.state.errors.city && !this.state.errors.region && !this.state.errors.postal_code && !this.state.errors.country && !this.state.errors.shipping_region_id){
			//validate the content of the state here
			if(helper.isloggedin()){
				let body = this.state;
				console.log("sending", body)
				this.props.handleCustomerUpdate( body)
				this.props.handleChangeTab(tab)
			}
		}
		else{}


	}

	render() {
		const { options } = this.state;
		return (
			<Segment basic>
			<Segment basic>
				<Form>
				    <Form.Group widths='equal'>
				      <Form.Input required
				        fluid
				        id='form-subcomponent-shorthand-input-first-name'
				        label='Address 1'
				        placeholder='Address_1'
				        name="address_1"
				        onChange={this.handleChange}
				        onBlur={this.handleOnBlur}
			            error = {this.state.errors.address_1 } 

				      />
				      <Form.Input
				        fluid
				        required
				        id='form-subcomponent-shorthand-input-last-name'
				        label='Address 2'
				        placeholder='Address_2'
				        name="address_2"
				        onChange={this.handleChange}
				        onBlur={this.handleOnBlur}
			            error = {this.state.errors.address_2 } 

				      />
				    </Form.Group>
				    <Form.Group widths='equal'>
				      <Form.Input required
				      	onBlur={this.handleOnBlur}
			            error = {this.state.errors.city } 

				        fluid
				        id='form-subcomponent-shorthand-input-first-name'
				        label='City'
				        placeholder='City'
				        name="city"
				        onChange={this.handleChange}
				      />
				      <Form.Input required
				        fluid
				        id='form-subcomponent-shorthand-input-last-name'
				        label='Region'
				        placeholder='Your Region'
				        onChange={this.handleChange}
				        name="region"
				        onBlur={this.handleOnBlur}
			            error = {this.state.errors.region } 

				      />
				    </Form.Group>
				    <Form.Group widths='equal'>
				      <Form.Input required
				        fluid
				        id='form-subcomponent-shorthand-input-first-name'
				        label='Postal Coee'
				        placeholder='Postal Code'
				        name="postal_code"
				        onChange={this.handleChange}
				        onBlur={this.handleOnBlur}
			            error = {this.state.errors.postal_code } 

				      />
				      <Form.Input  required
				        fluid
				        id='form-subcomponent-shorthand-input-last-name'
				        label='Country'
				        placeholder='Country'
				        name="country"
				        onChange={this.handleChange}
				        onBlur={this.handleOnBlur}
			            error = {this.state.errors.country } 

				      />

				    
				   </Form.Group>
					 { /*<Form.Group widths='equal'>
				      <Form.Input  required
				        fluid
				        id='form-subcomponent-shorthand-input-last-name'
				        label='Shipping Region'
				        placeholder='Shipping id'
				        name="shipping_region_id"
				        onChange={this.handleChange}
				      />
				    </Form.Group>*/}

				<Dropdown
				    placeholder='Select Friend'
				    fluid
				    name='shipping_region_id'
				    selection
				    options={options}
                	onChange={this.handleDropDownChange}

				  />

				    {/*     <Select placeholder='Select your shipping region' options={options} /> */}

				    <Form.Field  control={Checkbox} label={{ children: 'I agree to the Terms and Conditions' }} />

				  </Form>
			</Segment>

			<Segment padded  basic>
			  <Container >
			  	<Button color="red" floated='left'>
			  	<Icon name='left chevron' />

	            Back
	          </Button>
			  	<Button onClick={()=> this.handleSubmit("confirm")} color="red" floated='right'>
	            Confirm Order
	            <Icon name='right chevron' />
	          </Button>
	          </Container>
			</Segment>
			</Segment>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Shipping);


