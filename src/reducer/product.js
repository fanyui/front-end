import {
 FETCH_ALL_PRODUCT,
 FETCH_PRODUCT_REQUEST,
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

export default function product(state = [], action) {
	switch(action.type){
		case  FETCH_PRODUCT_REQUEST:
			return  Object.assign({}, state, {
	        requesting: true,
	        errors: false,
	        })
		case RECEIVE_PRODUCT: 
			// return [
			// 	...state,
			// 	...action.product,
			// ]
			return  Object.assign({}, state, {
				requesting: false,

		        products: [
		          ...action.product.product
		        ],
		        total: action.product.row,
		     })

		case FETCH_ALL_PRODUCT: 
			return {
				...state,
				...action.product,
			}


		case ADD_PRODUCT:
			const { product } = action

			return{
				...state,
				product,
			}

		case RECEIVE_PRODUCT_DETAIL:
			return  Object.assign({}, state, {
	        detail: action.detail
	        })

		case GET_CART_ID:
			return  Object.assign({}, state, {
	        cart_id: action.id.cart_id
	        })


		case ADD_PRODUCT_REVIEW_REQUEST:
			return  Object.assign({}, state, {
	        requesting: true,
	        errors: false,
	        })

		case ADD_PRODUCT_REVIEW_SUCCESS:
			return  Object.assign({}, state, {
	        requesting: false,
	        errors: false
	        })

		case ADD_PRODUCT_REVIEW_FAILURE:
			return  Object.assign({}, state, {
	        errors: action.payload,
	        requesting: false,
	        })

		case FETCH_CATEGORY_REQUEST:
			return  Object.assign({}, state, {
	        errors: action.payload,
	        fetchingCategory: false,
	        })
	        
		case FETCH_CATEGORY_FAILURE:
			return  Object.assign({}, state, {
	        errors: action.payload,
	        fetchingCategory: false,
	        })
	        
		case FETCH_CATEGORY_SUCCESS:
			return  Object.assign({}, state, {
	        category: action.payload,
	        fetchingCategory: false,
	        })
		case FETCH_DEPARTMENT_REQUEST:
			return  Object.assign({}, state, {
	        errors: action.payload,
	        fetchingDEPARTMENT: false,
	        })
	        
		case FETCH_DEPARTMENT_FAILURE:
			return  Object.assign({}, state, {
	        errors: action.payload,
	        fetchingDepartment: false,
	        })
	        
		case FETCH_DEPARTMENT_SUCCESS:
			return  Object.assign({}, state, {
	        department: action.payload,
	        fetchingDepartment: false,
	        })

		case FETCH_PRODUCT_REVIEW_SUCCESS:
			return  Object.assign({}, state, {
	        reviews: action.payload,
	        })


		default: 
			return state
	}
}