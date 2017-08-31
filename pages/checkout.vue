<template>
	<main>
	<div class="rectangle-15">
		<div class="body-2" dark>Pay</div>
				<div>
			<v-btn dark class="nxt">Next</v-btn>
		</div>
			</div>
		<v-radio  label="Pay online" v-model="pay" :value="0"> </v-radio>
		<v-radio  label="Cash on delivery" v-model="pay" :value="1"></v-radio>


	<v-btn @click.native="pay()" class="green" block secondary >Pay</v-btn>	
	</main>	
</template>

<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
	  export default {
    data () {
      return {

      	option: {
			    "key": "rzp_test_wUOqNZsgEr2CQ5",
			    "amount": "2000", // 2000 paise = INR 20
			    "name": "Zapyle",
			    "description": "Purchase Description",
			    "image": "../static/v.png",
			    "handler": function (response){
			        alert(response.razorpay_payment_id);
			    },
			    "prefill": {
			        "name": "Harshil Mathur",
			        "email": "harshil@razorpay.com"
			    },
			    "notes": {
			        "address": "Hello World"
			    },
			    "theme": {
			        "color": "#F37254"
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
    	pay: function () {
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
</style>