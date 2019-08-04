import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import * as actions from '../action/product'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import helper from '../utils/helper'

function mapStateToProps(state) {
  return {
    // typically this will be the mapping
    categories: state.product.category,
    departments: state.product.department
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(actions, dispatch);
}
 class MenuVertical extends Component {

    componentDidMount(){
      this.props.listCategories()
      this.props.listDepartments()
    }

    componentWillReceiveProps(nextProps){
      console.log("props received are ", nextProps.categories)
    }
  state = {}
  handleItemClick = (e, { name, id }) => {
    this.setState({ activeItem: name })
    console.log("Product id is ", id )
    this.props.fetchProductInCategory(id )
  }
  handleItemClickDepartment = (e, { name, id }) => {
    this.setState({ activeItem: name })
    console.log("Product id is ", id )
    this.props.fetchProductInDepartment(id )
  }

  handleViewAll = (e, { name}) => {
    this.setState({ activeItem: name })
      this.props.handleInitialData()
  }
  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical stackable>
        <Menu.Item>
          <Menu.Header>All</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='View All'
              active={activeItem === 'View All'}
              onClick={this.handleViewAll}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Categories</Menu.Header>

          <Menu.Menu>
            { 
              Array.isArray(this.props.categories) && this.props.categories.map((category,key) => (
                    <Menu.Item
                      key = {key}
                      id = { category.category_id}
                      name={category.name}
                      active={activeItem === category.name}
                      onClick={this.handleItemClick}
                    />
          ))}
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Department</Menu.Header>

          <Menu.Menu>
          {
              Array.isArray(this.props.departments) && this.props.departments.map((department,key) => (
            <Menu.Item
              key = {key}
              id = {department.department_id}
              name={department.name}
              active={activeItem === department.name}
              onClick={this.handleItemClickDepartment}
            />
            ))
          }
                      </Menu.Menu>
        </Menu.Item>



        <Menu.Item>
          <Menu.Header>Support</Menu.Header>

          <Menu.Menu>
            <Menu.Item name='email' active={activeItem === 'email'} onClick={this.handleItemClick}>
              E-mail Support
            </Menu.Item>

            <Menu.Item name='faq' active={activeItem === 'faq'} onClick={this.handleItemClick}>
              FAQs
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuVertical);
