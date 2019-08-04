import { FETCH_CART_ITEMS_REQUEST, FETCH_CART_ITEMS_SUCCESS, FETCH_CART_ITEMS_FAILURE, FETCH_CART_TOTAL_AMOUNT } from '../constant'
import { get_cart_item, get_cart_total_amount, cart_remove_item, cart_update_item_quantity } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'


function request(req) {
	return {
		type: req,
	}
}
function success(req, payload) {
	return {
		type: req,
		payload,
	}
}
function failure(req, payload) {
	return {
		type: req,
		payload,
	}
}
export function fetchCartItems(cart_id) {
	return (dispatch,getState) => {

		dispatch(request(FETCH_CART_ITEMS_REQUEST))
		return get_cart_item(cart_id)
		.then((response) => dispatch(success(FETCH_CART_ITEMS_SUCCESS, response)) )
		.then(()=> dispatch(cartTotalAmount(cart_id)))
		.then(() => dispatch(hideLoading()))
		.catch(err =>{
			dispatch(failure(FETCH_CART_ITEMS_FAILURE, err))
		})
		
		
	}
}
function cartTotalAmount(cart_id) {
	return (dispatch,getState) => {
		return get_cart_total_amount(cart_id)
		.then((response) => dispatch(success(FETCH_CART_TOTAL_AMOUNT, response)))
	}
}
export function removeItemFromCart(item_id) {
	let cart_id = localStorage.getItem('CART_ID')
	return (dispatch,getState) => {
		return cart_remove_item(item_id)
		.then((response) => dispatch(fetchCartItems(cart_id)))
	}
}

export function updateProductQuantity(item_id, quantity) {
	let cart_id = localStorage.getItem('CART_ID')
	return (dispatch,getState) => {
		return cart_update_item_quantity(item_id, quantity)
		.then((response) => dispatch(fetchCartItems(cart_id)))
	}
}

