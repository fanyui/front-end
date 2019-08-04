import { FETCH_ALL_PRODUCT,
 ADD_PRODUCT,
 RECEIVE_PRODUCT, 
 FETCH_PRODUCT_BY_ID, 
 RECEIVE_PRODUCT_DETAIL, 
 ADD_PRODUCT_TO_CART,
 GET_CART_ID,
 ADD_PRODUCT_REVIEW_REQUEST,
 ADD_PRODUCT_REVIEW_SUCCESS,
 ADD_PRODUCT_REVIEW_FAILURE,
 FETCH_CATEGORY_REQUEST,
 FETCH_CATEGORY_FAILURE,
 FETCH_CATEGORY_SUCCESS,
 FETCH_DEPARTMENT_REQUEST,
 FETCH_DEPARTMENT_FAILURE,
 FETCH_DEPARTMENT_SUCCESS,
 FETCH_PRODUCT_REVIEW_SUCCESS
  } from '../constant'
import { 
saveProduct, 
getInnitalData,
 get_product_by_id, 
 add_product_to_cart , 
 generate_cart_id, 
 add_product_review,
 list_product_reviews,
 list_categories,
 list_departments,
 fetch_product_in_category,
 fetch_product_in_department

} from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { fetchCartItems } from './shoppingcart'

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

export function handleInitialData( page =1, limit=20, description_length=200){
	console.log( `page is ${page} limit ${limit} description_length is ${description_length} `)
	return (dispatch) => {
		dispatch(showLoading())
		return getInnitalData( page, limit, description_length)
			.then((response) =>{
				dispatch(receiveProduct(response))
				dispatch(hideLoading())
			})
	}
}
export function fetchProductInCategory( category){
	return (dispatch) => {
		dispatch(showLoading())
		return fetch_product_in_category(category)
			.then((response) =>{
				dispatch(receiveProduct(response))
				dispatch(hideLoading())
			})
	}
}

export function fetchProductInDepartment( departement){
	return (dispatch) => {
		dispatch(showLoading())
		return fetch_product_in_department(departement)
			.then((response) =>{
				dispatch(receiveProduct(response))
				dispatch(hideLoading())
			})
	}
}

export function handleAddProduct(title, description) {
	return (dispatch,getState) => {

		dispatch(showLoading())
		return saveProduct({
			description, 
			title,
			createAt: new Date(),
        	updateAt: new Date(),
        	comments: [],
        	likes: [],
		})
		.then((product) => dispatch(request(ADD_PRODUCT, product)) )
		.then(() => dispatch(hideLoading()))
		
		
	}
}


 function receiveProduct(product) {
	return {
		type: RECEIVE_PRODUCT,
		product,
	}
}
 function receiveProductDetails(detail) {
	return {
		type: RECEIVE_PRODUCT_DETAIL,
		detail,
	}
}


export function getProductById(id){
	return (dispatch) => {
		dispatch(showLoading())
		return get_product_by_id(id)
			.then((response) =>{
				dispatch(receiveProductDetails(response))
				dispatch(hideLoading())
			})
	}
}
export function checkAndAddToCart(product_id, attributes){
	let cart_id = localStorage.getItem('CART_ID')
	if ( cart_id === null || cart_id === "") { //cart id is null create a differnt ond before adding the product
		return(dispatch) => {
			return generate_cart_id()
					.then((response) =>{
						dispatch(generateCartId(response))
						dispatch( addToCart(product_id, attributes, response))
					})
		}
	}
	else{
		return addToCart(product_id, attributes, cart_id)
	}
}

function addToCart(product_id, attributes, cart_id) {
		console.log("cart id id ", cart_id)
		let object = { product_id: product_id, 
						cart_id: cart_id,
						attributes: attributes,
					}
		return (dispatch) => {
		dispatch(showLoading())
		return add_product_to_cart(object)
			.then((response) =>{
				// dispatch(receiveProductDetails(response))
				dispatch(fetchCartItems(cart_id))
				dispatch(hideLoading())
			})
	}
}
//generate the cart id and set it to the store for further usage
function generateCartId(id) {
		localStorage.setItem('CART_ID', id.cart_id)
		return {
		type: GET_CART_ID,
		id
	}
}


// Add product reviews 
export function handleAddProductReview(product_id,object) {
	return (dispatch,getState) => {

		dispatch(request(ADD_PRODUCT_REVIEW_REQUEST))
		return add_product_review(product_id, object)
		.then((response) => dispatch(success(ADD_PRODUCT_REVIEW_SUCCESS, response)) )
		.catch(err => {
			dispatch(failure(ADD_PRODUCT_REVIEW_FAILURE, err))
		})
		
		
	}
}
//handle get product reviews
export function getProductReviews(product_id){
	return (dispatch) => {
		return list_product_reviews(product_id)
			.then((response) =>{
				dispatch(success(FETCH_PRODUCT_REVIEW_SUCCESS, response))
			})
	}
}

// export function handleSearchProduct(query){
// 	return (dispatch) => {
// 		dispatch(showLoading())
// 		return search_product_async(id)
// 			.then((response) =>{
// 				dispatch(receiveProductDetails(response))
// 			})
// 	}
// }

export function listCategories(){
	return (dispatch) => {
		dispatch(request(FETCH_CATEGORY_REQUEST))
		return list_categories()
			.then((response) =>{
				dispatch(success(FETCH_CATEGORY_SUCCESS, response))
			})
			.catch(err => {
			dispatch(failure(FETCH_CATEGORY_FAILURE, err))
		})
	}
}
export function listDepartments(){
	return (dispatch) => {
		dispatch(request(FETCH_DEPARTMENT_REQUEST))
		return list_departments()
			.then((response) =>{
				dispatch(success(FETCH_DEPARTMENT_SUCCESS, response))
			})
			.catch(err => {
			dispatch(failure(FETCH_DEPARTMENT_FAILURE, err))
		})
	}
}
