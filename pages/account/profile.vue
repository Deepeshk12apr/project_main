<template>
		<main>
	<p>{{user}}</p>
	<p>{{getuser}}</p>
		<!-- <p> {{user.email}}</p>
		<p>{{user.dob}}</p>
		<p>{{user.id}}</p>
		<p>{{user.mobile}}</p>
		<p>{{user.name}}</p>
		<p>{{user.sex}}</p> -->
		<br>
	<form id="address">
    <v-text-field
      label="Name"
      v-model="user.name"
    ></v-text-field>
    <v-text-field
      label="email"
      v-model="user.email"
    ></v-text-field>
        <v-text-field
      label="Full address"
      v-model="user.email"
      required
    ></v-text-field>
    </v-text-field>
        <v-text-field
      label="Mobile Number"
      v-model="user.email"
      
    ></v-text-field>
     <v-btn @click.native ="saveuser()">submit</v-btn>
    </form>
		</main>
</template>

<script>
	import axios from 'axios'

	export default {
		data() {
			return {
				user:{}
			}
		},
		computed : {
			getuser :function(){
			let vm = this
			let config = { Authorization: vm.$store.getters.getToken.toString() }
	        console.log(config)
	        axios.get('http://52.52.8.87/api/v2/user/my-profile/', {
	                headers: config
	            })
	            .then((res) => {
	               console.log(res.data.data[0].user)
	                vm.user = res.data.data[0].user
	               return vm.user
	            })
			}
		},
		methods :{
			saveuser:function(){
			let vm = this
			let config = { Authorization: vm.$store.getters.getToken.toString() }
	        console.log(config)
	        axios.post('http://52.52.8.87/api/v2/user/my-profile/',
	       	{
				name: vm.user.name
			},
	         { headers: config })	
	            .then((res) => {
	               console.log(res.data.data[0].user)
	                vm.user = res.data.data[0].user
	               return vm.user
	            })
			}
		},
		middleware: ['authlogin']

	}
</script>