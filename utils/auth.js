import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

const getQueryParams = () => {
  const params = {}
  window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3
  })
  return params
}

export const extractInfoFromHash = () => {
  if (process.SERVER_BUILD) return
  const { id_token, state } = getQueryParams()
  return {
    token: id_token,
    secret: state
  }
}

export const setToken = (token) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('token', token)
  //window.localStorage.setItem('user', JSON.stringify(jwtDecode(token)))
  Cookie.set('jwt', token)
}

export const setguestToken = (token) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('guestToken', token)
  //window.localStorage.setItem('user', JSON.stringify(jwtDecode(token)))
  Cookie.set('guestToken', token)
}

export const setUser = (user) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('user',JSON.stringify(user))
  Cookie.set('user', JSON.stringify(user))
}

export const setCart = (cart) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('cart',JSON.stringify(cart))
  Cookie.set('cart', JSON.stringify(cart))
}

export const unsetToken = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')
  window.localStorage.removeItem('secret')
  Cookie.remove('jwt')
  window.localStorage.setItem('logout', Date.now())
}


export const getTokenFromCookie = (req) => {
  console.log("from Cookie")
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
  console.log(jwtCookie)
  if (!jwtCookie) return
  const jwt = jwtCookie.split('=')[1]
  return jwt
}

export const getguestTokenFromCookie = (req) => {
  console.log("from Cookie")
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('guestToken='))
  console.log(jwtCookie)
  if (!jwtCookie) return
  const guestToken = jwtCookie.split('=')[1]
  return guestToken
}

export const getUserFromCookie = (req) => {
  console.log("from User Cookie")
  if (!req.headers.cookie) return
  const userCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('user='))
  //  console.log(jwtDecode(userCookie))
  if (!userCookie) return
  const user = userCookie.split('=')[1]
  return user
}

export const getCartFromCookie = (req) => {
  console.log("from Cart Cookie")
  if (!req.headers.cookie) return
  const cartCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('cart='))
  //  console.log(jwtDecode(userCookie))
  if (!cartCookie) return
  const cart = cartCookie.split('=')[1]
  return cart
}

export const  getUserFromLocalStorage = () => {
  console.log("from localStorage")
  const json = window.localStorage.user
  return json 
}

export const  getCartFromLocalStorage = () => {
  console.log("from localStorage")
  const json = window.localStorage.cart
  return json 
}

export const  getTokenFromLocalStorage = () => {
  console.log("from localStorage")
  const json = window.localStorage.token
  return json 
}

export const  getguestTokenFromLocalStorage = () => {
  console.log("from localStorage")
  const json = window.localStorage.guestTokens
  return json 
}

export const setSecret = (secret) => window.localStorage.setItem('secret', secret)

export const checkSecret = (secret) => window.localStorage.secret === secret
