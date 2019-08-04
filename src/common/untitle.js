import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import  '../App.css'
import { Grid, Image, Container, Header, Segment, List, Rating } from 'semantic-ui-react'
import {CardExampleCard, CardExampleImageCard} from '../common/cards'
// import * as actions from '../action'
import MenuVertical from '../common/MenuVertical'
function mapStateToProps(state) {
	return {
		// typically this will be the mapping
		token: "xdkdihj"
	}
}

// function mapDispatchToProps(dispatch){
// 	return bindActionCreators(actions, dispatch);
// }
export default class Item extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="ui container">
			<Segment> 
			  <Grid>
			    <Grid.Column width={7}>
			    	<Image wrapped size='large' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />

    			</Grid.Column>
			    <Grid.Column width={9}>
			     

			    	 <Container >
			    	 <Rating icon='star' defaultRating={3} maxRating={5} />
			    	    <Header as='h3'>super Oversized T-shirt with raw sleeves in brown</Header>

			    	<p>
			    	 <Segment>
			    	 	<Header as='h5'>color</Header>

			    	  <List celled horizontal>
					    <List.Item>About Us</List.Item>
					    <List.Item>Contact</List.Item>
					    <List.Item>Support</List.Item>
					  </List>
					  </Segment>
				    	Lorem ipsum dolor sit amet, consectetuer 
				    	Lorem ipsum dolor sit amet, consectetuer
				    	Lorem ipsum dolor sit amet, consectetuer
				    	Lorem ipsum dolor sit amet, consectetuer
				    	Lorem ipsum dolor sit amet, consectetuer
			    	</p>
			    	</Container>

		    	</Grid.Column>
			  </Grid>
			</Segment>>

			
			</div>
	)
	}
}


<Item.Group divided>

			      <Table.Row>
			        <Table.Cell>
			        	<Item>
      					<Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />

				      <Item.Content verticalAlign="middle">

				        <Item.Header as='a'> T-shirt with raw sleeves</Item.Header>
				        <Item.Meta>
				          <span className='price'>$1200</span>
				        </Item.Meta>
				        <Item.Description>Oversized T-shirt with raw sleeves in brown</Item.Description>
				        <Item.Extra>
				        </Item.Extra>
				        </Item.Content>
				        </Item>

			        </Table.Cell>
			        <Table.Cell>Approved</Table.Cell>
			        <Table.Cell>None</Table.Cell>
			      </Table.Row>
			      <Table.Row>
			        <Table.Cell>Jamie</Table.Cell>
			        <Table.Cell>Approved</Table.Cell>
			        <Table.Cell>Requires call</Table.Cell>
			      </Table.Row>
			      <Table.Row>
			        <Table.Cell>Jill</Table.Cell>
			        <Table.Cell>Denied</Table.Cell>
			        <Table.Cell>None</Table.Cell>
			      </Table.Row>
			      </Item.Group>



			      import React from 'react'
import {Button, Container } from 'semantic-ui-react'

class Checkout extends React.Component{
	constructor(props){
		super(props)
		this.state= {

		}
	}

	render() {
		return (
			<div>

			</div>
		);
	}
}

