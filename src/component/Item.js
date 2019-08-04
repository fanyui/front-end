import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import toastr from 'toastr'
import  '../App.css'
import { Form, Grid,Container, Message, Header, Modal, Segment, Divider, Item, Label, Rating, Button, Icon } from 'semantic-ui-react'
import * as actions from '../action/product'
import SuggestedItems from '../common/SuggestedItems'
import StripeCheckout from "react-stripe-checkout";
import helper from '../utils/helper'
import LoginSignup from '../common/LoginSignup'

  const IMG_URL = "../asset/images/product_images/"

function mapStateToProps(state) {
	return {
		// typically this will be the mapping
		token: "xdkdihj",
		details: state.product.detail,
		reviews: state.product.reviews
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actions, dispatch);
}
class ItemDetail extends Component{
	constructor(props){
		super(props)
		this.state = {
			id: props.match.params.id,
			color: "red",
			size:'M',
			quantity: 1,
			rating:0,
			review: "",
			requiresAuth: false,
			maxRating: 5,
			inCart: false,
		}
	}
	componentDidMount(){
		window.scrollTo(0,0)
		this.props.getProductById(this.state.id)
		this.props.getProductReviews(this.state.id)
	}
	componentWillReceiveProps(nextProps) {
		if (this.state.id !== nextProps.match.params.id) {

			this.props.getProductById(nextProps.match.params.id)
			this.props.getProductReviews(this.state.id)
			this.setState({
				id:nextProps.match.params.id 
			});

		}
	}
	// componentWillRecieveProps(nextProps){
	// 	console.log(`differenceis old ${this.props.match.params.id} and new is ${nextProps.match.params.id} ` )
	// 	if (this.props.match.params.id != nextProps.match.params.id) {
	// 		this.props.getProductById(nextProps.match.params.id)

	// 	}
	// }
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
	handleColorSelect = (color) =>{
		console.log("you selected the color", color)
		this.setState({
			color:color 
		});
	}
	handleSetSize =(size) =>{
		this.setState({
			size:size 
		});
	}
	handleAddReview = () => {
		let token = localStorage.getItem('token')
		if(token ===null || token === ""){
			this.setState({
				requiresAuth: true
			});
		}
		else{
			let id = this.state.id;
			let body = { 
				rating: this.state.rating,
				review: this.state.review,
				}
			this.props.handleAddProductReview(id, JSON.stringify(body))
		}
	}

	handleAddToCart = () => {
		toastr.info('Are you the 6 fingered man?')
		//if (helper.isloggedin()){
			let attributes = `quantity=${this.state.quantity} color is ${this.state.color} and size is ${this.state.size}`
			this.props.checkAndAddToCart(this.state.id,attributes )
			console.log("Adding item to cart")
			this.setState({
				inCart: true
			});
		// }
		// else{
			console.log("Login t")
		//}
	}
	close = () => this.setState({ requiresAuth: false })
	handlechange = (e) => {
		const state = this.state
		state[e.target.name] = e.target.value
		this.setState(state);
	}
	handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })
	 onToken = (token) => {
	 	console.log("tken is ",token.id);

  	    const body = {
		      amount: 999,
		      stripeToken: token.id,
		      description: "Testing the api",
		      order_id: 1,
		  };
    fetch('http://127.0.0.1:3000/api/v1/stripe/payment', {
      method: 'POST',
		headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		// 'Authorization': 'Basic Auth ' + Base64.encode("harisu" + ":" + "test123"),

		},
		body: JSON.stringify(body),
    }).then(response => {
      response.json().then(data => {
      	console.log(data)
        alert(`We are in business,`);
      });
    });
  }

	render(){
		console.log("id from state is ", this.state.id)
		  const publishableKey = "pk_test_YDYiUEaPSVpab6WIedQzmM9k00ZTyWBTU7";

		return(
			<Container>
			<Segment.Group stacked>

			<Segment stacked computer={3} mobile={6} tablet={9} padded='very'> 
				<Item.Group stackable>
				    <Item stackable>
				    { this.props.details &&	<Item.Image wrapped size='big' src={`${IMG_URL}/${this.props.details[0].image}`} />
				}
				      <Item.Content>
				      		<Rating icon='star' onRate={this.handleRate}  defaultRating={3} maxRating={5} />

				        <Item.Header as='a'>{ this.props.details && this.props.details[0].name}</Item.Header>
				        <Item.Meta>
				          <span className='price'>$1200</span>
				        </Item.Meta>
				        <Item.Description>{ this.props.details && this.props.details[0].description}</Item.Description>
				        <Item.Extra>
				          <Label size="small" >Color</Label>
				          <br />
				          <Label.Group size="mini" circular>
				          <Label  onClick={() => this.handleColorSelect("red")} color="red"></Label>
				          <Label  onClick={() => this.handleColorSelect("blue")} color="blue"></Label>
				          <Label as="a" onClick={() => this.handleColorSelect("green")} color="green"></Label>
				          <Label as="a" onClick={() => this.handleColorSelect("yellow")} color="yellow"></Label>
				          <Label as="a" onClick={() => this.handleColorSelect("brown")} color="brown"></Label>
				          <Label as="a" onClick={() => this.handleColorSelect("pink")} color="pink"></Label>
				          <Label as="a"  onClick={() => this.handleColorSelect("purple")} color="purple"></Label>
				          <Label as="a" onClick={() => this.handleColorSelect("black")} color="black"></Label>
				          <Label as="a" onClick={() => this.handleColorSelect("violet")} color="violet"></Label>
				          <Label as="a" onClick={() => this.handleColorSelect("olive")} color="olive"></Label>
				          <Label as="a" onClick={() => this.handleColorSelect("teal")} color="teal"></Label>
				          
				          </Label.Group>
				        </Item.Extra>
				    {/* section for  item sizes  */}
				        <Item.Extra>
				          <Label size="small" >Size</Label>
				          <br />
				          <Label.Group >
				          <Label as="a" onClick={() => this.handleSetSize("XS")}  color={this.state.size === "XS" ? "red" : "" } >XS</Label>
				          <Label as="a" onClick={() => this.handleSetSize("S")} color={this.state.size === "S" ? "red" : "" } >S</Label>
				          <Label as="a" onClick={() => this.handleSetSize("M")}  color={this.state.size === "M" ? "red" : "" } >M</Label>
				          <Label as="a" onClick={() => this.handleSetSize("L")}  color={this.state.size === "L" ? "red"  : ""}>L</Label>
				          <Label as="a" onClick={() => this.handleSetSize("XL")}  color={this.state.size === "XL" ? "red" : "" } >XL</Label>
				          <Label as="a" onClick={() => this.handleSetSize("XXL")}  color={this.state.size === "XXL" ? "red" : "" } >XXL</Label>
				          </Label.Group>
				        </Item.Extra>
				    {/* section for  item QUANTIFY  */}
				        <Item.Extra>
				          <Label size="small" >Quantify</Label>
				          <br />
				          <Label.Group circular>
				          <Label as="a" onClick={() => this.handleSetQuantify("subtract")} >-</Label>
				          <Label color="white"  >{Number(this.state.quantity)}</Label>
				          <Label as="a" onClick={() => this.handleSetQuantify("add")}>+</Label>
				          </Label.Group>
				        </Item.Extra>

				        <Item.Extra>
				          <Button onClick={() => this.handleAddToCart()} color="red">
				            {this.state.inCart ? <i>Item Already In Cart</i>: <i>Add to cart</i> }
				            <Icon name='right chevron' />
				          </Button>
				        </Item.Extra>
				        {this.state.inCart &&   <Message
						    success
						    header=' Item was added to cart successfully'
						    content='To change the add another of this open your cart and increase quantity'
						  />}
				      </Item.Content>
				    </Item>

				  </Item.Group>
				</Segment>

				<Segment secondary>
				   <Header as="h2">
		            Product Review
		           </Header>
	<Grid columns={2} stackable textAlign='center'>
	{  this.props.reviews &&  Array.isArray(this.props.reviews) && this.props.reviews.map((review,key) => (

      <Grid.Row verticalAlign='middle'>
        <Grid.Column>
        	<Rating icon='star' defaultRating={review.rating} maxRating={5} />
        	<br />
          <Header icon>
            {review.name}
          </Header>
        </Grid.Column>

        <Grid.Column>
          <Segment basic>
          	<p>{review.review} 
          	</p>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    )) 
	}
    </Grid>		
		     <Divider />
		      <Form> 
		        <Form.Input name="name" fluid label='Nick name' placeholder='choose a nick name' />

		        <Form.TextArea name="review" onChange={this.handlechange} label='Review' placeholder='Tell us more about what you think...' />
		                  <label>Your review must be at least 50 characters long</label>

		        <Form.Checkbox label='I agree to the Terms and Conditions' />
		        
        	<label> Overall Rating </label> <Rating  icon='star' onRate={this.handleRate} defaultRating={3} maxRating={5} />
        		<br />
		        <Button onClick={() => this.handleAddReview()} color="red">Submit</Button>
		      </Form>

    		</Segment>
			</Segment.Group>
		{/* you may also like  */}
		<SuggestedItems />

		<Modal size="tiny" open={this.state.requiresAuth} onClose={this.close}>
          <Modal.Header>Create Your Account | Login </Modal.Header>
          <Modal.Content>
          <LoginSignup />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>close</Button>
            <Button onClick={this.close} positive icon='checkmark' labelPosition='right' content='OK' />
          </Modal.Actions>
        </Modal>
			</Container>
	)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);

