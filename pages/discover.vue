<template>
  <div>
       <no-ssr> 
        {{getbanners()}}
       </no-ssr>
       <v-carousel> 
        <v-carousel-item v-for="(item,i) in items" v-bind:src="item.src" :key="i"></v-carousel-item>
      </v-carousel>
      
<!--  <v-layout row wrap>
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
    </v-layout> -->
  </div>
</template>

<script>

import axios from 'axios'
import NoSSR from 'vue-no-ssr'

  export default {
    data () {
      return {
        items: [ ],
        url : '',
        mobile: true
      }
    },
    created(){        
         
        },
    methods : {
        getbanners: function(){
        let  url = 'http://52.52.8.87/api/v2/discover'
        // if(window.document.clientWidth >= 992) {
        //     this.mobile = false
        // }
        let vm = this
        let is_mobile = "/?is_mobile=" + this.mobile
         url =  url + is_mobile
        axios.get( url)
          .then((res)=>{
            // vm.items = res.data.data[0].data.filter(function(obj){
            //     if(obj.banner_type = 'slide'){
            //       return obj.banner
            //     }
            // })
            vm.items = res.data.data[0].data.map(function(obj){
              let eo = {
                src:''
              }
              eo['src'] = obj.banner
              return eo             
            })
            // let datastr = JSON.stringify(res.data.data[0].data)
            // console.log(datastr)
            //console.log(res.data.data[0].data)
          }) 
        }

    },
    components: { 'no-ssr': NoSSR },
    middleware : ['authlogin','cart']
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