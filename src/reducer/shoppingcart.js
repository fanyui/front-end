import { FETCH_CART_ITEMS_REQUEST, FETCH_CART_ITEMS_SUCCESS, FETCH_CART_ITEMS_FAILURE, FETCH_CART_TOTAL_AMOUNT  } from '../constant'


export default function product(state = [], action) {
	switch(action.type){
		case FETCH_CART_ITEMS_SUCCESS: 

			return  Object.assign({}, state, {
		        cart_items: [
		          ...action.payload
		        ],
		        error: false,
		        requesting: false
		     })


		case FETCH_CART_ITEMS_REQUEST:
			return  Object.assign({}, state, {
	        requesting: true,
	        error: false
	        })

		case FETCH_CART_ITEMS_FAILURE:
			return  Object.assign({}, state, {
	        error: true,
	        msg: action.payload,
	        requesting: false
	        })
		case FETCH_CART_TOTAL_AMOUNT:
			return  Object.assign({}, state, {
	        cart_total_amt: action.payload[0],
	        })


		default: 
			return state
	}
}