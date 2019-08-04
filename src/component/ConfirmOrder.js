import { Table, Segment, Form, Checkbox, Button, Icon, Container } from 'semantic-ui-react'
import React from 'react'
import { create_order } from '../utils/api'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../action/shoppingcart'
import * as product from '../action/product'

function mapStateToProps(state) {
	return {
		// typically this will be the mapping
		token: "xdkdihj",
		// cart_items: state.product.cart_item
		items: state.shoppingcart.cart_items,
		total: state.shoppingcart.cart_total_amt
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actions, dispatch);
}
class ConfirmOrder extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			cart_id: localStorage.getItem('CART_ID'),
			tax_id: 0,
			shipping_id:1,
		}
	}
	componentDidMount(){
		// fetch the content from the backend
		let cart_id = localStorage.getItem('CART_ID')
		console.log("cart is is", cart_id)
		this.props.fetchCartItems(cart_id)
	}
	placeOrder=()=>{
		console.log("inside place order")
		let body = {
			cart_id: this.state.cart_id,
			shipping_id: this.state.shipping_id,
			tax_id: this.state.tax_id
		}
		// call the function to send the infor to backend and change tab when done.
		create_order(body)
		.then((response) =>{
			console.log( "resonseof placing order is", response)
			console.log("order is id is ", response.orderId)
			localStorage.setItem('order_id', response.orderId)
			this.props.handleChangeTab("billing")

		})
		.catch(err => {
			console.log("and error occured placing order")
		})
	}
	checkTax=(tax)=>{
		console.log('check is ', tax)
		this.setState({
			tax_id: tax 
		});
	}
	render() {
		return (
			<Segment basic>
			<Segment basic>
				  <Table singleLine>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>Item</Table.HeaderCell>
				        <Table.HeaderCell>description</Table.HeaderCell>
				        <Table.HeaderCell>Quantity </Table.HeaderCell>
				        <Table.HeaderCell>Price</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>

				    <Table.Body>
			    {  this.props.items &&  Array.isArray(this.props.items) && this.props.items.map((item,key) => (


				      <Table.Row key = {key}>
				        <Table.Cell>{item.name}</Table.Cell>
				        <Table.Cell>{item.attributes}</Table.Cell>
				        <Table.Cell>{item.quantity}</Table.Cell>
				        <Table.Cell>{item.price}</Table.Cell>
				      </Table.Row>

				))}
						<Table.Row >
					        <Table.Cell></Table.Cell>
					        <Table.Cell></Table.Cell>
					        <Table.Cell></Table.Cell>
					        <Table.Cell>{this.props.total && this.props.total.total_amount}</Table.Cell>
				      	</Table.Row>
				    </Table.Body>
				  </Table>

				      	<Form.Group widths='equal'>

				      	 <Form.Field onChange={()=>this.checkTax(0)}  control={Checkbox} label={{ children: 'Standard shipping' }} />
				      	 <Form.Field onChange={() => this.checkTax(1)}  floated="right" control={Checkbox} label={{ children: 'Express shipping' }} />
				      	 </Form.Group>
			</Segment>

			<Segment padded  basic>
			  <Container >
			  	<Button onClick={()=>this.props.handleChangeTab("shipping")} color="red" floated='left'>
			  	<Icon name='left chevron' />

	            Shipping
	          </Button>
			  	<Button  onClick={()=>this.placeOrder()} color="red" floated='right'>
	            Billing
	            <Icon name='right chevron' />
	          </Button>
	          </Container>
			</Segment>
			</Segment>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOrder);
