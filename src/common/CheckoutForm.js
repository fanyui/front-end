import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
      let {token} = await this.props.stripe.createToken({name: "Name"});

    // User clicked submit
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

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);