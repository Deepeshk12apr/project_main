<template>
  <v-tabs dark fixed icons centered>
    <v-tabs-bar slot="activators" class="grey ">
      <v-tabs-slider class="yellow"></v-tabs-slider>
      <v-tabs-item href="#login">
        <v-icon>phone</v-icon>
        Login
      </v-tabs-item>
      <v-tabs-item href="#reg">
        <v-icon>favorite</v-icon>
        Register
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-content id="login">
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
	      <v-btn @click.native="loginUserx()" class="green" block secondary >Login</v-btn><br><br>
        <v-btn @click.native="logout()" class="red" block secondary >Log out</v-btn><br><br>
	      <hr><br><br>
	      <v-btn class="blue"  @click.native="logviafb()" block secondary >Login with Facebook</v-btn>
	      <v-btn class="red" block secondary >Sign in with Google</v-btn>
	     </div>  
    </v-tabs-content>
        <v-tabs-content id="reg">
    		<v-text-field
              name="name"
              label="Enter name"
              single-line
              append-icon="user"
              v-model="name"
            ></v-text-field>
        <v-text-field
              name="email"
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
	      <v-btn @click.native="regUser()" class="green" block secondary >Register</v-btn><br><br>
	      <hr><br><br>
	      <v-btn class="blue" @click.native="Fblogin()"  block secondary >Login with Facebook</v-btn>
	      <v-btn class="red" block secondary >Sign in with Google</v-btn>
	     </div>  
    </v-tabs-content>
  </v-tabs>
</template>
<script>

import axios from 'axios'
import { setUser,setToken, setFbimg} from '../utils/auth'

export default {
    data () {	
      return {
        e1: true,
        name:'deepesh',
        email: 'deepesh12apr@gmail.com',
        password:'12April1992'
      }
    },
    middleware:['authlogin'],
    methods: {
    	pass: function (todo) {
      	this.$store.commit('setUser',this.email);
      	setUser(this.$store.state.email)
      	console.log(this.$store.state.email)
      	this.$router.replace('/')
    	},
    	regUser: function () {
		      return axios.post(`http://52.52.8.87/api/v2/user/register/`, {email: this.email, password: this.password,name:this.name})
		        .then((res) => {
		          let response = res.data
		          if (typeof response.token !== 'undefined') {
		            setToken(response.token)
		            //setUserRole()
		            console.log('loggedin')
		            this.$router.replace('/')
		          }
		        }).catch((e) => {
		          console.log(e.message)
		        })
		  },
		  loginUserx: function () {
		      return axios.post(`http://52.52.8.87/api/v2/user/login/`, {email: this.email, password: this.password})
		        .then((res) => {
		          let response = res.data
		          if (typeof response.data[0].user.authentication_token !== 'undefined') {
		            //setToken(response.data[0].user.authentication_token)
                setUser(response.data[0].user)
                this.$store.commit('setUser',response.data[0].user);
		            //setUserRole()
		            console.log('loggedin')
		            this.$router.replace('/')
		          }
		        }).catch((e) => {
		          console.log(e.message)
		        })
		  },
      logout: function(){
      return axios.post(`http://52.52.8.87/api/v2/user/logout/`,{authentication_token: this.$store.state.token})
          .then((res) => {    
              alert('user logged')
            }).catch((e) => {
              console.log(e.message)
            })
      },
      logviafb: function(){
        let vm = this
        FB.init({
            appId      : '258382104671495',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.8'
          });
        FB.login(function(response) {
          console.log(response)
           if (response.status === 'connected') {
            // Logged into your app and Facebook.
            console.log(response.authResponse.accessToken)
             axios.post(`http://52.52.8.87/api/v2/user/fb-login/`, {access_token:response.authResponse.accessToken})
            .then((res) => {
              let response = res.data
              console.log(res)
              if (typeof response.data[0].data.authentication_token !== 'undefined') {
                //setToken(response.data[0].user.authentication_token)
                setUser(response.data[0].data)
                vm.$store.commit('setUser',response.data[0].data);
                vm.$store.commit("setfbimg","http://graph.facebook.com/"+response.data[0].data.fb_id+"/picture")
                setFbimg("http://graph.facebook.com/"+response.data[0].data.fb_id+"/picture")
                //setUserRole()
                console.log('loggedin')
                vm.$router.replace('/')
              }
            }).catch((e) => {
              console.log(e.message)
            })
            alert('logged')
          } else {
            // The person is not logged into this app or we are unable to tell. 
            alert('not logged')
          }
        }, {scope: 'public_profile,email'});
      }
 	 }
}
   
 
</script>

<style>
  div#reg{
    padding: 15px;
  }
  div#login{
    padding: 15px;
  }
</style>