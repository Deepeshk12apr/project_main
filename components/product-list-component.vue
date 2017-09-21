<template>
        <v-layout class="inline" row wrap>
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
</template>

<script>

import InfiniteLoading from './InfiniteLoading.vue'
import axios from 'axios'

  export default {
    data(){
      return {
            list: [],
            from_doc: 0,
            from_doc:0,
      }
    },
    methods: {
          onInfinite() {
            let fltr = ""
            console.log("skfbfkdhb")
            if (typeof(filter) != "undefined") {
                if (filter.length > 0) {
                    let val = filter.join('","')
                    fltr = {
                        brand: [val]
                    }
                    fltr = JSON.stringify(fltr)
                    console.log(fltr)
                }
            }

            let vm = this
            let config = {
                Authorization: this.$store.state.token
            }
            let fd = this.from_doc
            let url = 'http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc=' + fd + '&size=10'
            if (typeof(filter) != "undefined") {
                if (filter.length > 0) {
                    url = url + "&applied_filter=" + fltr
                    axios.get(url)
                        .then((res) => {
                            vm.list = res.data.data[0].products
                            vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                            fd = fd + 4
                            vm.from_doc = fd
                        })
                } else {
                    axios.get(url)
                        .then((res) => {
                            //callback(null, { products: res.data.data[0].products })
                            vm.list = vm.list.concat(res.data.data[0].products)
                            vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                            fd = fd + 4
                            vm.from_doc = fd
                        })
                }
            } else {
                axios.get(url)
                    .then((res) => {
                        //callback(null, { products: res.data.data[0].products })
                        vm.list = vm.list.concat(res.data.data[0].products)
                        fd = fd + 4
                        vm.from_doc = fd
                        vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                    })
            }
            let str = "";
            let c = vm.list.filter(function(obj){
                    str += obj.id.toString() + "/"
                    return obj.id
            })
            console.log("infi : "+ str)
        },
     },
     created(){
        console.log("infiite ")
     },
     components:{
        infiniteLoading : InfiniteLoading
     }
  }
</script>