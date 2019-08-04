import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

const initialState = { isLoading: false, results: [], value: '' }

const getResults = () =>
  _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 100, 2, '$'),
  }))

const source = _.range(0, 3).reduce((memo) => {
  const name = faker.hacker.noun()

  // eslint-disable-next-line no-param-reassign
  memo[name] = {
    name,
    results: getResults(),
    // results: this.state.tempresults,
  }

  return memo
}, {})

export default class SearchCustom extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => {
    // persist the  content or redirect if you find anything
    console.log("I am supposed to redirect you")
    // return <Redirect to={`/product/${result.product_id}`}/>
    this.setState({ value: result.title, selected_product: result.product_id, searchresult: true })
  }
 handleSearchChange = (e, { value }) => {
      this.setState({ isLoading: true, value, results: null })
        console.log("haneling search change here ", value)
        fetch(`https://nodebackendreactfrontend.herokuapp.com/api/v1/product/search?q=${value}`, {
          method: 'GET',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          },
        })
        .then((response) => response.json())
        .then((resp) =>{
          if( resp.length>0) {

            console.log("i have content now")
  
          
          let result = resp.map((row, k) =>({
          product_id: row.product_id,
          title: row.name,
          description: row.description,
          image: '/asset/images/product_images/'+row.thumbnail,
          price: row.discounted_price
        }));
           let final = { "product": {
              "name": "product",
              "results": result,
                }
              }
          this.setState({
           isLoading: false,
            results: final
          });
          console.log("final is ", final)
        }
          this.setState({
            isLoading: false
          });
           console.log("resulst of search is", resp)
        })
   }
  
  render() {
    const { isLoading, value, results, searchresult, selected_product } = this.state
    if (searchresult) {
      this.setState({
        searchresult: null,
      });
      return <Redirect to={`/product/${selected_product}`}/>
    }
    return (

          <Search
            category
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            {...this.props}
          />
    )
  }
}
