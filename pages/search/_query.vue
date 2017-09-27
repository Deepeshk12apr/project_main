<template>
<!-- <p>{{product}}</p> -->
<!-- 	<no-ssr>
       <product-list-mob></product-list-mob>
    </no-ssr> -->
          <v-layout class="inline product" row wrap>
         <v-flex xs6 sm4 md3  v-for="product in list" :key="product.title" >
            <nuxt-link :to="'/productlist/'+product.id">
               <v-card>
                  <v-card-media :src="product.images[0]" height="150px">
                  </v-card-media>
                  <!-- <p>{{product.images}}</p> -->
                  <v-card-title>
                     <div class="product_data">
                        <p class="subheading">{{product.brand}}</p>
                        <!-- <p class="body-1 mb-2 title">{{product.title}}</p> -->
                        <p class= "body-1  listing_price"><b>RS {{product.listing_price}}</b></p>
                     </div>
                  </v-card-title>
               </v-card>
            </nuxt-link>
            <v-btn icon class="quickView" @click.native.stop="opendialog(product)">
                 <v-icon>remove_red_eye</v-icon>
            </v-btn>
         </v-flex>
         <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
<!--          <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
          <v-card >
          <v-toolbar dark class="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          </v-toolbar>
            <div class="dialogCard" v-if="dproduct">
                  <div class="headline">{{dproduct.title}}</div>
                  <div class="title">{{dproduct.brand}}</div>  
                  <div class="title">RS {{dproduct.listing_price}}</div>
                  <img class="dimg" :src='dproduct.images[0]'>
                  <div class="title">Size : {{size}}</div>
                  <div class="inlineradio size" v-for="item in dproduct.size_available">
                      <v-radio  v-bind:label="`${item.size}`" v-model="size" :value="item.product_variation_id">
                      </v-radio>
                  </div>
            </div>            
          </v-card>
        </v-dialog> -->
    </v-layout>
</template>
<script>
import axios from 'axios'
import NoSSR from 'vue-no-ssr'
import ProductListMob from '../../components/product-list-mob.vue'

export default {
	data(){
		return{
			query:null
		}
	},
components: { 
      productListMob : ProductListMob,
      'no-ssr': NoSSR },
	asyncData ({ params, error },callback) {
		console.log(params.query)
		let cc  = '"'+params.query+'"'
		let url = `http://52.52.8.87/api/v2/catalogue/elastic-products/?size=100&from_doc=0&applied_filter=`
		let query = '{"query":['+cc+']}'

		console.log(url + query)

	    return axios.get(url + query)
	    .then((res) => {
	        console.log(res.data.data[0].products)
	        callback(null, { 
	          list: res.data.data[0].products ,
	          description: res.data.data[0]

	        })
	      })
	  },
}	
</script>