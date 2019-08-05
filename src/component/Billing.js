import { Table, Segment, Button, Icon, Container, Form, Checkbox } from 'semantic-ui-react'
import React from 'react'
import StripeCheckout from "react-stripe-checkout";

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../action/customer'
const IMG_URL = "../asset/images/"

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


class Billing extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			order_id: "",
		}
	}
	componentDidMount(){
		let id = localStorage.getItem('order_id')
		this.setState({
			order_id: id
		});
	}


	 onToken = (token) => {
	 	console.log(token.id);

  	    const body = {
		      amount: (parseInt(this.props.total.total_amount) * 100),
		      stripeToken: token.id,
		      description: "Charging from sales of items on tshirt shop",
		      order_id: this.state.order_id,
		      currency: "usd",

		  };
		  console.log( "sending the following to the backend", body)
    fetch('https://nodebackendreactfrontend.herokuapp.com/api/v1/stripe/payment', {
      method: 'POST',
		headers: {
			Accept: 'application/json',
		    'Content-Type': 'application/json',
		},
      body: JSON.stringify(body),
    }).then(response => {
      response.json().then(data => {
      	console.log(data)
        alert(`We are in business,`);
        this.props.handleChangeTab("success")
      });
    });
  }

	render() {
		  const publishableKey = "pk_test_YDYiUEaPSVpab6WIedQzmM9k00ZTyWBTU7";

		return (
			<Segment basic>
			<Segment >
			    <StripeCheckout
			      label="Go Premium" //Component button text
			      name="Afayi Inc" //Modal Header
			      description="Upgrade to a premium account today."
			      panelLabel="Go Premium" //Submit button in modal
			      amount={(parseInt(this.props.total.total_amount) * 100)} //Amount in cents $9.99
			      token={this.onToken}
			      stripeKey={publishableKey}
			      image={`${IMG_URL}/logo.png`} //Pop-in header image
			      billingAddress={false}
			      currency="USD"

				/>

			</Segment>

			<Segment padded  basic>
			  <Container >
			  	<Button onClick={()=>this.props.handleChangeTab("confirm")} color="red" floated='left'>
			  	<Icon name='left chevron' />

	            Order Details
	          </Button>
			  	<Button  onClick={()=>this.props.handleChangeTab("success")} color="red" floated='right'>
	            Confirm
	            <Icon name='right chevron' />
	          </Button>
	          </Container>
			</Segment>
			</Segment>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Billing);

