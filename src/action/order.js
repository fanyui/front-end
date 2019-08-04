import { FETCH_ALL_ORDER, ADD_ORDER, RECEIVE_ORDER } from '../constant'
import { getOrderData } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export function fetchOrderData(){
	return (dispatch) => {
		dispatch(showLoading())
		return getOrderData()
			.then((response) =>{
				dispatch(receiveOrder(response))
				dispatch(hideLoading())
			})
	}
}

// export function handleAddOrder(title, description) {
// 	return (dispatch,getState) => {

// 		dispatch(showLoading())
// 		return saveOrder({
// 			description, 
// 			title,			createAt: new Date(),
//         	updateAt: new Date(),
//         	comments: [],
//         	likes: [],
// 		})
// 		.then((product) => dispatch(addOrder(product)) )
// 		.then(() => dispatch(hideLoading()))
		
		
// 	}
// }

function addOrder( order ){
	return {
		type: ADD_ORDER,
		 order,

	}
}
 function receiveOrder(order) {
	return {
		type: RECEIVE_ORDER,
		order,
	}
}