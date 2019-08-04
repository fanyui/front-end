import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import  '../App.css'
import { Grid, Segment, Header,Pagination, Divider, Container, Button, Icon } from 'semantic-ui-react'
import {ProductCard} from '../common/cards'
import StripCard from '../common/StripCard'
// import * as actions from '../action'
import * as actions from '../action/product'
import {Link } from 'react-router-dom'
import MenuVertical from '../common/MenuVertical'
function mapStateToProps(state) {
	return {
		products: state.product.products,
		// typically this will be the mapping
		token: "xdkdihj"
	}
}

// function mapDispatchToProps(dispatch){
// 	return bindActionCreators(actions, dispatch);
// }
/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Afayi-tech-Limited'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '1.5em',
      }}
    />
    <Header
      as='h2'
      content='enjoy your stay while it lasts.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1em',
      }}
    />
    <Button as={Link} to='#product' primary size='huge'>
      Explore
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

 class HomePage extends Component{
	constructor(props){
		super(props)
		this.state = {
	    activePage: 1,
	    boundaryRange: 1,
	    siblingRange: 1,
	    showEllipsis: true,
	    showFirstAndLastNav: true,
	    showPreviousAndNextNav: true,
	    totalPages: 0,
	 }
	}

  	handlePaginationChange = (e, { activePage }) => {
	  	this.setState({ activePage })
	  	// fire a call t backend fr fetch f new data
	  	this.props.handleInitialData(activePage)
	}
	componentDidMount() {
		//if homepage fetch default 
		if (this.props.context === "home") {
	       this.props.handleInitialData()
		}
		else if (this.props.context ==="kids" ) {
			// getch for the particular category
		}
		else if (this.props.context ==="men" ) {
			// getch for the particular category
		}

    }


	render(){
		    const {
		      activePage,
		      boundaryRange,
		      siblingRange,
		      showEllipsis,
		      showFirstAndLastNav,
		      showPreviousAndNextNav,
		      totalPages,
		    } = this.state
		return(
			<div>
			{!this.props.context && <Segment  inverted style={{ minHeight: 700, padding: '1em 0em' }}
			>
			<HomepageHeading />

			</Segment>}
			<Segment id="product" style={{ padding: '4em 0em' }} vertical>
				<Grid container stackable verticalAlign='middle'>
				<Grid.Row>
				    <Grid.Column  >
				    	<Grid computer={8} mobile={8} tablet={12}>
				        <Grid.Row>
				        {  this.props.products &&  Array.isArray(this.props.products) && this.props.products.map((product,key) => (

					        <Grid.Column computer={4} mobile={8} tablet={5} key={key}>
							    <ProductCard item ={product} />
							</Grid.Column>
				        	)) 
				    	}
				    	</Grid.Row>
				    	</Grid>
					</Grid.Column>
			    </Grid.Row>

			      <Pagination
		            activePage={activePage}
		            boundaryRange={boundaryRange}
		            onPageChange={this.handlePaginationChange}
		            size='mini'
		            siblingRange={siblingRange}
		            totalPages={this.props.products && this.props.products.length}
		            // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
		            ellipsisItem={showEllipsis ? undefined : null}
		            firstItem={showFirstAndLastNav ? undefined : null}
		            lastItem={showFirstAndLastNav ? undefined : null}
		            prevItem={showPreviousAndNextNav ? undefined : null}
		            nextItem={showPreviousAndNextNav ? undefined : null}
				  />
			    </Grid>

			    </Segment>
			    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Instead of focusing on content creation and hard work, we have learned how to master the
          art of doing nothing by providing massive amounts of whitespace and generic content that
          can seem massive, monolithic and worth your attention.
        </p>
        <Button as='a' size='large'>
          Read More
        </Button>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Case Studies</a>
        </Divider>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Did We Tell You About Our Bananas?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
          it's really true. It took years of gene splicing and combinatory DNA research, but our
          bananas can really dance.
        </p>
        <Button as='a' size='large'>
          I'm Still Quite Interested
        </Button>
      </Container>
    </Segment>
			</div>
	)
	}
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
