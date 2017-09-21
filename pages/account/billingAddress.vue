<template>
<main>
	<div class='rectangle-15'>
		<nuxt-link to="/account/myaccount">
		<v-icon dark>home</v-icon>
		</nuxt-link>
		<p>Billing address</p>
	</div>
	<p>{{getaddresslist}}</p>

	<!-- <p>{{$store.state}}</p> -->
	<!-- <p>{{$store.state}}</p> -->

	<v-expansion-panel expand>
	<!-- <v-radio-group v-model="billaddressid" :mandatory="false"> -->
    <v-expansion-panel-content v-for="(item,i) in address" :key="i" v-bind:value="address.length === 1">
      <div slot="header">Address {{i+1}}</div>
      <v-card>
        <v-card-text class="grey lighten-3">
        	<!-- {{item}} -->
        	<label>Address :</label>{{item.address}}<br>
        	<label>city   :</label>{{item.pin_number.city}}<br>
        	<label>state :</label>{{item.pin_number.state}}<br>
        	<label>country :</label>{{item.pin_number.country}}<br>
        	<label>pincode :</label>{{item.pin_number.pincode}}<br>
			<label>phone :</label>{{item.phone_number.phone}}
			<v-radio @change="savebilladdressid" :label="item.address" v-model="billaddressid" :value="item.id"></v-radio>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
    <!-- </v-radio-group> -->
    </v-expansion-panel>
    <!-- <v-checkbox v-bind:label="`same as billing address: ${isSame.toString()}`" v-model="isSame" light></v-checkbox> -->

    <form v-if="addaddress"
    		id="address">
    	    <v-text-field
      label="Name"
      v-model="name"
      
    ></v-text-field>
    <v-text-field
      label="Pincode"
      v-model="pincode"
      @change="validatepincode"
      required
    ></v-text-field>
        <v-text-field
      label="Full address"
      v-model="fulladdress"
      required
    ></v-text-field>
    </v-text-field>
        <v-text-field
      label="Mobile Number"
      v-model="phone"
      
    ></v-text-field>
     <v-btn @click.native ="submitaddress()">submit</v-btn>
    </form>

    <!--for transaction
		mode -> cod,wallet,razorpay
		is_zapcash
		bill_address
		shipping_address
     -->
 <!--    <v-list class="add">
        <v-list-tile 
          v-for="(item, i) in 1"
          :key="i"
        >
          <v-list-tile-content @click.native="showaddaddress()">
            <v-list-tile-title>Add new address</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>bubble_chart</v-icon>
          </v-list-tile-action>
          </v-list-tile>
   </v-list> -->

   	<nuxt-link v-else to="/checkout">
		<v-btn class="green" block secondary >Next</v-btn><br><br>
	</nuxt-link>

 </main>
</template>

<script>
import axios from 'axios'
	export default{
		data () {
			return {
				address:[],
				name:'',
				isSame:true,
				pincode:null,
				phone:null,
				fulladdress:'',
				hasaddress: false,
				pincodeid:null,
				billaddressid:"rad_addrress",
				addaddress:false
			}
		},
		computed :{
			getaddresslist :function(store){
			
			let vm = this
			let config = { Authorization: vm.$store.getters.getToken.toString() }
	        console.log(config)
	        axios.get('http://52.52.8.87/api/v2/user/address/', {
	                headers: config
	            })
	            .then((res) => {
	               console.log(res.data.data[0].address)
	               vm.address =  res.data.data[0].address
	               return vm.address
	            })
			}
		},
		methods : {
			savebilladdressid: function(){
				let vm = this
				console.log(this.$store.state)
				this.$store.commit('setbilladdressid',vm.billaddressid)
				// this.$store.dispatch('setbilladdressid',{billaddressid : vm.billaddressid})
				console.log(this.$store.state.billaddressid)
				//this.$store.getter('getbilladdressid')
			},
			showaddaddress :function(){
				this.addaddress = true
			},
			validatepincode : function() {
				if(this.pincode.length == 6){
				let vm =  this	
				let url = "http://52.52.8.87/api/v2/user/check-pincode/?pincode=" + this.pincode
				axios.get(url)
				.then((res) => {
					vm.pincodeid = res.data.data[0].pincode.id
				})
				} else {
					console.log('enter pincode')
				}
			},
			submitaddress : function() {
				let vm =  this	
				let url = "http://52.52.8.87/api/v2/user/address/"
				let config = { Authorization: vm.$store.getters.getToken.toString() }
				axios.post(url, 
					{
						address: vm.fulladdress,
						phone: vm.phone,
						pincode:vm.pincodeid,
						phone_number: vm.phone
					},
					{headers: config}
				).then((res) => {
					console.log(res.data)
					vm.$nuxt.$router.go('')
				})
			}	
		},
		middleware: ['authlogin']
	}
</script>

<style>
	.rectangle-15 {	
		height: 40px; 
		border: 1px solid #979797;	
		background-color: #000000;
		margin-bottom: 50px;
	}
	.rectangle-15 p{
		color: #ffffff;
		display: inline;
		margin-left: 40%;
		font-size: 24px;
		vertical-align: middle;
	}
	.rectangle-15 i{
		padding-left: 10px;
	}
	.add{
		margin-top: 50px;
	}
</style>