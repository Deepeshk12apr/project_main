import {getproductlistFromCookie,getproductlistFromLocalStorage, } from '~/utils/productlist'
import jwtDecode from 'jwt-decode'

export default function ({ isServer, store, req }) {
   // If nuxt generate, pass this middleware

  if (isServer && !req) return
	const productlist = isServer ? getproductlistFromCookie(req) : getproductlistFromLocalStorage()
	
	console.log("middleware productlist")
	//console.log(productlist)

	if(productlist != undefined){
		store.commit('setproductlist',JSON.parse(productlist))
	}
}
	