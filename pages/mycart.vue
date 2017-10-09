<template>
	<main v-if="products">
	<!-- <p>{{products}}</p> -->
	<div class="title">Your Cart  ({{products.items.length}} items)</div><br>
	<div v-for="(item,i) in products.items">
	<!-- <nuxt-link :to="'products/'+item.product_attribute_id">{{item.product_attribute_id}}</nuxt-link> -->
		 <v-flex xs12>
	            <v-card class="white darken-2 grey--text">
	              <v-container fluid grid-list-lg>
	                <v-layout row>
	                   <v-flex xs3>
	                    <v-card-media
	                      :src="item.product_image"
	                      height="250px"
	                      contain
	                    ></v-card-media>
	                  </v-flex>
	                  <v-flex xs9>
	                    <div>
	                    <!-- <p>{{item}}</p> -->
	                    <nuxt-link :to="'products/'+item.product_attribute_id">
	                      <div class="title">{{item.product_name}}</div>
	                    </nuxt-link>  
	                      <div class="headline">&#8377 {{item.listing_price}}</div>
	                      <v-breadcrumbs divider="/">
					      <v-breadcrumbs-item>{{ item.size }}</v-breadcrumbs-item>
					      <v-breadcrumbs-item>{{ item.color }}</v-breadcrumbs-item>
					      <v-breadcrumbs-item>{{ item.quantity }}</v-breadcrumbs-item>
	    				</v-breadcrumbs>
	                    </div>
			            <div>
			             	<v-btn @click.native='removeitem(item.id)' small light>Remove</v-btn>
			            </div>
			            <div class="quantity">
		                  <label class="title" >Quantity</label> <br>
		                  <div>{{item.quantity}}</div>
		                  <div @click= "inc(item.id,item.quantity,item.quantity_available)"> + </div>
		                  <div @click= "dec(item.id,item.quantity,item.quantity_available)"> - </div>
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
	<main v-else>
		<h3>No products in cart</h3>
	</main>
</template>
<script>
import axios from 'axios'
import { setCart , setguestToken } from '../utils/auth'

  export default {
      asyncData ({ store,params }, callback) {

      	 // if(typeof(store) == 'undefined'){
        //     alert('cart is empty')
        //     return
        //   }
        if(store.getters.getToken.split('Token')[1].trim() == "null"){
        	 axios.get('http://52.52.8.87/api/v2/user/create-guest/')
                .then((res) =>{
                  console.log(res.data.data[0].user.authentication_token)
                  let gt = res.data.data[0].user.authentication_token
                    store.commit('setGuestToken',res.data.data[0].user.authentication_token)
                    setguestToken(res.data.data[0].user.authentication_token)
                    let config = { Authorization : store.getters.getToken.toString() } 
			      	console.log(config)
			    	 axios.get('http://52.52.8.87/api/v2/cart', { headers: config } )
			    	 .then(response => {
			            callback(null, { products: response.data.data[0].items })
			          })
			    	 .catch((e) => {
					          console.log(e)
					        })
                })
        } else {
        	let config = { Authorization : store.getters.getToken.toString() } 
	      	console.log(config)
	    	 axios.get('http://52.52.8.87/api/v2/cart', { headers: config } )
	    	 .then(response => {
	            callback(null, { products: response.data.data[0].items })
	          })
	    	 .catch((e) => {
			          console.log(e)
			        })

        }

      	
    },
    data (){
    	return {
    		products:null,
    		quantity:1,
    		quantArr:[]
    	}
    },
    created(){
    	console.log(this.products.items)
    	let vm =  this
    	this.products.items.forEach(function(item){
    		console.log(item)
    		vm.quantArr.push(item.quantity)
    	})
    },
    methods:{
    	getafterquantityupdate: function(){
    		let config = { Authorization : store.getters.getToken.toString() } 
	      	console.log(config)
	    	 axios.get('http://52.52.8.87/api/v2/cart', { headers: config } )
	    	 .then(response => {
	            callback(null, { products: response.data.data[0].items })
	          })
    	},
    	removeitem: function(arg){
    		let vm = this
    		let config = { Authorization : vm.$store.getters.getToken.toString() }
    		console.log(config)
    		let url = 'http://52.52.8.87/api/v2/cart/'+arg

    		return axios.delete(url,
			 { headers: config }
			) 
			.then(response => {
            console.log(response.data)
            axios.get('http://52.52.8.87/api/v2/cart', { headers: config } )
		     .then(response => {		  
		         console.log(vm.products)
		       vm.products = response.data.data[0].items
		       })
		    .catch((e) => {
			    console.log(e)
			  })
          	})
    	 	.catch((e) => {
    	 		console.log(e)
    		})


    	 //return	axios.delete( url, { headers: config })
    	 // .then(response => {
      //       console.log(response.data)
      //     })
    	 // .catch((e) => {
    	 // 	console.log(e)
    	 // })
    	},
      inc : function(itemid,quantity,quantity_available){
      	console.log("itemid is " + itemid)
      	if(quantity == quantity_available){
      		alert("No more products available")
      	} else {
      		this.quantityUpdate(1,itemid)	
      	}
        //return  this.quantity++
      },
      dec : function(itemid,quantity,quantity_available){
      	console.log("itemid is " + itemid)
      	if(quantity > 1 ) {
      		this.quantityUpdate(-1,itemid)
      	} else {
      		alert('min anount in cart')
      	}

        //return  this.quantity--
      },
      quantityUpdate:function(quantity,itemid){
      		console.log("itemid is " + itemid)
    		let vm = this
	        let url =  'http://52.52.8.87/api/v2/cart/' + itemid + '/'
	         axios.put(url, {"quantity": quantity},
	            { headers: {'Authorization': "Token " + vm.$store.state.token}})
	            .then((res) => {
	               console.log(res.data)
	               vm.$nuxt.$router.go('')
	             })
	            .catch((e)=>{
	              console.log(e)
	              vm.dialog = true
	            })
    		return this.quantity
    	}
    },
  	middleware : ['authlogin','cart']
}


</script>

<style>

	.breadcrumbs{
		justify-content: end;
		padding-left: 0px !important;
	}
	  .quantity div{
    margin: 10px 10px 25px 10px;
    position: relative;
    height: 50px;
    width: 50px;
    padding: 12px;
    font-size: 20px;
    background-color: grey;
    display: inline-block;
  }
  .quantity{
    margin: 25px 0 25px 0;
  }
</style>