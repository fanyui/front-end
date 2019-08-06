import PropTypes from 'prop-types'
import React, { Component } from 'react'
import helper from './utils/helper'
import {Link } from 'react-router-dom'
import SearchCustom from './common/SearchCustom'

import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Modal
} from 'semantic-ui-react'
import LoginSignup from './common/LoginSignup'
// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}


/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
 state = { activeItem: 'home', open: false, requiresAuth: false }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  handleLogin = () => this.setState({ requiresAuth: true })
  close = () => this.setState({ requiresAuth: false })

  render() {
    const { children } = this.props
    const { fixed, activeItem, requiresAuth } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
          <Modal size="tiny" open={requiresAuth} onClose={this.close}>
          <Modal.Header>Create Your Account | Login </Modal.Header>
          <Modal.Content>
          <LoginSignup />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>close</Button>
          </Modal.Actions>
        </Modal>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              secondary={!fixed}
              size='small'
              style={{height:'45px'}}
            >
              <Container>
                <Menu.Item as={Link} to='/'
                  name='shophere'
                   active={activeItem === 'shophere'}
                   onClick={this.handleItemClick} />

              <Menu.Item position="right">
                <SearchCustom />
              </Menu.Item>

               
                 {  (helper.isloggedin() ===false) ? 
                  <Menu.Item position='right'>

                    <Button as='a'  onClick={this.handleLogin} inverted={!fixed}>
                      Log in 
                    </Button>
                    <Button onClick={this.handleLogin} inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                      <Button as={Link} to='/cart' circular color='shopping cart' style={{ marginLeft: '0.5em' }} icon='shopping cart' />

                    </Menu.Item>
                    : 
                    <Menu.Item position='right'>
                      <Button  onClick={() => helper.logOut()} circular icon='user circle' style={{ marginLeft: '0.5em' }} />
                      <Button as={Link} to='/cart' circular color='shopping cart' style={{ marginLeft: '0.5em' }} icon='shopping cart' />

                    </Menu.Item>
                  }
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
 state = { activeItem: 'home', open: false, requiresAuth: false }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  handleSidebarHide = () => this.setState({ sidebarOpened: false })
  handleLogin = () => this.setState({ requiresAuth: true })
  close = () => this.setState({ requiresAuth: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened, activeItem, requiresAuth } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >

        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as={Link} to='/'
                  name='shophere'
                   active={activeItem === 'shophere'}
                   onClick={this.handleItemClick} />

              <Menu.Item position="right">
                <SearchCustom />
              </Menu.Item>

               
                 {  (helper.isloggedin() ===false) ? 
                  <Menu.Item position='right'>

                    <Button as='a'  onClick={this.handleLogin} >
                      Log in 
                    </Button>
                    <Button onClick={this.handleLogin} style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>

                    </Menu.Item>
                    : 
                    <Menu.Item position='right'>
                      <Button  onClick={() => helper.logOut()} circular icon='user circle' style={{ marginLeft: '0.5em' }} />
                      <Button as={Link} to='/cart' circular color='shopping cart' style={{ marginLeft: '0.5em' }} icon='shopping cart' />

                    </Menu.Item>
                  }
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                {  (helper.isloggedin() ===false) ? 
                  <Menu.Item position='right'>

                    <Button as='a'  onClick={this.handleLogin} >
                      Log in 
                    </Button>
                    <Button onClick={this.handleLogin} style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                      <Button as={Link} to='/cart' circular color='shopping cart' style={{ marginLeft: '0.5em' }} icon='shopping cart' />
                    </Menu.Item>
                    : 
                    <Menu.Item position='right'>
                      <Button  onClick={() => helper.logOut()} circular icon='user circle' style={{ marginLeft: '0.5em' }} />
                      <Button as={Link} to='/cart' circular color='shopping cart' style={{ marginLeft: '0.5em' }} icon='shopping cart' />
                    </Menu.Item>
                  }

              </Menu>
            </Container>
          </Segment>

          {children}
        </Sidebar.Pusher>

                  <Modal size="tiny" open={requiresAuth} onClose={this.close}>
          <Modal.Header>Create Your Account | Login </Modal.Header>
          <Modal.Content>
          <LoginSignup />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>close</Button>
          </Modal.Actions>
        </Modal>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>

    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}


export default ResponsiveContainer