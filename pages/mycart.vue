<template>
	<main>
	<!-- <p>{{products}}</p> -->
	<div class="title">Your Cart  ({{products.items.length}} items)</div><br>
	<div v-for="item in products.items">
	<nuxt-link :to="'product/'+item.product_attribute_id">{{item.product_attribute_id}}</nuxt-link>
		 <v-flex xs12>
	            <v-card class="white darken-2 grey--text">
	              <v-container fluid grid-list-lg>
	                <v-layout row>
	                   <v-flex xs3>
	                    <v-card-media
	                      :src="item.product_image"
	                      height="125px"
	                      contain
	                    ></v-card-media>
	                  </v-flex>
	                  <v-flex xs9>
	                    <div>
	                      <div class="title">{{item.product_name}}</div>
	                      <div class="headline">$  {{item.original_price}}</div>
	                      <v-breadcrumbs divider="/">
					      <v-breadcrumbs-item>{{ item.size }}</v-breadcrumbs-item>
					      <v-breadcrumbs-item>{{ item.color }}</v-breadcrumbs-item>
					      <v-breadcrumbs-item>{{ item.quantity }}</v-breadcrumbs-item>
	    				</v-breadcrumbs>
	                    </div>
	                    <div>
	              			<v-btn small light>Edit</v-btn>
			            </div>
			            <div>
			             	<v-btn @click.native='removeitem(item.id)' small light>Remove</v-btn>
			            </div>
	                  </v-flex>
	                </v-layout>
	              </v-container>
	            </v-card>
	     </v-flex>	
     <br>
	</div>
<!-- 	<nuxt-link to="/checkout102">
	<v-btn class="green" block secondary >Checkout</v-btn><br><br>
	</nuxt-link> -->
	<nuxt-link v-if='this.$store.state.token.length > 1 ' to="/checkout101">
		<v-btn class="green" block secondary >Next</v-btn><br><br>
	</nuxt-link>
	<nuxt-link v-else to="/checkout102">
		<v-btn class="green" block secondary >Next</v-btn><br><br>
	</nuxt-link>
	</main>
</template>
<script>
import axios from 'axios'

  export default {
      asyncData ({ store,params }, callback) {
      	let config = { Authorization : store.getters.getToken.toString() } 
      	console.log(config)
    	 axios.get('http://52.52.8.87/api/v2/cart', { headers: config } )
    	 .then(response => {
            // If request is good...	
            console.log("Token in mycart: " + store.getters.getToken.toString())
            console.log(response.data.data[0])	
            callback(null, { products: response.data.data[0].items })
          })
    	 .catch((e) => {
		          console.log(e)
		        })

    },
    methods:{
    	removeitem: function(arg){
    		let vm = this
    		let config = { Authorization : 'Token '+ vm.$store.state.token }
    		console.log(config)
    		let url = 'http://52.52.8.87/api/v2/cart/'+ arg
    	 return	axios.delete( url, { headers: config })
    	 .then(response => {
            console.log(response.data)
          })
    	 .catch((e) => {
    	 	console.log(e)
    	 })
    	},
    	Checkout:function(){

    	}
    },
  	middleware : ['authlogin','cart']
}


</script>