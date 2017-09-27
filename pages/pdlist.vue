<template>
<v-layout column >          
    <v-dialog class="hidden-md-and-up" persistent v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
        <v-card >
            <v-toolbar dark  class="primary">
                <v-btn icon @click.native="dialog = false" dark>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click.native="applyfilter()">Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <hr>
            <div class="faded"><br>
                <h4>Brand</h4>
                <div class="maincategory" v-for="brand in filters.brand">
                    <v-checkbox :label="brand.key" v-model="brands" :value="brand.key"></v-checkbox>
                </div>
                <h4>Colors</h4>
                <!-- <p>{{filters}}</p> -->
                <div class="maincategory" v-for="c in filters.color">
                    <v-checkbox :label="c.key" v-model="colors" :value="c.key"></v-checkbox>
                </div>
                <hr>
            </div>
        </v-card>
    </v-dialog>
   
      <v-layout row  class="scroll">
          <v-flex md3 lg3 offset-mg2 offset-lg2 class="hidden-sm-and-down">
              <p>Brand</p>
              <div class="maincategory" v-for="brand in filters.brand">
                  <v-checkbox :label="brand.key" @change = "applyfilter" v-model="brands" :value="brand.key"></v-checkbox>
              </div>
              <p>Color</p>
              <div class="maincategory" v-for="(color,i) in filters.color">
                  <div v-if="i<5">
                      <v-checkbox :label="color.key" v-model="brands" :value="color.key"></v-checkbox>
                  </div>
                  <div v-else>
                      <v-checkbox class="color hidden" :label="color.key" v-model="brands" :value="color.key"></v-checkbox>
                      <div v-if="isShowmore(i,filters.color)">
                          <a @click="showcolor()"> + {{filters.color.length - 5}} more </a>
                      </div>
                  </div>
              </div>
          </v-flex>
           <v-flex sm12 xs12 md9>
                <v-layout class="inline" row wrap >
                <v-btn primary dark  @click.native="openfilters()" class= "hidden-md-and-up filterbtn">Filters</v-btn>
                    <div class= "hidden-md-and-up">
                       <no-ssr>                    
                          <product-list-mob-paged></product-list-mob-paged>          
                       </no-ssr>                      
                    </div>
                    <div class= "hidden-sm-and-down ">
                        <product-list-page></product-list-page>                      
                    </div>
                </v-layout>
          </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
import ProductListPage from '../components/product-list-page.vue'
import ProductListMobPaged from '../components/product-list-mob-paged.vue'
import eventHub from '~plugins/event-hub' 
import NoSSR from 'vue-no-ssr'
//import vuescroll from 'vue-scroll'
import axios from 'axios'

export default {
    // for filters
    asyncData({ store, params}, callback) {
        axios.get('http://52.52.8.87/api/v2/catalogue/filters/?shop=HighStreet')
            .then((res) => {
                callback(null, {
                    filters: res.data.data[0]
                })
            })
    },

    data() {
        return {
            dialog: false,
            colors: [],
            position:0,
            brands: [],
            category: [],
            dp:true,
            filter:false,
            mobile:true
        }
    },
    ready: function() {
        // if( document.clientWidth >= 992 )
        // {
        //     this.mobile = false;
        // }
    },
    computed : {
      
    },
    methods: {
          applyfilter : function(){
            console.log("applyfilter")
            let filters = {
            	brand : this.brands,
            	color : this.colors
            }
              this.$store.commit('setfilter',filters)
              let byfilter = true
              eventHub.$emit('emitfilter',byfilter)
              this.dialog = false
            },
          
          openfilters(){
           		console.log("hit")
         		 this.dialog = true
          },
        //for hiding filters greater than 5 in number isShowmore , showcolor
        isShowmore(count, objArr) {
            if (count + 1 === objArr.length) {
                return true
            } else {
                return false
            }
        },
        showcolor() {
            let elArr = document.getElementsByClassName("color")
            for (let i = 0; i < elArr.length; i++) {
                if (elArr[i].classList.contains("hidden")) {
                    elArr[i].classList.remove('hidden')
                } else {
                    elArr[i].classList.add('hidden')
                }
            }
        }
    },
    components: { 
    	productListMobPaged : ProductListMobPaged,
    	productListPage : ProductListPage,
    	'no-ssr': NoSSR },
    scrollToTop: true,
    middleware: ['infinitscroll', 'authlogin']

}
</script>

<style>
/*  .scrollparent{
    max-height: 100%;
    overflow: hidden;
  }
  .scroll{
    max-height: 99%;
    overflow-y: scroll
  }*/
  .subCat .checkbox{
    margin-left: 25px;
  }
  .maincategory .checkbox{
    margin-left: 25px;
  }
  .faded {
    /*background-color: grey;*/
    /*opacity: 0.8;*/
  }
  .inline {
    /*display: inline-flex;*/
  }
  .maincategory .input-group__details{
    display: none;
  }
  .hidden{
    display: none !important;
  }
  .filterbtn {
    /*margin-bottom: 20%;*/
    /*position: fixed !important;*/
  }
  .sortbtn {
    margin-bottom: 40%;
    position: fixed !important;
  }
</style>