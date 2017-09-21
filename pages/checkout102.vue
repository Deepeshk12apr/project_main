<template>
	<main>
	<div class='inlineflex' v-if="products">
		<div class="title">Your Cart  ({{products.items.items.length}} items)</div>
		<div class="title price">{{products.items.total_price}}</div>
	</div>
	<div class="rectangle-15"></div>
	<v-text-field name="input-1-3" label="Enter email address"
       single-line
       append-icon="email"
       v-model="email"
       required
     ></v-text-field>
     <div v-if="hasacc">
     			<v-text-field
              name="input-10-1"
              label="Enter your password"
              hint="At least 8 characters"
              v-model="password"
              min="8"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              counter
            ></v-text-field>
    	<a href="#"><label>Forget Password</label></a>
	    <div>
	      <v-btn @click.native="loginUser()" class="green" block secondary >Login</v-btn><br>
	     </div> 
     </div>
     <v-checkbox v-bind:label="`I have zap account: ${hasacc.toString()}`" v-model="hasacc" light></v-checkbox>
		<v-btn @click.native="cag()" class="green" block secondary >Continue as Guest</v-btn><br><br>
		<v-btn class="blue"  @click.native="logviafb()" block secondary >Login with Facebook</v-btn>
	      <v-btn class="red" block secondary >Sign in with Google</v-btn><br>
	<!-- <nuxt-link to="/checkout101">
		<v-btn class="green" block secondary >Next</v-btn><br><br>
	</nuxt-link> -->
	<nuxt-link v-if='this.$store.state.token.length > 1 ' to="/account/address">
		<v-btn class="green" block secondary >Next</v-btn><br><br>
	</nuxt-link>
	<nuxt-link v-else to="/checkout101">
		<v-btn class="green" block secondary >Next</v-btn><br><br>
	</nuxt-link>
	</main>
</template>
<script>

import axios from 'axios'
	export default{
		asyncData ({ store,params }, callback) {
			if(!store.getters.getToken){
				alert('need to contiue as guest')
				return 0
			} 
		  	let config = { Authorization : store.getters.getToken.toString() }
		  	console.log(config)
	    	 axios.get('http://52.52.8.87/api/v2/cart', { headers: config })
	    	 .then(response => {
	            console.log(response.data)
	            callback(null, { products: response.data.data[0] })
	          })
	    	 .catch((e) => {
			          console.log(e)
		        })},
		data(){
			return{
				hasacc: false,
				products:null,
				email:null,
				e1: true,
		        name:'deepesh',
		        email: '',
		        password:'12April1992'
			}
		},
		methods:{
			cag:function(){
				if(!this.email){
					alert('plz enter email')
				}
				let vm = this
				console.log('continue as guest')
			let config = { Authorization : 'Token '+ vm.$store.state.guestToken }	
			console.log(config)
			 return axios.post(`http://52.52.8.87/api/v2/user/continue-as-guest/`,{email: this.email}, { headers: config })
		        .then((res) => {
		          	console.log(res.data)
		          	vm.$nuxt.$router.replace('/account/address')
		          }
		        ).catch((e) => {
		          console.log(e.message)
		        })
			},
			loginUser:function(){
				let vm = this 
				let token =  vm.$store.state.token.length > 1 ?  vm.$store.state.token : vm.$store.state.guestToken
				console.log("Token for login "+token)
				let config = { Authorization : 'Token '+ token }
				axios.post(`http://52.52.8.87/api/v2/user/login/`, {email: this.email, password: this.password},{ headers: config })
		        .then((res) => {
		          let response = res.data
		          if (typeof response.data[0].user.authentication_token !== 'undefined') {
		            //setToken(response.data[0].user.authentication_token)
                setUser(response.data[0].user)
                this.$store.commit('setUser',response.data[0].user);
		            //setUserRole()
		            console.log('loggedin')
		            //	this.$router.replace('/')
		          }
		        }).catch((e) => {
		          console.log(e.message)
		        })
			}
		},
 		middleware : ['authlogin','cart']
	}
</script>
<style>
		.rectangle-15 {	
		height: 40px; 
		border: 1px solid #979797;	
		background-color: #000000;
		margin-bottom: 50px;
	}
	.inlineflex{
		display: inline-flex;
	}
	.inlineflex .price{
		float: right;
	}
</style>

