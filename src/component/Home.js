import PropTypes from 'prop-types'
import React, { Component } from 'react'
import MenuVertical from '../common/MenuVertical'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Card,
  Pagination,
  Message
} from 'semantic-ui-react'
import * as actions from '../action/product'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {ProductCard} from '../common/cards'
import SuggestedItems from '../common/SuggestedItems'

function mapStateToProps(state) {
  return {
    products: state.product.products,
    total: state.product.total,
    // typically this will be the mapping
    token: "xdkdihj"
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */


const HomepageHeading = ({ mobile , hideHome }) => (
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
      content='Welcome to the Grade 1 fashion shoping center. Enjoy your stay while it lasts.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1em',
      }}
    />
    <Button onClick = {hideHome} to='#product' primary size='huge'>
      Explore
      <Icon name='right arrow' />
    </Button>
  </Container>
)
HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}




class  HomepageLayout extends React.Component{
  constructor(props){
    super(props)
        this.state = {
      activePage: 1,
      boundaryRange: 1,
      siblingRange: 1,
      showEllipsis: true,
      showFirstAndLastNav: true,
      showPreviousAndNextNav: true,
      totalPages: (this.props.total/20),
      onHome: true,
   }
  }
    componentDidMount(){
      this.setState({
        onHome:true 
      });
      this.props.handleInitialData()
      console.log("with is ", getWidth())

    }
    handlePaginationChange = (e, { activePage }) => {
      this.setState({ activePage })
      // fire a call t backend fr fetch f new data
      this.props.handleInitialData(activePage)
  }

    hideHome = () => this.setState({
      onHome: false
    });
  render(){
    const IMG_URL = "../asset/dress.jpg"

            const {
          activePage,
          boundaryRange,
          siblingRange,
          showEllipsis,
          showFirstAndLastNav,
          showPreviousAndNextNav,
        } = this.state
        const totalPages = Math.ceil(this.props.total/20)
        console.log("before ceil is ", this.props.total)
        console.log("result of ceil ", Math.ceil(this.props.total/20))

    return (

            <div>
      {this.state.onHome && <Segment inverted  style={{ minHeight: 700, padding: '1em 0em', backgroundRepeat: 'repeat-x',  backgroundImage: "url('../asset/images/homeimage.jpg')" }}
      >
      <HomepageHeading hideHome = {this.hideHome} />

      </Segment>}
    <Segment style={{ padding: '1em 0em' }} vertical>
      <Grid container stackable verticalAlign='left'>
        <Grid.Row>
          <Grid.Column width={3}>
           <MenuVertical />
          </Grid.Column>
          <Grid.Column width={11}>

          <Card.Group itemsPerRow={getWidth() > Responsive.onlyMobile.maxWidth ?3 : 1}>
                            {  this.props.products &&  Array.isArray(this.props.products) && this.props.products.map((product,key) => (

                  <ProductCard item ={product} />
                  )) 


              }
            </Card.Group>
            { (this.props.products && this.props.products.length <= 0) && <Message style={{ padding: '3em 1em' }}> No products found </Message>}
          </Grid.Column>

        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>

            {Math.ceil(this.props.total/20) >1 && <Pagination
                activePage={activePage}
                boundaryRange={boundaryRange}
                onPageChange={this.handlePaginationChange}
                size='mini'
                siblingRange={siblingRange}
                // totalPages={this.props.products && ((this.props.products.length) % 21)}
                totalPages={Math.ceil(this.props.total/20)}
                // totalPages={3}
                // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
                ellipsisItem={showEllipsis ? undefined : null}
                firstItem={showFirstAndLastNav ? undefined : null}
                lastItem={showFirstAndLastNav ? undefined : null}
                prevItem={showPreviousAndNextNav ? undefined : null}
                nextItem={showPreviousAndNextNav ? undefined : null}
          /> }

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Guaranteed delivery a"
            </Header>
            <p style={{ fontSize: '1.33em' }}>We have your back and guarantee with a waranty for all purchases</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "I shouldn't have gone with their competitor."
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='/images/avatar/large/nan.jpg' />
              <b>Nan</b> Chief Fun Officer Acme Toys
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
  {/* This is the section for displaying suggested products*/}
                <SuggestedItems />
           
    </Segment>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
    </div>
      )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomepageLayout);



