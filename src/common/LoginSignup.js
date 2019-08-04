import React from 'react'
import {Button, Modal, Segment, Image, Header, Message, Form,Grid, Divider  } from 'semantic-ui-react'
import * as actions from '../action/customer'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import helper from '../utils/helper'

function mapStateToProps(state) {
	return {
		// typically this will be the mapping
		loggingIn: state.customer.loggingIn,
		errors: state.customer.errors,
		token: state.customer.token
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actions, dispatch);
}
class LoginSignup extends React.Component{
	constructor(props){
		super(props)
		this.state= {
			context: true, // this is to decide if we are loggin in or signing up true is login
		}
	}
	handleChangeContext = () => {
		this.setState( prevState => ({
			context: !prevState.context
		}));
	}
	render() {
		     if (helper.isloggedin() || (this.props.token && this.props.token.auth)) {
		       return <Redirect to='/'/>;
		     }
			return (
				<Segment basic >
					{ this.state.context ? <LoginForm loggingIn ={this.props.loggingIn} auth={ this.props.token && this.props.token.auth} handleCustomerLogin ={this.props.handleCustomerLogin} handleChangeContext = {this.handleChangeContext} /> : <SignupForm errors={this.props.errors} handleChangeContext = {this.handleChangeContext} handleCustomerCreate={this.props.handleCustomerCreate} /> }
				</Segment>
			);
	}
}


class LoginForm extends React.Component{
		constructor(props){
		super(props)
		this.state= {
			email: "",
			password: "",
			errors: {
				email: false,
				password: false,
			},
		}
	}
	handlechange = (e) => {
		console.log(`submiting this through event, ${e.target.name} with value ${e.target.value}`)
		const state = this.state
		state[e.target.name] = e.target.value
		this.setState(state);
	}

	handleLogin = () => {
		// this.props.onClose()
				console.log("handling creating of a new user")
		if( !this.validateEmail(this.state.email)){
			this.setState({
		    errors: {
		      ...this.state.errors,
		      email: true,
		    },
			});
		}
			else{
			console.log("handling loggin in a user perform validation and call props")
			// pass the object into the params of the function below
			const body = this.state
			this.props.handleCustomerLogin( body)
		}
	}
	validateEmail (email) {
	    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	    return re.test(email)
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
	render(){
		return (
			 <Grid textAlign='center' style={{ height: '60vh' }} verticalAlign='middle'>
			    <Grid.Column style={{ maxWidth: 450 }}>
			      <Header as='h2' color='red' textAlign='center'>
			        <Image src='/logo.png' /> Log-in to your account
			      </Header>
			      <Form size='large'>
			        <Segment stacked>
			        { this.props.auth==false &&<Message color="red">
			          Invalid Email or password
			        </Message>
			    	}

			          <Form.Input onBlur={this.handleOnBlur} error = {this.state.errors.email }  fluid onChange={this.handlechange} name="email"  icon='user' iconPosition='left' placeholder='E-mail address' />
			          <Form.Input
			            fluid
			            icon='lock'
			            onBlur={this.handleOnBlur}
			            error = {this.state.errors.password } 
			            iconPosition='left'
			            placeholder='Password'
			            type='password'
			            onChange={this.handlechange}
			            name="password"
			          />
			    	<div  class={this.props.loggingIn ? "ui active centered inline loader" : "ui centered inline loader"} ></div>

			          <Button color='red' onClick = {() => this.handleLogin()} fluid size='large'>
			            Login
			          </Button>
			        </Segment>
			      </Form>
			      <Message>
			        New to us? <a color="red" onClick = {() => this.props.handleChangeContext()} href='#'>Sign Up</a>
			      </Message>
			    </Grid.Column>
			  </Grid>
		)
	}
 
}

class SignupForm extends React.Component {
		constructor(props){
		super(props)
		this.state = {
			email: "",
			password: "",
			name: "",
			confirm: "",
			errors: {
				email: false,
				password: false,
				name: false,
			},
		}
	}
	handlechange = (e) => {
		console.log(`submiting this through event, ${e.target.name} with value ${e.target.value}`)
		const state = this.state
		state[e.target.name] = e.target.value
		this.setState(state);
	}

	handleCreateCustomer =() => {
		console.log("handling creating of a new user")
		if( !this.validateEmail(this.state.email)){
			this.setState({
		    errors: {
		      ...this.state.errors,
		      email: true,
		    },
			});
		}
		else{
			const body = this.state;
			this.props.handleCustomerCreate(body)
			// validate the body and forward the request
			// this.props.handleCustomerCreate(body)
			}
	}
	validateEmail (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
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
	render(){
		return (
			<Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
			    <Grid.Column style={{ maxWidth: 450 }}>
			      <Header as='h2' color='red' textAlign='center'>
			        <Image src='/logo.png' /> Create  your account
			      </Header>
			      <Form size='large'>
			        <Segment stacked>
			       { this.props.errors  &&<Message color="red">
			          this.props.errors
			        </Message>
			    	}
			          <Form.Input fluid onBlur={this.handleOnBlur} error = {this.state.errors.email }  onChange={this.handlechange} name="email"  icon='mail' iconPosition='left' placeholder='E-mail address' />
			          <Form.Input fluid onBlur={this.handleOnBlur} error = {this.state.errors.name} onChange={this.handlechange} name="name"  icon='user' iconPosition='left' placeholder='Name ' />
			          <Form.Input
			            fluid
			            onBlur={this.handleOnBlur}
			            error = {this.state.errors.password}
			            icon='lock'
			            iconPosition='left'
			            placeholder='Password'
			            type='password'
			            onChange={this.handlechange}
			            name="password"
			          />
			          <Form.Input
			            fluid
			            onBlur={this.handleOnBlur}
			            error = {this.state.errors.password} 
			            icon='lock'
			            iconPosition='left'
			            placeholder='Password'
			            type='password'
			            onChange={this.handlechange}
			            name="confirm"
			          />

			          <Button color='red' onClick = {() => this.handleCreateCustomer()} fluid size='large'>
			            Sign Up
			          </Button>
			        </Segment>
			      </Form>
			      <Message>
			        Already a member? <a onClick = {() => this.props.handleChangeContext()} href='#'>Login</a>
			      </Message>
			    </Grid.Column>
			  </Grid>

			)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginSignup);
