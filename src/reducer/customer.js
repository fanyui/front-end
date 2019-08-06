import {  CREATE_CUSTOMER_REQUEST, 
	FETCH_CUSTOMERS, 
	CREATE_CUSTOMER_SUCCESS, 
	CREATE_CUSTOMER_FAILURE,
	CUSTOMER_LOGIN_REQUEST, 
	CUSTOMER_LOGIN_SUCCESS,
	UPDATE_CUSTOMER_SUCCESS, 
	UPDATE_CUSTOMER_REQUEST,
	UPDATE_CUSTOMER_FAILURE,
	CUSTOMER_LOGIN_FAILURE,
	CUSTOMER_LOGOUT_SUCCESS,
	CUSTOMER_LOGOUT_REQUEST,
	CUSTOMER_SHIPPING_REGIONS_REQUEST,
	CUSTOMER_SHIPPING_REGIONS_SUCCESS,
	CUSTOMER_SHIPPING_REGIONS_FAILURE

} from '../constant'


export default function customer(state = [], action) {
	switch(action.type){
		case CREATE_CUSTOMER_SUCCESS: 
			return  Object.assign({}, state, {
		        customer: action.payload,
		        token: action.payload.accessToken,

		        
		     })
     	case FETCH_CUSTOMERS: 
			return  Object.assign({}, state, {
		        customers: [
		          ...action.payload
		        ]
		     })

		case CREATE_CUSTOMER_REQUEST: 
			return {
				...state,
				...action.payload,
			}

		case CREATE_CUSTOMER_FAILURE: 
			return Object.assign({}, state, {
				errors: action.payload
			})

		case CUSTOMER_LOGIN_REQUEST:
			return  Object.assign({}, state, {
	        loggingIn: true,
	        })
		case CUSTOMER_LOGIN_SUCCESS:
			return  Object.assign({}, state, {
	        token: action.payload,
	        loggingIn: false
	        })
		case CUSTOMER_LOGIN_FAILURE:
			return  Object.assign({}, state, {
	        errors: action.payload,
	        loggingIn: false,
	        })
		case CUSTOMER_LOGOUT_REQUEST:
			return  Object.assign({}, state, {
	        loggingOut: true,
	        })
		case CUSTOMER_LOGOUT_SUCCESS:
			return  Object.assign({}, state, {
	        token: null,
	        loggingOut: false,
	        })
//customer shipping information 
		case CUSTOMER_SHIPPING_REGIONS_SUCCESS: 
			return  Object.assign({}, state, {
		        shippingregions: action.payload,
		        fetching: false
		        
		     })
		case CUSTOMER_SHIPPING_REGIONS_REQUEST: 
			return  Object.assign({}, state, {
		        fetching: true
		        
		     })
		case CUSTOMER_SHIPPING_REGIONS_FAILURE: 
			return  Object.assign({}, state, {
		        fetching: true,
		        errors: action.payload
		        
		     })
		case UPDATE_CUSTOMER_SUCCESS: 
			return  Object.assign({}, state, {
		        customer: action.payload,
		        updating: false
		        
		     })
		case UPDATE_CUSTOMER_REQUEST: 
			return  Object.assign({}, state, {
		        updating: true
		        
		     })
		case UPDATE_CUSTOMER_FAILURE: 
			return  Object.assign({}, state, {
		        updating: true,
		        errors: action.payload
		        
		     })

		default: 
			return state
	}
}