import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: 'test',
    email:''
  },
  mutations: {
    setUser(state,text){
      state.username = text +'_zap'
    }
  },
  actions: {    
    setUser({ commit },context){
      commit('setUser',context)
    }
  }
})

export default store
