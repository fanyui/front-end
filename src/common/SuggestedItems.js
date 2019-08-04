import React from 'react'
import { Grid, Card, Header, Segment, Container} from 'semantic-ui-react'
import { CardExampleImageCard} from './cards'
class SuggestedItems extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			      <Grid container stackable verticalAlign='medium'>
        <Grid.Row>
          <Grid.Column width={14}>        
            <Container text>
			<Segment>
				<Header as="h2"> You may also like </Header>
          		<Card.Group itemsPerRow={5}>
						    <CardExampleImageCard />
						    <CardExampleImageCard />
						    <CardExampleImageCard />
						    <CardExampleImageCard />
				</Card.Group>

			</Segment>
		 </Container>
            </Grid.Column>
        </Grid.Row>
      </Grid>
		)
	}
}


export default SuggestedItems;