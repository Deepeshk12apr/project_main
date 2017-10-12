<template>
   <main>
     <!-- <div>{{data}}</div> -->
     <br>
     <!-- {{determinepage}} -->
     <!-- <div>{{returnpage()}}</div> -->
    <v-layout class="inline product" row wrap>
         <v-flex xs6 sm4 md3  v-for="product in products" :key="product.title">
            <!-- <nuxt-link :to="'/pdlist?pid='+product.id+'&page=pagedata'"> -->
               <v-card @click="redirectcard(product)">
                  <v-card-media :src="product.images[0]" height="150px">
                  </v-card-media>
                  <v-card-title>
                     <div class="product_data">
                        <p class="subheading">{{product.brand}}</p>                        
                        <p class= "body-1  listing_price"><b>RS {{product.listing_price}}</b></p>
                     </div>
                  </v-card-title>
               </v-card>
            <!-- </nuxt-link> -->
         </v-flex>
    </v-layout>
    <v-dialog v-model="dialog_product" class="hidden-sm-and-down"  persistent :overlay=false>
          <v-card >
          web one
          <v-toolbar dark class="primary">
          <v-btn icon @click.native="closeproduct_popup()" dark>
            <v-icon>close</v-icon>
          </v-btn>
          </v-toolbar>
            <div class="dialogCard" v-if="dproduct">
                  <div class="headline">{{dproduct.title}}</div>
                  <div class="title">{{dproduct.brand.brand || dproduct.brand}}</div>  
                  <div class="title">RS {{dproduct.listing_price}}</div>
                  <img class="dimg" :src='dproduct.images[0]'>
                  <div class="title">Size : {{size}}</div>
                  <div class="inlineradio size" v-for="item in dproduct.size_available">
                      <v-radio  v-bind:label="`${item.size}`" v-model="size" :value="item.product_variation_id">
                      </v-radio>
                  </div>
            </div>            
          </v-card>
        </v-dialog>
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
    
    console.log("inside asyncData")
          axios.get('http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc=0&size=1')
           .then((res)=>{
              let size =  res.data.data[0].total_documents              
              let url = 'http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc=0&size='+size
              console.log("url is :"+ url)
              axios.get('http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc=0&size='+size)
              .then((response)=>{
                    idArray = res.data.data[0].products.map(function(obj,i){
                    let ne= {},page_no = parseInt(i/12)
                    ne.id = obj.id
                    ne.page = page_no 
                    return ne     
                })
              })
            }) 
           // let arrayPage = vm.idArray
           // arrayPage.forEach(function(obj){
           //      console.log("product id: "+ obj.id +" page :" +obj.page + "\n") 
           // })
  },

    data(){
      return {
        products:[],
        dproduct:null,
        data:null,
        dialog_product:false,
        page:1,
        num: 1,
        size:0,
        idArray:[],
        pagedata:[]
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
        redirectcard: function(product){
          let vm = this
          let page =  vm.page //this.returnpage()
          let url = '/pdlist?page='+page+'&pid=' + product.id
          vm.dproduct = product
          vm.$nuxt.$router.replace(url)
          vm.dialog_product = true
        },
        closeproduct_popup:function(){
          let vm = this
          let page =  vm.page
          let url = '/pdlist?page='+page
          vm.dialog_product = false
          vm.$nuxt.$router.replace(url)
        },
        loaddialogdirectly_web:function(pid){
            let vm = this 
            vm.dialog_product = true
            //alert(pid)
            axios.get(`http://52.52.8.87/api/v2/catalogue/product/${+pid}`)
            .then((res) => {
                console.log(res.data.data[0].products)
                vm.dproduct = res.data.data[0].products
              })
            .catch((error) => {
              console.log(error)
              //error({ message: 'User not found', statusCode: 404 })
            })
        },
        returnpage: function(){
            let d = this.pagedata
            console.log(d)
            if(d.length ==  0){
              return 1
            } else {
              return d[0].page
            }            
        },
        opendiaog:function(){
          this.dialog_product = true
        },
        nextpage :function(page){
            console.log(page)
            let vm = this
            vm.$store.commit("setPageNumber",page)
            vm.page = parseInt(page)
            let url = '/pdlist?page='+ page
            let api_url = 'http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc='+ (page-1) * 12 +'&size=12'
            axios.get(api_url)
            .then((res)=>{
                vm.products = res.data.data[0].products
            })
            vm.pagedata = vm.idArray.filter(function(obj){
                    if(obj.page == page){
                        return obj
                    }
            })
           vm.$nuxt.$router.replace(url)
        },
    },
    computed : {
        // determinepage:function(){
        //    let vm = this
        //   axios.get('http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc=0&size=1')
        //    .then((res)=>{
        //       let size =  res.data.data[0].total_documents
        //       let innnervm = vm
        //       let url = 'http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc=0&size='+size
        //       console.log("url is :"+ url)
        //       axios.get('http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc=0&size='+size)
        //       .then((response)=>{
        //             innnervm.idArray = res.data.data[0].products.map(function(obj,i){
        //             let ne= {},page_no = parseInt(i/12)
        //             ne.id = obj.id
        //             ne.page = page_no 
        //             return ne     
        //         })
        //       })
        //     }) 
        //    let arrayPage = vm.idArray
        //    arrayPage.forEach(function(obj){
        //         console.log("product id: "+ obj.id +" page :" +obj.page + "\n") 
        //    })
        // }
    },
    mounted(){

      if(window.screen.width >=920){

      let vm = this
      let page = vm.$store.getters.getPagenumber
      let url = 'http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc='+ (page-1) * 12 +'&size=12'
      axios.get(url)
      .then((res)=>{
          vm.products = res.data.data[0].products
          vm.data = res.data.data[0]
          vm.num = Math.ceil(vm.data.total_documents/12)
          vm.page = vm.$store.getters.getPagenumber

          let innnervm = vm
          let size =  res.data.data[0].total_documents

          axios.get('http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc=0&size='+size)
               .then((response)=>{
                innnervm.idArray = response.data.data[0].products.map(function(obj,i){
                    let ne= {},page_no = parseInt(i/12)
                    ne.id = obj.id
                    ne.page = page_no
                    return ne 
                })
                innnervm.pagedata = vm.idArray.filter(function(obj){
                        if(obj.page == page){
                           return obj
                         }
                      })
              })


          let q = vm.$nuxt.$route.query
          console.log(q.pid)

          if(q.pid != undefined){
            vm.loaddialogdirectly_web(q.pid)
          }
          if(q.pid == undefined && q.page > 0 ){
            vm.nextpage(q.page)
          }


          vm.returnpage()

          // vm.idArray = res.data.data[0].products.map(function(obj,i){
          //     let ne= {},page_no = parseInt(i/12)
          //     ne.id = obj.id
          //     ne.page = page_no 
          //     return ne     
          // })
          
      })
    }
  }
}
</script>

<style scoped>
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
  .overlay--active{
    display: none !important;
  }
</style>