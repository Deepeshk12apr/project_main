import {getfrom_docFromCookie,getfrom_docFromLocalStorage, } from '~/utils/infinite-scroll'
import jwtDecode from 'jwt-decode'

export default function ({ isServer, store, req }) {
   // If nuxt generate, pass this middleware

  if (isServer && !req) return
	const fd = isServer ? getfrom_docFromCookie(req) : getfrom_docFromLocalStorage()
	console.log("fd : "+ fd)

	if(fd != undefined){
		store.commit('setFromDoc',JSON.parse(decodeURIComponent(cart)))
	}
 
}
	