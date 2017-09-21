<template>
  <div>
       <v-carousel>
        <v-carousel-item v-for="(item,i) in items" v-bind:src="item.src" :key="i"></v-carousel-item>
      </v-carousel>
      <v-layout row wrap>
      <v-flex xs6 sm5  md4 offset-sm1 offset-mg4>
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