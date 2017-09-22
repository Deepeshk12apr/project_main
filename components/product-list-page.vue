<template>
   <main>
     <!-- <div>{{data}}</div> -->
     <br>
    <v-layout class="inline product" row wrap>
         <v-flex xs6 sm4 md3  v-for="product in products" :key="product.title">
            <nuxt-link :to="'/products/'+product.id">
               <v-card>
                  <v-card-media :src="product.images[0]" height="150px">
                  </v-card-media>
                  <!-- <p>{{product.images}}</p> -->
                  <v-card-title>
                     <div class="product_data">
                        <p class="subheading">{{product.brand}}</p>                        
                        <p class= "body-1  listing_price"><b>RS {{product.listing_price}}</b></p>
                     </div>
                  </v-card-title>
               </v-card>
            </nuxt-link>
         </v-flex>
    </v-layout>
    <v-layout justify-center>
        <v-flex>
          <v-card>
            <v-card-text>
              <v-pagination :length.number="num" v-model="page" @click.native="nextpage(page)"></v-pagination>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
   </main>
</template>

<script>

import axios from 'axios'

export default {    
    
  asyncData ({ params, error },callback) {
    console.log(params.id)
  
  },

    data(){
      return {
        products:[],
        data:null,
        page:1,
        num: 1,
      }
    },
    methods: {
        createpagination : function(){
          let total = this.data.total_documents
          let perpage = 12
          let num = Math.ceil(total/ 12)
          return num
          console.log(num)

        },
        nextpage :function(page){
            console.log(page)
            let vm = this
            vm.$store.commit("setPageNumber",page)
            let url = 'http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc='+ (page-1) * 12 +'&size=12'
            axios.get(url)
            .then((res)=>{
                vm.products = res.data.data[0].products
            })
        }
    },
    computed(){

    },
    mounted(){
      let vm = this
      let page = vm.$store.getters.getPagenumber
      let url = 'http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc='+ (page-1) * 12 +'&size=12'
      axios.get(url)
      .then((res)=>{
          vm.products = res.data.data[0].products
          vm.data = res.data.data[0]
          vm.num = Math.ceil(vm.data.total_documents/12)
          vm.page = vm.$store.getters.getPagenumber
          
      })
    }
  }
</script>

<style>
/*  .scrollparent {
    max-height: 1000px;
    overflow:hidden;
  }
  .product {
    max-height: 900px;
    overflow-y: scroll;
    padding-right: -10px;
  }*/
    p.listing_price{
    margin-bottom: 2px !important;
  }
  p.title{
    white-space: nowrap;
    /*overflow: hidden !important;*/
  }
  .product_data{
    overflow-x: hidden;
  }
  .product a {
    text-decoration: none;
  }
  .card{
    margin-bottom: 10px;
  }
  .container{
    padding: 10px !important;
  }
  .progress-circular{
    margin: 44%;
    position: absolute;

  }
  .card__title {
    padding: 2px 0 5px 2px;
    justify-content: center;
  }
  .subheading{
    margin-bottom: 0px;
  }
  .quickView{
    position: relative;
    top: -55px;
    margin-bottom: -24px;
  }
  .dimg {
    height: 300px;
    /*width: 400px;*/
  }
  .dialogCard {
    padding: 25px;
    overflow: hidden;
  }
  .dialogCard div , .dialogCard img {
    margin-bottom: 20px; 
  }
  .inlineradio{
    display: inline-flex;
    padding: 0 15px 0 15px;
  }
</style>