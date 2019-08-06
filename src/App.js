import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import  { connect } from 'react-redux'
import  { bindActionCreators } from 'redux'
import Nav from  './Nav'
import ResponsiveContainer from  './Navigation'
import LoadingBar from 'react-redux-loading'
import HomePage from './component/HomePage'
import Item from './component/Item'
import Cart from './component/Cart'
import Checkout from './component/Checkout'
import Footer from './common/Footer'
import LoginSignup from './common/LoginSignup'
import * as actions from './action/product'
import Home from './component/Home'
 class  App extends Component {
    componentDidMount() {
      this.props.handleInitialData()
    }

  render(){
  return (
    <Router>
    <Fragment> 
    <ResponsiveContainer >
      <LoadingBar />
              {/*<Route path ='/' exact render={(props) => <HomePage {...props}  context="home" />} />*/}
              <Route path ='/' exact component={Home} />
              <Route path = '/men' render={(props) => <HomePage {...props} context="men" />} />
              <Route path = '/cart' component = { Cart }/>
              {/*<Route path = '/women' component = { Cart }/> */}

              <Route path = '/kids' render={(props) => <HomePage {...props} context="kids" />} />
              <Route path = '/checkout' component = { Checkout }/>
              <Route path = '/login' component = { LoginSignup }/>
              <Route path = '/product/:id' component = { Item }/>

              {/*<Route path = '/kids' component = { Wemen }/>
              <Route path = '/shoes' component = { Wemen }/> */}
    </ResponsiveContainer>
          </Fragment>

      </Router>
  );
}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}
export default connect(null, mapDispatchToProps)(App);
