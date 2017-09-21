import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

export const setproductlist = (token) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('productlist', token)
  Cookie.set('productlist', JSON.parse(token))
}

export const getproductlistFromCookie = (req) => {
  console.log("product list from Cookie")
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('productlist='))
  console.log(jwtCookie)
  if (!jwtCookie) return
  const jwt = jwtCookie.split('=')[1]
  return jwt
}

export const  getproductlistFromLocalStorage = () => {
  console.log("product list from localStorage")
  const json = window.localStorage.productlist
  return json 
}