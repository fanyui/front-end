import React, { Component } from 'react'
import { Menu , Container} from 'semantic-ui-react'
import {Link } from 'react-router-dom'
import SearchCustom from './common/SearchCustom'
import LoginSignup from './common/LoginSignup'
export default class Nav extends Component {
  state = { activeItem: 'home', open: false }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  close = () => this.setState({ open: false })

  show = dimmer => () => this.setState({
    dimmer, open: true
  });
  render() {
    const { activeItem , open, dimmer } = this.state

    return (
      <Container>
      <Menu attached='top' stackable secondary>
        <Menu.Item as={Link} to='/'
          name='shophere'
           active={activeItem === 'shophere'}
           onClick={this.handleItemClick} />
        <Menu.Item
          as={Link} to='/women'
          name='women'
          active={activeItem === 'women'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link} to='/kids'
          name='kids'
          active={activeItem === 'kids'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link} to='/men'
          name='men'
          active={activeItem === 'men'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link} to='/shoes'
          name='shoes'
          active={activeItem === 'shoes'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link} to='/brand'
          name='brands'
          active={activeItem === 'brands'}
          onClick={this.handleItemClick}
        />

          <Menu.Item>
            <SearchCustom />
          </Menu.Item>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          /><Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={this.show('blurring')}
          />
      </Menu>

      <LoginSignup dimmer = {dimmer} open={open} close={this.close} />
            
      </Container>
    )
  }
}