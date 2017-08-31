<template>
  <v-layout column>
      <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
          <v-flex xs4 v-for="product in list" :key="product.title">
                  <nuxt-link :to="'/products/'+product.id">
                  <v-card> 
                <v-card-media :src="product.images[0]" height="300px">
                </v-card-media>
                <v-card-title primary-title>
                  <div>
                    <h3 class="title mb-0">{{product.brand}}</h3>
                    <h4 class="subheading mb-0">{{product.title}}</h4>
                    <h4 class= "subheading">{{product.listing_price}}</h4>
                  </div>
                </v-card-title>
              </v-card>
              </nuxt-link>
          </v-flex>
          <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
        </v-layout>
      </v-container>
  </v-layout>
</template>

<script>

import InfiniteLoading from '../components/InfiniteLoading.vue'
import axios from 'axios'

  export default {
    //   asyncData ({store,params }, callback) {
    //     let config = { Authorization : store.getters.getToken.toString() } 
    //   axios.get('http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc=0&size=500', { headers: config } )
    //   .then((res) => {
    //     console.log(res.data.data[0].products)
    //       let data = res.data.data[0].products.filter(function(obj){
    //                   return obj.color.length > 1 
    //       })
    //       console.log(data)
    //       callback(null, { products: res.data.data[0].products })
    //   })
    // },
    data() {
      return {
       list: [],
       from_doc:null
      }
    },
    methods : {
      onInfinite(event) {
      //let config = { Authorization : store.getters.getToken.toString() } 
      //alert()


      console.log('in onInfinite')
      let vm =  this
      let config = { Authorization : this.$store.state.token} 
      let fd  =  this.$store.state.from_doc
      let fd_store  =  this.$store.state.from_doc
      let fd_local  =  this.from_doc
      console.log('local' + fd_local)
      console.log('store' + fd_store) 
      let url = 'http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc=' + fd + '&size=5'
      axios.get(url, { headers: config } )
      .then((res) => {
          //callback(null, { products: res.data.data[0].products })
            vm.list = vm.list.concat(res.data.data[0].products)
            vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
            fd = fd + 20
            vm.from_doc = fd
            this.$store.commit('setFromDoc',fd)
      })
    }
    },
    components: {
    InfiniteLoading,
    },
    scrollToTop: false,
    middleware : ['infinitscroll','authlogin']



  //   async fetch ({ store, params }) {
  //     let { data } = await axios.get('http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=Market&from_doc=0&size=12', { headers: { Authorization: 'Token 1d33d892363d32771c4dc923fd8df708fdcc2c35' } })
  //       console.log(data.data[0].products)
  //       callback(null, { title: res.data.title })
  //       return { items: data.data[0].products }

  //       //let cards = data.data[0].products
        
  //     //store.commit('setStars', data)
  //     //console.log("some data :" + data.length)
  // }
    }
</script>