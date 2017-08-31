<template>
	<main>
<!-- 	<div>{{products}}</div> -->
	<div class="title">Your Cart  ({{products.items.length}} items)</div><br>
	<div v-for="item in products.items.items">
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
                      <v-breadcrumbs class='bc' divider="/">
				      <v-breadcrumbs-item>{{ item.size }}</v-breadcrumbs-item>
				      <v-breadcrumbs-item>{{ item.color }}</v-breadcrumbs-item>
				      <v-breadcrumbs-item>{{ item.quantity }}</v-breadcrumbs-item>
    				</v-breadcrumbs>
                    </div>
                    <div class="dy-btn">
              			<v-btn small light>Edit</v-btn>
		            </div>
		            <div class="dy-btn">
		             	<v-btn @click.native='removeitem()' small light>Remove</v-btn>
		            </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
     </v-flex>	
     <br>
	</div>
		<label>Total price</label>
		<div class='title tp'>${{products.items.total_price}}</div>
	<nuxt-link v-if='this.$store.state.token.length > 1 ' to="account/address">
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
    	 axios.get('http://52.52.8.87/api/v2/cart', { headers: config })
    	 .then(response => {
            console.log(response.data)	
            callback(null, { products: response.data.data[0] })
          })
    	 .catch((e) => {
		          console.log("error")
		        })},
   // fetch ({ store, params }) {
	  //  return axios.get('http://52.52.8.87/api/v2/cart',{ headers: { Authorization: 'Token a2fcea0ff9119e872bcba56e309c466503b291f1' } })
	  //  .then((res) => {
	  //    console.log(store.state.token)
	  //    //products: res.data.data[0]
		 //  console.log(res)
	  //   })
	  //  .catch((e) => {
		 //          console.log("error")
		 //        })
	  //},
	  // async fetch ({ store, params }) {
	  // 	let vm = this
	  //   let  data  = await axios.get('http://52.52.8.87/api/v2/cart',{ headers: { Authorization: 'Token'+ vm.$store.state.token } })
	  //   	   .then((res) => {
	  //    //store.commit('setStars', res.data)
	  //    vm.products = res.data.data[0]
		 // // console.log("response " + res)
	  //   })
	  //   //store.commit('setStars', data)
	  // }, 
	methods:{
		  sendrqst: function () {
		  	axios.defaults.headers.common['Authorization'] = 'Token 1d33d892363d32771c4dc923fd8df708fdcc2c35';
		      return axios.post(`http://52.52.8.87/api/v2/cart/`,
		       {
		       	auth:{
		       		Token:'1d33d892363d32771c4dc923fd8df708fdcc2c35'
		       	}
		       })
		        .then((res) => {
		         console.log('success')
		        }).catch((e) => {
		          console.log('failure')
		        })
		  },
		  isLogged: function() {
		  	 if(this.$store.state.token){
		  	 	return '/'
		  	 } else {
		  	 	return '/checkout102'
		  	 }
		  }	
	},
 	middleware : ['authlogin','cart']
}
</script>

<style>
	.tp{
		float: right;
		padding: 15px;
	}
	.bc
	{
		justify-content: unset;
		padding-left: 0px;
	}
	.dy-btn
	{
		display: inline;
	}
</style>