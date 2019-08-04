import React from 'react'
import {Button, Table, Icon,Label, Container, Item,  Header, Segment, Modal, Dimmer, Loader, Image, Message} from 'semantic-ui-react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../action/shoppingcart'
import * as product from '../action/product'
import { Link } from 'react-router-dom'
function mapStateToProps(state) {
	return {
		// typically this will be the mapping
		token: "xdkdihj",
		// cart_items: state.product.cart_item
		requesting: state.shoppingcart.requesting,
		error: state.shoppingcart.error,
		items: state.shoppingcart.cart_items,
		total: state.shoppingcart.cart_total_amt,

	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(Object.assign({},actions,product), dispatch);
}

class Cart extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			quantity: 1, //qty open item and price are all used only inside the modal for showing and editing of a selected item
			open: false,
			item: null,
			price:"",
		}
	}
	  close = () => this.setState({ open: false })
	  updateProduct = () => {
	  	this.setState({
	  		open: false, 
	  	});
	  	this.props.updateProductQuantity(this.state.item.item_id, this.state.quantity)
	  }
	componentDidMount(){
		// fetch the content from the backend
		let cart_id = localStorage.getItem('CART_ID')
		console.log("cart is is", cart_id)
		this.props.fetchCartItems(cart_id)
	}
	handleSetQuantify =(quantity) =>{
		let qty = Number(this.state.quantity);
			if(quantity === "subtract"){
				qty = qty - 1
			}
			else if(quantity === "add"){
				qty = qty + 1
			}
		this.setState({
			quantity:qty 
		});
	}

	handleshowModal =(item) =>{
		this.setState({
			item: item, open: true, quantity: item.quantity
		});
	}
	render(){

const colors = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
]
		return (
			<Container> 
				<Header as="h2"> { this.props.items && this.props.items.length} Items in Cart </Header>
			<Table basic>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>
			        	Item
			        </Table.HeaderCell>
			        <Table.HeaderCell>Size</Table.HeaderCell>
			        <Table.HeaderCell>Quantity</Table.HeaderCell>
			        <Table.HeaderCell>Unit Price</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>
			    	{this.props.error && 
			    		  <Message negative>
						    <Message.Header>We're sorry we can't apply Something unexpected happend</Message.Header>
						    <p>Request timed out</p>
						  </Message>
			    	}
			        {this.props.requesting && <Segment>
				      <Dimmer active inverted>
				        <Loader size='small'>Loading</Loader>
				      </Dimmer>

				      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
				    </Segment>}
			    <Table.Body>
			    {  this.props.items &&  Array.isArray(this.props.items) && this.props.items.map((item,key) => (

			      <Table.Row key = {key}>
			        <Table.Cell>
				        <Item.Group>
				        	<Item>
	      					<Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />

					      <Item.Content verticalAlign="middle">

					        <Item.Header as='a'> {item.name}</Item.Header>
					        <Item.Meta>
					          <span className='price'>{item.attributes}</span>
					          <Button onClick={() => this.props.removeItemFromCart(item.item_id)} color="red" size="mini" floated='right'>
					          	<Icon name='delete' />

						            Remove
						          </Button>
					        </Item.Meta>
						        
					        </Item.Content>
					        </Item>
					        </Item.Group>

			        </Table.Cell>
			        <Table.Cell>Size</Table.Cell>
			        <Table.Cell>
			           <Item.Extra>
			           	  <Label.Group circular>
				          <Label as="a" onClick={() => this.handleshowModal(item)} >-</Label>
				          <Label >{item.quantity}</Label>
				          <Label as="a" onClick={() => this.handleshowModal(item)}>+</Label>
				          </Label.Group>
				        </Item.Extra>
				       </Table.Cell>
			        <Table.Cell>{item.price}</Table.Cell>
			      </Table.Row>

			    	))}

			    <Table.Row key>
			        <Table.Cell>
			        	Total

			        </Table.Cell>
			        <Table.Cell></Table.Cell>
			        <Table.Cell>

				       </Table.Cell>
			        <Table.Cell>{this.props.total && this.props.total.total_amount}</Table.Cell>
			      </Table.Row>
			    </Table.Body>
			  </Table>

			  <Segment padded  basic>
			  <Container padded>
			  	<Button color="red" floated='left'>
			  	<Icon name='left chevron' />

	            Remove
	          </Button>
			  	<Button as={Link} to='/checkout' color="red" floated='right'>
	            Checkout
	            <Icon name='right chevron' />
	          </Button>
	          </Container>
			   </Segment>
		<Modal size="tiny" open={this.state.open} onClose={this.close}>
          <Modal.Header>Update Product Quantity </Modal.Header>
          <Modal.Content>
				<Table.Row >
			        <Table.Cell>
				        <Item.Group>
				        	<Item>

					      <Item.Content verticalAlign="middle">

					        <Item.Header as='a'> {this.state.item && this.state.item.name}</Item.Header>
					        <Item.Meta>
					          <span className='price'>{this.state.item && this.state.item.attributes}</span>
					          <Button onClick={() => this.props.removeItemFromCart( this.state.item && this.state.item.item_id)} color="red" size="mini" floated='right'>
					          	<Icon name='delete' />

						            Remove
						          </Button>
					        </Item.Meta>
						        
					        </Item.Content>
					        </Item>
					        </Item.Group>

			        </Table.Cell>
			        <Table.Cell>Size</Table.Cell>
			        <Table.Cell>
			           <Item.Extra>
			           	  <Label.Group circular>
				          <Label as="a" onClick={() => this.handleSetQuantify("subtract")} >-</Label>
				          <Label >{this.state.quantity}</Label>
				          <Label as="a" onClick={() => this.handleSetQuantify("add")}>+</Label>
				          </Label.Group>
				        </Item.Extra>
				       </Table.Cell>
			        <Table.Cell>{ this.state.item && (this.state.quantity * this.state.item.price)}</Table.Cell>
			      </Table.Row>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>close</Button>
            <Button onClick={this.updateProduct} positive icon='checkmark' labelPosition='right' content='Save' />
          </Modal.Actions>
        </Modal>
			</Container>
		)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
