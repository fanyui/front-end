import React from 'react'
import {Button, Container, Icon, Table, Checkbox, Segment, Form, Step } from 'semantic-ui-react'
import Shipping from './Shipping'
import Success from './Success'
import ConfirmOrder from './ConfirmOrder'
import Billing from './Billing'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../action/customer'
import { Redirect } from 'react-router-dom'
import helper from '../utils/helper'
function mapStateToProps(state) {
	return {
		// typically this will be the mapping
		token: "xdkdihj",
		// cart_items: state.product.cart_item
		items: state.shoppingcart.cart_items,
		total: state.shoppingcart.cart_total_amt,
		regions: state.customer.shippingregions
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actions, dispatch);
}
class Checkout extends React.Component{
	constructor(props){
		super(props)
		this.state= {
			currentTab :"shipping",
			 steps : [
			  {
			  	completed: false,
			    key: 'shipping',
			    icon: 'truck',
			    active: true,
			    disabled: false,
			    title: 'Shipping',
			    description: 'Choose your shipping options',
			  },
			  { key: 'confirm', completed: false, disabled: true, icon: 'info', description: 'Verify your order infomation', title: 'Confirm Order' },

			  {
			  	completed: false,

			    key: 'billing',
			    active: false,
			    disabled: true,
			    icon: 'payment',
			    title: 'Billing',
			    description: 'Enter billing information',
			  },
			  { key: 'confir', completed: false, disabled: true, icon: 'check', title: 'Success', description: 'All set' ,completed: false },
			]
		}
	}

	componentDidMount(){
		this.props.handleGetShippingRegions()
	}
	handleChangeTab =( tab ) => {
		let oldtab = this.state.currentTab
		this.setState({
			currentTab: tab 
		});
		let step = this.state.steps.map(step => {
			if(step.key == tab)
				return {
					key: step.key,
					completed: false,
					active: true,
					icon: step.icon,
					title: step.title,
					description: step.description,
					disabled: false,
				}
			else if(step.key == oldtab) 				
				return {
					key: step.key,
					completed: true,
					active: false,
					icon: step.icon,
					title: step.title,
					description: step.description,
					disabled: true,
				}
			else
				return {...step}
		})
		this.setState({
			steps: step
		});

	}
	render() {
			if (!helper.isloggedin()) {
		       return <Redirect to='/login'/>;
		     }
		return (
			 
			<Segment padded="very" basic>
				<Segment basic>
					<Step.Group width={4} items={this.state.steps} />
				</Segment>
				{this.state.currentTab === "shipping" && <Shipping handleChangeTab={this.handleChangeTab}/>}
				{this.state.currentTab === "confirm" && <ConfirmOrder  handleChangeTab={this.handleChangeTab}/>}
				{this.state.currentTab === "billing" && <Billing  handleChangeTab={this.handleChangeTab}/>}
				{this.state.currentTab === "success" && <Success  handleChangeTab={this.handleChangeTab}/>}
			
			</Segment>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

