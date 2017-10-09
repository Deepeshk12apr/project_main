import {getFiltersFromCookie,getFiltersFromLocalStorage, } from '~/utils/filter'
import jwtDecode from 'jwt-decode'

export default function ({ isServer, store, req }) {
   // If nuxt generate, pass this middleware

  if (isServer && !req) return
	const filter = isServer ? getFiltersFromCookie(req) : getFiltersFromLocalStorage()

	if(filter != undefined){
		store.commit('setfilter',JSON.parse(decodeURIComponent(filter)))
	}
}
	