<template>
	<main>
	<!-- /<p>{{orders}}</p> -->
	<!-- <div v-for="item in orders"> -->
		<v-flex xs6 sm4 md3  v-for="item in orders" :key="items.id">
      	<v-card>  
      	<!-- <p>{{item}}</p>   -->
   		<v-card-title>

            <div class="product_data">
               <p class="subheading">Order id</p>                        
               <p class= "body-1  listing_price"><b>{{item.id}}</b></p>
               <p class="subheading">Order Price</p>                        
               <p class= "body-1  listing_price"><b>&#8377 {{item.order_price}}</b></p>
               <p class="subheading">Discounted Price</p>                        
               <p class= "body-1  listing_price"><b>&#8377 {{item.discounted_price}}</b></p>
            </div>
         </v-card-title>
     </v-card>
    </v-flex>
	<!-- </div> -->
	</main>
</template>
<script>
	import axios from 'axios'

	export default {
		data(){
			return{
				Order:"Order Page"
			}
		},
		asyncData ({ store,params }, callback) {
	  	let config = { Authorization : store.getters.getToken.toString() }
    	 axios.get('http://52.52.8.87/api/v2/order/', { headers: config })
    	 .then(response => {
            console.log(response.data)	
            callback(null, { orders: response.data.data[0].data })
          })
    	 .catch((e) => {
		          console.log("error")
		        })},

 		middleware : ['authlogin'] 
	}

</script>