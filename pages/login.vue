<template>
	<main>
	<v-text-field
              name="input-1-3"
              label="Enter email address"
              single-line
              append-icon="email"
              v-model="email"
            ></v-text-field>
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
      <v-btn @click.native="loginUser()" class="green" block secondary >Login</v-btn><br><br>
      <hr><br><br>
      <v-btn class="blue" block secondary >Login with Facebook</v-btn>
      <v-btn class="red" block secondary >Sign in with Google</v-btn>
      
      </div>  
	</main> 
</template>
<script>
import axios from 'axios'
import { setUser,setToken} from '../utils/auth'

export default {
    data () {
      return {
        e1: true,
        email: 'deepesh12apr@gmail.com',
        password:'12April1992'
      }
    },
    methods: {
    	pass: function (todo) {
      	this.$store.commit('setUser',this.email);
      	setUser(this.$store.state.email)
      	console.log(this.$store.state.email)
      	this.$router.replace('/')
    	},
    	loginUser: function () {
		      return axios.post(`https://reqres.in/api/register`, {email: this.email, password: this.password})
		        .then((res) => {
		          let response = res.data
		          if (typeof response.token !== 'undefined') {
		            setToken(response.token)
		            this.$store.commit('setToken',response.token);
		            console.log('loggedin')
		            this.$router.replace('/')
		          }
		        }).catch((e) => {
		          console.log(e.message)
		        })
		  }	
 	 }
}
	
</script>