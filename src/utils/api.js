import helper from './helper'
const url= 'https://nodebackendreactfrontend.herokuapp.com/api/v1'
//make an api call and provide content to the ui
export function getInnitalData( page, limit, description_length) {
	return helper.get(url+`/product?page=${page}&limit=${limit}&description_length=${description_length}`)
			.then((response) => response.json())
}

// Get the orders data
export function getOrderData() {
	return helper.get(url+'/order')
			.then((response) => response.json())
}

// get the details of a particular item(product)
export function get_product_by_id(id) {
	return  helper.get(`${url}/product/${id}/details`)
			.then((response) => response.json())
}
// crate and get a new cart id so as to start setting products to cart
export function generate_cart_id() {
	return helper.get(url+`/shoppingcart/generateUniqueId`)
			.then((response) => response.json())
}




export function saveProduct(body) {
	return fetch('http://localhost:8080/post-rest/api/user/1/post', {
				method: 'post',
				headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				// 'Authorization': 'Basic Auth ' + Base64.encode("harisu" + ":" + "test123"),

				},
				body: JSON.stringify(body),
			})
			.then((response) => response.json())

}



// Add a particular product to cart
export function add_product_to_cart(body) {
	return helper.post(url+`/shoppingcart/add`,body)
			.then((response) => response.json())
}

// Add a custoomer to the backend same as register
export function save_customer(body) {
	return helper.post(url+`/customers`,body)
			.then((response) => response.json())
}


// Login a customer
export function customer_login(body) {
	return helper.post(url+`/customers/login`, body)
			.then((response) => response.json())
}


// Get the items in cart
export function get_cart_item(cart_id) {
	return helper.get(url+`/shoppingcart/${cart_id}`)
			.then((response) => response.json())
}
// Get the total amount for items in the cart
export function get_cart_total_amount(cart_id) {
	return helper.get(url+`/shoppingcart/totalAmount/${cart_id}`)
			.then((response) => response.json())
}
//delete item from cart
export function cart_remove_item(item_id) {
	console.log("id is ", item_id)
	return helper.delete(url+`/shoppingcart/removeProduct/${item_id}`)
			.then((response) => response.json())
}
//update item in cart
export function cart_update_item_quantity(item_id, quantity) {
	let body = { quantity: quantity, }
	return helper.put(url+`/shoppingcart/update/${item_id}`, body)
			.then((response) => response.json())
}

// Add product Reviews
export function add_product_review(product_id, body) {
	return helper.post(url+`/product/${product_id}/reviews`,body)
			.then((response) => response.json())
}
// list product reviews
export function list_product_reviews(product_id) {
	return helper.get(url+`/product/${product_id}/review`)
			.then((response) => response.json())
}

// Update a customer when checkong out 
export function update_customer( body) {
	return helper.put(url+`/customers/address`,body)
			.then((response) => response.json())
}

// send and crate and order
export function create_order(body){
	return helper.authpost(url+'/order/create', body)
	.then((response) => response.json())
}

// export function search_product_async(query) {
// 	return helper.get(url+`/product/search?query_string${cart_id}`)
// 			.then((response) => response.json())
// }

export function list_categories(query) {
	return helper.get(url+`/category`)
			.then((response) => response.json())
}
export function list_departments(query) {
	return helper.get(url+`/departments`)
			.then((response) => response.json())
}

export function fetch_product_in_category(category) {
	return helper.get(url+`/product/inCategory/${category}?page=1&limit=20&description_length=200`)
			.then((response) => response.json())
}

export function fetch_product_in_department(department) {
	return helper.get(url+`/product/inDepartment/${department}`)
			.then((response) => response.json())
}
export function get_customer_shipping_regions() {
	return helper.get(url+`/shipping/regions/`)
			.then((response) => response.json())
}
