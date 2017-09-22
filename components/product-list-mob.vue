<template>
   <main>
      <div v-if="list.length > 0">
      </div>
      <div  class="loader" v-else>
         <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" class="purple--text"></v-progress-circular>
      </div>
      <div class="">      
      <v-layout class="inline product" row wrap>
         <v-flex xs6 sm4 md3  v-for="product in list" :key="product.title">
            <nuxt-link :to="'/productlist/'+product.id">
               <v-card>
                  <v-card-media :src="product.images[0]" height="150px">
                  </v-card-media>
                  <!-- <p>{{product.images}}</p> -->
                  <v-card-title>
                     <div class="product_data">
                        <p class="subheading">{{product.brand}}</p>
                        <!-- <p class="body-1 mb-2 title">{{product.title}}</p> -->
                        <p class= "body-1  listing_price"><b>RS {{removeDecimal(product.listing_price)}}</b></p>
                     </div>
                  </v-card-title>
               </v-card>
            </nuxt-link>
            <v-btn icon class="quickView" @click.native.stop="opendialog(product)">
                 <v-icon>remove_red_eye</v-icon>
            </v-btn>
         </v-flex>
         <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
         <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
          <v-card >
          <v-toolbar dark class="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          </v-toolbar>
            <div class="dialogCard" v-if="dproduct">
                  <div class="headline">{{dproduct.title}}</div>
                  <div class="title">{{dproduct.brand}}</div>  
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
    </v-layout>
    </div>
   </main>
</template>

<script>

import axios from 'axios'
import eventHub from '~plugins/event-hub'
import InfiniteLoading from './InfiniteLoading.vue'
import { setproductlist,getproductlistFromLocalStorage } from '../utils/productlist'
import { setfrom_doc, getfrom_docFromLocalStorage, getfrom_docFromCookie} from '../utils/infinite-scroll'


  export default {

    data(){
      return {
            list: [],
            from_doc: 0,
            loading:true,
            dialog:false,
            active: false,
            dproduct:null,
            clientX:null,
            clientY:null,
            brandfilter:null,
            scrollPosition:0,
            size:4
      }
    },
    methods: {
          //  handleScroll: function(e) {
          //     var currentScrollPosition = e.srcElement.scrollTop;
          //     if (currentScrollPosition > this.scrollPosition) {
          //         console.log("Scrolling down" + this.scrollPosition );
          //     } else if (currentScrollPosition < this.scrollPosition){
          //       console.log("Scrolling up");
          //     }
          //     this.scrollPosition = currentScrollPosition;
          // },
          captureddd: function(store){
            // console.log(e.srcElement)
            // console.log(e.clientX)
            // console.log(e.clientY)
            console.log(window.scrollX)
            console.log(window.scrollY)
            this.$store.state.clientX = window.scrollX
            window.localStorage.setItem('scrollY', window.scrollY)
            // this.$store.state.clientY = window.scrollY
          },
          opendialog(product){
            this.dialog = true
            this.dproduct = product
            console.log(this.dproduct)
          },
          removeDecimal(val){
              return val.substring(0, val.indexOf('.'));
          },
          onInfinite(filter) {
            let fltr = ""
            if (typeof(filter) != "undefined") {
                if (filter.length > 0) {
                    let val = filter.join('","')
                    fltr = {
                        brand: [val]
                    }
                    fltr = JSON.stringify(fltr)
                    console.log(fltr)
                }
            }

            let vm = this
            let config = {
                Authorization: this.$store.state.token
            }
            let fd = this.from_doc
            //let prvProductlist = getproductlistFromLocalStorage()
            //let prvdocfrom = getfrom_docFromLocalStorage()

            // if(vm.from_doc == 0){
            //     vm.size = 4
            // } else {
            //   vm.size += vm.from_doc
            //   fd = 0 
            // }

            let url = 'http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc=' + fd + '&size='+ vm.size
            if (typeof(filter) != "undefined") {
                if (filter.length > 0) {
                    url = url + "&applied_filter=" + fltr
                    axios.get(url)
                        .then((res) => {
                            vm.list = []
                            vm.list = vm.list.concat(res.data.data[0].products)
                            fd = fd + 4
                            vm.from_doc = fd
                            vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                        })
                } else {
                    axios.get(url)
                        .then((res) => {
                            //callback(null, { products: res.data.data[0].products })
                            vm.list = vm.list.concat(res.data.data[0].products)
                            fd = fd + 4
                            vm.from_doc = fd
                            vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                        })
                }
            } else {
                axios.get(url)
                    .then((res) => {
                        //callback(null, { products: res.data.data[0].products })
                        vm.list = vm.list.concat(res.data.data[0].products)
                        fd = fd + 4
                        vm.from_doc = fd
                        vm.$store.commit('setFromDoc',JSON.stringify(vm.from_doc))
                        vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                    })
            }
            // setproductlist(JSON.stringify(vm.list))
            // console.log('productlist is getting set')

             //vm.$store.state.productlist = JSON.stringify(vm.list)
             vm.$store.commit('setproductlist',JSON.stringify(vm.list))
             // vm.$store.commit('setFromDoc',JSON.stringify(vm.from_doc))
             window.localStorage.setItem('productlist', JSON.stringify(vm.list))
            // vm.$store.state.from_doc = 5.5
            //console.log("pl" + vm.$store.productlist + "fd" + vm.$store.from_doc)
            //this.$store.commit('setproductlist',JSON.stringify(vm.list))
            //setfrom_doc(vm.from_doc)
            // let str = "";
            // let c = vm.list.filter(function(obj){
            //         str += obj.id.toString() + "/"
            //         return obj.id
            // })
            //console.log("infi : "+ str)
        },
     },
     created(){
        //console.log("infiite ")
        eventHub.$on('emitfilter', this.onInfinite)

        console.log("Store value for scrollY" + window.localStorage.scrollY)
        let cy = window.localStorage.scrollY
        console.log(typeof(cy))
        window.scroll(0,parseInt(cy))
     },
     components:{
        infiniteLoading : InfiniteLoading
     },
     middleware:['productlist','infinitescroll']
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