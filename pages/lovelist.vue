<template>
	<main>
	<!-- <p>{{lovelist}}</p> -->
	<div>
	<v-flex xs6 sm4 md3  v-for="product in lovelist" :key="product.title" >
      <v-card @click="redirectcard(product.id)" class="product" >  
      	<!-- <p>{{product}}</p>   -->
      	 <div class="headline">{{product.product_name}}</div>
         <div class="title">{{product.brand}}</div>  
		 <div class="title">&#8377 {{product.listing_price}}</div>           
         <v-card-media :src="product.product_image" height="150px">
         </v-card-media>               
         <v-card-title>
            <div class="product_data">
               <p class="subheading">{{product.brand}}</p>                        
               <p class= "body-1  listing_price"><b>&#8377 {{product.listing_price}}</b></p>
            </div>
         </v-card-title>
     </v-card>
    </v-flex>
    </div>	
	</main>
	
</template>
<script>
	import axios from 'axios'
	export default {
		asyncData ({ params, store },callback) {
	    let config = { Authorization : store.getters.getToken.toString() }
	    let url = "http://52.52.8.87/api/v2/user/love/"
	    console.log('asyncData')
	   return  axios.get(url, { headers: config })
	    .then((res) => {
	        //console.log(JSON.stringify(response.data.data[0].data))     
	        callback(null, { 
	          lovelist: res.data.data[0].data
	        })   
	      })
	    },
	  	methods:{
		redirectcard :function(pid){
			//alert(pid)
			let url = '/products/' + pid 
			this.$router.replace(url)
			}
		},
	    middleware:['authlogin']
	}
</script>

<style>
	.product{
		margin-bottom: 10px;
	}
</style>