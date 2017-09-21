<template>
	<main>
	<div class="rectangle-15">
		<div class="body-2" dark>Pay</div>
				<div>
			<v-btn dark class="nxt">Next</v-btn>
		</div>
			</div>

		addressid : <p>{{$store.state.addressid}}</p>
		billaddressid : <p>{{$store.state.billaddressid}}</p>
		<p>{{paymentmode}}</p>
		<v-radio  label="EMI" v-model="paymentmode" value="emi"> </v-radio>
		<v-radio  label="Card" v-model="paymentmode" value="card"></v-radio>
		<v-radio  label="UPI" v-model="paymentmode" value="upi"> </v-radio>
		<v-radio  label="Wallet" v-model="paymentmode" value="wallet"> </v-radio>
		<v-radio  label="Net Banking" v-model="paymentmode" value="netbanking"> </v-radio>
		<v-radio  label="Cash on delivery" v-model="paymentmode" value="cod"></v-radio>

		<!--  Add this in review page after address page and complte order process there
		<v-checkbox v-bind:label="`use Zap Cash: ${is_zapcash.toString()}`" v-model="is_zapcash" light></v-checkbox> -->
	<v-btn @click.native="pay()" class="green" block secondary >Pay</v-btn>	
	</main>	
</template>

<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>

import axios from 'axios'
	  export default {
    data () {
      return {
      	paymentmode:'',
      	paymo: 'razorpay',
      	is_zapcash:false,
      	order_number:null,
      	option: {
			    "key": "rzp_test_wUOqNZsgEr2CQ5",
			    "amount": "2000", // 2000 paise = INR 20
			    "name": "Zapyle",
			    "description": "Purchase Description",
			    "image": "../static/v.png",
			    "handler": function (response) {
			    console.log(response)
				let vm = window.$nuxt
				let config = { Authorization: vm.$store.getters.getToken.toString() }
		        console.log(config)
		        axios.post('http://52.52.8.87/api/v2/order/redirect-transaction/',
		       	{
					order_number: vm.$store.state.ordernumber,
					payment_id: response.razorpay_payment_id
				},
		         { headers: config })	
		            .then((res) => {
		               console.log(res.data)
		            })
			        alert(response.razorpay_payment_id);
			        vm.$nuxt.$router.replace('/ordersuccess')
			    },
			    "prefill": {
			        "name": "testUser",
			        "email": "test@zapyle.com",
			        "contact":7093580735,
			        "method":"card"
			    },
			    "notes": {
			        "address": "Hello World",
			        "refreance_no": "order_id"
			    },
			    "theme": {
			        "color": "#F37254",
			        "emi_mode":true
			    }
			}
      }
  },
      computed:{
      updateUser: function(){
        console.log("isLogged : " + this.$store.state.islogged)
        return this.$store.state.islogged
      }
    },
    methods: {

    	createorder:function(){
    		alert('from handler')
    	},
    	pay: function () {

		let vm =  this
		let url = "http://52.52.8.87/api/v2/order/create-transaction/"
		let mode = ''
		if(vm.paymentmode != "cod")
			mode = 'razorpay'

		let config = {
	          	Authorization: "Token " + this.$store.state.token
	         	}
		axios.post(url, 
			{
				mode: mode,
				is_zapcash: vm.is_zapcash,
				billing_address: vm.$store.state.addressid,
				shipping_address: vm.$store.state.billaddressid,
			},
			{headers: config}
		).then((res) => {
			console.log(res.data.data[0].order_number)
			vm.option.notes.refreance_no = res.data.data[0].order_number
			//vm.order_number = res.data.data[0].order_number
			vm.$store.commit('setordernumber',res.data.data[0].order_number)
		})


		this.option.prefill.name = this.$store.state.user
		this.option.prefill.email = this.$store.state.email
		this.option.prefill.method = vm.paymentmode
		//save mobile

    	console.log("isLogged : " + this.$store.state.islogged)
    	const rzp1 = new Razorpay(this.option)
    	rzp1.open()
      	console.log('pay')
    	}	
 	 },
 	middleware : 'authlogin'
}
</script>

<style>
	.rectangle-15 {	
		height: 50px; 
		border: 1px solid #979797;	
		background-color: #000000;
		margin-bottom: 50px;
		width: 80%;
	}
	.rectangle-15 div {
		color: wheat;
    	padding: 10px;
    	display: inline;
	}
	.nxt{
		left:90%;
	}
	.input-group__details{
		display: none;
	}
</style>