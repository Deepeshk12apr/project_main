import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

export const setfrom_doc = (token) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('from_doc', token)
  Cookie.set('from_doc', token)
}

export const getfrom_docFromCookie = (req) => {
  console.log("from Cookie")
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('from_doc='))
  console.log(jwtCookie)
  if (!jwtCookie) return
  const jwt = jwtCookie.split('=')[1]
  return jwt
}

export const  getfrom_docFromLocalStorage = () => {
  console.log("from localStorage")
  const json = window.localStorage.guestTokens
  return json 
}