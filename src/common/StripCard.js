import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class StripCard extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_YDYiUEaPSVpab6WIedQzmM9k00ZTyWBTU7">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default StripCard;