import {getCartFromCookie,getCartFromLocalStorage, } from '~/utils/auth'
import jwtDecode from 'jwt-decode'

export default function ({ isServer, store, req }) {
   // If nuxt generate, pass this middleware

  if (isServer && !req) return
	const cart = isServer ? getCartFromCookie(req) : getCartFromLocalStorage()
	console.log("cart : "+ cart)



	if(cart != undefined){
		store.commit('updateCart',JSON.parse(decodeURIComponent(cart)))
	}

	///const loggedUser = getUserFromLocalStorage()
	//console.log('loggedUser' + loggedUser)
  
}
	