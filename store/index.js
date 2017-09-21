import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    role: "",
    token:null,
    guestToken:null,
    id:null,
    user:null,
    email:null,
    islogged: null,
    fbimg:null,
    from_doc:0,
    isguest:null,
    cart: [],
    clientY:0,
    clientX:0,
    childdialog:false,
    productlist:null,
    addressid:null,
    billaddressid:null,
    ordernumber:null
  },
  mutations: {
    setUser(state,text){
      state.token = text.authentication_token 
      state.email = text.email
      state.id = text.id
      state.user = text.name
      state.role = text.role
      state.islogged = text.islogged == "" ? false : true
    },
    setfbimg(state,text){
      state.fbimg = text
    },
    setToken(state,text){
      state.token = text 
      state.islogged = true
    },
    setGuestToken(state,text){
      state.guestToken = text 
      state.isguest = true
    },
    setproductlist(state,text){
      state.productlist = text 
    },
    addtoCart(state,text){
      state.cart = state.cart.concat(text)
    },
    updateCart(state,text){
      state.cart = text
    },
    removefromCart(state,text){
      state.cart = state.cart.concat(text)
    },
    setFromDoc(state,text){
      state.from_doc = text 
    },
    setclientY(state,text){
      state.clientY = text 
    },
    setaddressid(state,text){
      state.addressid = text 
    },
    setbilladdressid(state,text){
      state.billaddressid = text 
    },
    setordernumber(state,text){
      state.ordernumber = text 
    },
  },
  actions: {    
    setUser({ commit },context){
      commit('setUser',context)
    },
    setToken({ commit },context){
      commit('setToken',context)
    },
    setFromDoc({ commit },context){
      commit('setFromDoc',context)
    },
    setclientY({ commit },context){
      commit('setclientY',context)
    },
    setGuestToken({ commit },context){
      commit('setGuestToken',context)
    },
    setproductlist({ commit },context){
      commit('setproductlist',context)
    },
    addtoCart({ commit },context){
      commit('addtoCart',context)
    },
    updateCart({ commit },context){
      commit('updateCart',context)
    },
    setaddressid({ commit },context){
      commit('setaddressid',context)
    },
    setbilladdressid({ commit },context){
      commit('setbilladdressid',context)
    },
    setordernumber({ commit },context){
      commit('setordernumber',context)
    }
  },
   getters: {
    getToken: state => {
      
      if(state.token.length > 1){
        return 'Token ' + state.token
      } else {
        return  'Token  ' + state.guestToken
      }      
    },
    getaddressid :state => {
      return state.addressid
    }
  }
})

export default store
