import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

export const setfilters = (token) => {
  if (process.SERVER_BUILD) return
    
  window.localStorage.setItem('filters', token)
  Cookie.set('filters', JSON.parse(token))
}

export const getFiltersFromCookie = (req) => {
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('filters='))
  console.log(jwtCookie)
  if (!jwtCookie) return
  const jwt = jwtCookie.split('=')[1]
  return jwt
}

export const  getFiltersFromLocalStorage = () => {
  const json = window.localStorage.filters
  return json 
}

