<template>
  <v-layout column justify-center align-center>
    <h5> {{showUser()}}</h5>
    <nuxt-link :to="'/products/1'">click</nuxt-link>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
    data () {
      return {
        e1: true,
        email: 'deepesh12apr@gmail.com',
        password:'12April1992'
      }
    },
    methods: {
      showUser: function () {
        console.log(this.$store.state.token)
        console.log(this.$store.state.email)
        console.log(this.$store.state.id)
        console.log(this.$store.state.user)
        console.log(this.$store.state.role)
        console.log(this.$store.state.islogged)
        //return "user : " + this.$store.state.email + "  status : " + this.$store.state.islogged
        console.log(this.$store.state.guesttoken)

        if(this.$store.state.token != null || this.$store.state.token.length > 1   ){
          return "Token : "  + this.$store.state.token
        } else {
          return "guest Token :" +  this.$store.state.guestToken
        }  
     }  
  },
  middleware : 'authlogin'
}
  
</script>