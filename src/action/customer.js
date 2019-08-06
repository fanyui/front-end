import {  CREATE_CUSTOMER_REQUEST, 
	CREATE_CUSTOMER_SUCCESS, 
	CREATE_CUSTOMER_FAILURE,
	CUSTOMER_LOGIN_REQUEST, 
	CUSTOMER_LOGIN_SUCCESS ,
	CUSTOMER_LOGOUT_REQUEST,
	CUSTOMER_LOGOUT_SUCCESS,
	UPDATE_CUSTOMER_SUCCESS, 
	UPDATE_CUSTOMER_REQUEST,
	UPDATE_CUSTOMER_FAILURE,
	CUSTOMER_LOGIN_FAILURE,

	CUSTOMER_SHIPPING_REGIONS_REQUEST,
	CUSTOMER_SHIPPING_REGIONS_SUCCESS,
	CUSTOMER_SHIPPING_REGIONS_FAILURE
} from '../constant'
import { save_customer, customer_login, update_customer, get_customer_shipping_regions} from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import React from 'react'
// req is going to be the constant 
//payload is the response or data to be set to store
function requestHelper(req, payload= null) {
	return {
		type: req,
		payload,
	}
}

// req is going to be the constant 
//payload is the response or data to be set to store
function responseHelper(req, payload) {
	return {
		type: req,
		payload,
	}
}
//payload is the response or data to be set to store
function responseHelperLogin(req, payload) {
	if(payload.token){
		localStorage.setItem('token', payload.token)
	}
	return {
		type: req,
		payload,
	}
}
function logOutHelper(req) {
	localStorage.removeItem('token')
	return {
		type: req,
	}
}

export function handleCustomerLogin(object){
	return (dispatch) => {
		dispatch(showLoading())
		dispatch(requestHelper(CUSTOMER_LOGIN_REQUEST))
		return customer_login(object)
			.then((response) =>{
				dispatch(responseHelperLogin(CUSTOMER_LOGIN_SUCCESS, response))
				dispatch(hideLoading())
			}).catch(err => {
				dispatch(responseHelper(CUSTOMER_LOGIN_FAILURE, err))
			})
	}
}
export function handleCustomerLogout(){
	return (dispatch) => {
		dispatch(requestHelper(CUSTOMER_LOGOUT_REQUEST))
		return dispatch(logOutHelper(CUSTOMER_LOGOUT_SUCCESS))	
	}
}
export function handleCustomerCreate(customer){
	return (dispatch) => {
		dispatch(showLoading())
		dispatch(requestHelper(CREATE_CUSTOMER_REQUEST))
		return save_customer(customer)
			.then((response) =>{
				dispatch(responseHelper(CREATE_CUSTOMER_SUCCESS, response))
				dispatch(hideLoading())
			})
			.catch(err=> dispatch(responseHelper(CREATE_CUSTOMER_FAILURE, err)))
	}
}
export function handleCustomerUpdate(customer){
	return (dispatch) => {
		dispatch(requestHelper(UPDATE_CUSTOMER_REQUEST))
		return update_customer(customer)
			.then((response) =>{
				dispatch(responseHelper(UPDATE_CUSTOMER_SUCCESS, response))
			})
			.catch(err=> dispatch(responseHelper(UPDATE_CUSTOMER_FAILURE, err)))
	}
}
export function handleGetShippingRegions(){
	return (dispatch) => {
		dispatch(requestHelper(CUSTOMER_SHIPPING_REGIONS_REQUEST))
		return get_customer_shipping_regions()
			.then((response) =>{
				dispatch(responseHelper(CUSTOMER_SHIPPING_REGIONS_SUCCESS, response))
			})
			.catch(err=> dispatch(responseHelper(CUSTOMER_SHIPPING_REGIONS_FAILURE, err)))
	}
}
