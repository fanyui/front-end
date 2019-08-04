import { combineReducers } from 'redux'

// import authedUser from './authedUser'
// import users from './user'
import product from './product'
import order from './order'
import customer from './customer'
import shoppingcart from './shoppingcart'

import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
	product,
	order,
	customer,
	shoppingcart,
	loadingBar: loadingBarReducer,
})