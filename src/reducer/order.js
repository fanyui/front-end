import { FETCH_ALL_ORDER, ADD_ORDER, RECEIVE_ORDER } from '../constant'

export default function product(state = { }, action) {
	switch(action.type){
		case RECEIVE_ORDER: 
			return {
				...state,
				...action.order,
			}

		case FETCH_ALL_ORDER: 
			return {
				...state,
				...action.order,
			}


		case ADD_ORDER:
			const { order } = action

			return{
				...state,
				order,
			}
		default: 
			return state
	}
}