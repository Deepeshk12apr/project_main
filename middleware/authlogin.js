import { getTokenFromLocalStorage, getTokenFromCookie,getUserFromCookie,getUserFromLocalStorage,getCartFromCookie,getCartFromLocalStorage,
		getguestTokenFromLocalStorage,getguestTokenFromCookie } from '~/utils/auth'
import jwtDecode from 'jwt-decode'

export default function ({ isServer, store, req }) {
   // If nuxt generate, pass this middleware

  if (isServer && !req) return
	const user = isServer ? getUserFromCookie(req) : getUserFromLocalStorage()
	const guser = isServer ? getguestTokenFromCookie(req) : getguestTokenFromLocalStorage()
	//const arr = user.replace('{').replace('}').split('%22').join('').split('%2C').join('/').split('/');
	
	console.log("User : "+ user)
	const anonymus = {
			authentication_token: "",
			email:"default",
			id:0,
			name:"anaonymus",
			role:"none",
			islogged:false
	}
	
	if(guser){
		console.log(guser)
		store.commit('setGuestToken',guser)
	}

	if(user != undefined ){
		console.log("user : "+ JSON.parse(decodeURIComponent(user)))
		store.commit('setUser', JSON.parse(decodeURIComponent(user)))		
	} else {
		console.log(user)
		store.commit('setUser',anonymus)
	}
	///const loggedUser = getUserFromLocalStorage()
	//console.log('loggedUser' + loggedUser)
  
}
	