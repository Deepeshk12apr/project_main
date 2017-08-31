<template>
  <section class="container">
    {{$store.state.cart}}
  </section>
</template>

<style scoped>
.title
{
  margin: 50px 0;
}
</style>

<script>

import axios from 'axios'

const api = `https://swapi-json-server-nvaxelgbew.now.sh/people`

  export default {
    // asyncData({store}){
    //   return axios.get('http://52.52.8.87/api/v2/cart', { headers: { Authorization: 'Token a2fcea0ff9119e872bcba56e309c466503b291f1' } }).then((res) => ({
    //       console.log(store.getter)
    //       people: res.data.data[0].items.discounted_price
    //   }))
    // }
    fetch ({ store, params }) {
      console.log( 'Token is here -------------' + store.state.token)
      console.log(store.getters.getToken.toString())
      let config = { Authorization : store.getters.getToken.toString() } 
      //let config = {'Authorization': 'Token a2fcea0ff9119e872bcba56e309c466503b291f1' };
      let header = { headers: config }
      let token = store.state.token
      console.log(token + 'from $store')
      //console.log(JSON.parse(config.toString()))
      return axios.get('http://52.52.8.87/api/v2/cart',{ headers: config }  )
      .then((res) => {
          console.log(res.data)
          store.commit('updateCart', res.data.data)
      })
      .catch((e) => {
              console.log(e)
            })
    },
    middleware : ['authlogin','cart']

  }
</script>