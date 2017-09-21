<template>
  <div>
       <v-carousel>
        <v-carousel-item v-for="(item,i) in items" v-bind:src="item.src" :key="i"></v-carousel-item>
      </v-carousel>
      <v-layout row wrap>
      <v-flex xs6 sm5  md4 offset-sm1 offset-md2>
          <v-card>
             <v-card-media src="https://prod.zapyle.com/zapmedia/uploads/homepage_images/banner/24-7-17_Smallbanner3.jpg" height="300px">
             </v-card-media>
             <v-card-title primary-title>
             Banner
             </v-card-title>
          </v-card>
      </v-flex>
      <v-flex xs6 sm5 md4>
          <v-card>
             <v-card-media src="https://prod.zapyle.com/zapmedia/uploads/homepage_images/banner/24-7-17-Smallbanner2.gif" height="300px">
             </v-card-media>
             <v-card-title primary-title>
             Banner
             </v-card-title>
          </v-card>
      </v-flex>
      </v-layout>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://prod.zapyle.com/zapmedia/uploads/homepage_images/banner/master_jYuqS6r.jpg'
          },
          {
            src: 'https://prod.zapyle.com/zapmedia/uploads/homepage_images/banner/14-8-17_banner1.jpg'
          },
          {
            src: 'https://prod.zapyle.com/zapmedia/uploads/homepage_images/banner/24-8-17_Smallbanner3_2.jpg'
          },
          {
            src: 'https://prod.zapyle.com/zapmedia/uploads/homepage_images/banner/24-8-17_Smallbanner4_2.jpg'
          }
        ]
      }
    }
  }
</script>

<style>
  .carousel__controls{
    visibility: hidden !important;
  }
  .card{
    margin: 20px 25px 0px 25px;

  }

</style>


<!-- <template>
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
  
</script> -->