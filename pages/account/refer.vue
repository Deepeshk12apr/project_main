<template>
	<main>
      	<v-card> 
   		<v-card-title>
            <div class="product_data">
               <p class="subheading">Referal Code</p>                        
               <p class= "body-1  listing_price"><b>{{referal.code}}</b></p>
               <p class="subheading">Referal amount</p>                        
               <p class= "body-1  listing_price"><b>&#8377 {{referal.amount}}</b></p>
            </div>
         </v-card-title>
         <v-btn v-clipboard:copy="referal.code" v-clipboard:success="onCopy" >submit</v-btn>
         <a :href="'whatsapp://send?text='+ referal.code ">share code with whatsapp</a>
         <!-- <p>{{$route.fullPath}}</p> -->
     </v-card>
	</main>
</template>
<script>
	import axios from 'axios'

	export default {
		data(){
			return{
				Order:"Order Page",
        referal:''
			}
		},
		asyncData ({ store,params }, callback) {
	  	let config = { Authorization : store.getters.getToken.toString() }
	  	console.log(config)
    	 axios.get('http://52.52.8.87/api/v2/user/referral/', { headers: { Authorization : "Token a5f812fa0a54ee9a08deac661584564f4a4e1f42" } })
    	 .then(response => {
            console.log(response.data.data[0].code)	
            callback(null, { referal: response.data.data[0] })
          })
    	 .catch((e) => {
		          console.log("error")
		        })},
    computed : {
      geturl:function(){
        return this.$route.fullPath
      }
    },   
    methods :{
      onCopy:function(e){        
        alert("coupon code coipied")
      }
    },
 		middleware : ['authlogin'] 
	}

</script>