<template>
<v-layout column >          
    <v-dialog class="hidden-md-and-up" v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
        <!-- <v-btn primary dark slot="activator">Filters</v-btn>  -->
        <v-card >
            <v-toolbar dark class="primary">
                <v-btn icon @click.native="dialog = false" dark>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click.native="dialog = false">Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <hr>
            <div class="faded"><br>
                <h4>Brand</h4>
                <div class="maincategory" v-for="brand in filters.brand">
                    <v-checkbox :label="brand.key" @change = "applyfilter" v-model="brands" :value="brand.key"></v-checkbox>
                </div>
                <hr>
            </div>
        </v-card>
    </v-dialog>
    <div class="">
      <v-layout row  class="scroll" @scroll="handleScroll">
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
             <!-- <v-layout class="inline" row wrap>
                <product-list-component></product-list-component>
             </v-layout> -->
             <!-- <p>{{$route.params}}</p> -->
             <!-- <keep-alive> -->
                <v-layout class="inline" row wrap >
                <v-btn primary dark  @click.native.stop="openfilters()" class= "filterbtn">Filters</v-btn>
                    <no-ssr>
                    <product-list-mob></product-list-mob>
                    </no-ssr>
                </v-layout>
             <!-- </keep-alive>    -->
          </v-flex>
        </v-layout>
      </div>
<!--       <v-container fluid grid-list-md class="hidden-md-and-up grey lighten-4">
      <v-layout class="inline" row wrap>
           <product-list-mob></product-list-mob>
      </v-layout>
    </v-container> -->
<!--     <v-btn @click.native.stop="openfilters()" absolute dark bottom right fab right class="pink sortbtn">
      <v-icon>sort</v-icon>
    </v-btn>
    <v-btn @click.native.stop="openfilters()" absolute dark bottom right fab right class="pink filterbtn">
      <v-icon>list</v-icon>
    </v-btn> -->
    <no-ssr>
        <nuxt-child :key="$route.params.id"/>  
    </no-ssr>
    </v-layout>
</template>

<script>
import ProductListComponent from '../components/product-list-component.vue'
import ProductListMob from '../components/product-list-mob.vue'
import eventHub from '~plugins/event-hub' 
import NoSSR from 'vue-no-ssr'
//import vuescroll from 'vue-scroll'
import axios from 'axios'

export default {
    // for filters
    asyncData({
        store,
        params
    }, callback) {
        let config = {
            Authorization: store.getters.getToken.toString()
        }
        axios.get('http://52.52.8.87/api/v2/catalogue/filters/?shop=HighStreet', {
                headers: config
            })
            .then((res) => {
                callback(null, {
                    filters: res.data.data[0]
                })
            })
    },

    data() {
        return {
            dialog: false,
            colors: null,
            position:0,
            brands: [],
            category: [],
            filter:false
        }
    },
    computed : {
      
    },
    methods: {
          applyfilter : function(){
            console.log("applyfilter")
              eventHub.$emit('emitfilter',this.brands)
          },
          // capture: function(e){
          //   // console.log(e.srcElement)
          //   // console.log(e.clientX)
          //   // console.log(e.clientY)
          //   console.log(window.scrollX)
          //   console.log(window.scrollY)
          //   this.$store.state.clientX = window.scrollX
          //   this.$store.state.clientY = window.scrollY
          // },
        scrollBehavior : function(to, from, savedPosition) {
          // savedPosition is only available for popstate navigations.
          if (savedPosition) {
            return savedPosition
          } else {
            let position = {}
            // if no children detected
            if (to.matched.length < 2) {
              // scroll to the top of the page
              position = { x: 0, y: 0 }
            }
            else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
              // if one of the children has scrollToTop option set to true
              position = { x: 0, y: 0 }
            }
            // if link has anchor,  scroll to anchor by returning the selector
            if (to.hash) {
              position = { selector: to.hash }
            }
            return position
          }
        }, 
        onScroll:function(e, position){
            this.position = position;
            console.log("posiion : " + this.position)
        },
        handleScroll: function(e) {
              var currentScrollPosition = e.srcElement.scrollTop;
              if (currentScrollPosition > this.scrollPosition) {
                  console.log("Scrolling do`n" + this.scrollPosition );
              } else if (currentScrollPosition < this.scrollPosition){
                console.log("Scrolling up");
              }
              this.scrollPosition = currentScrollPosition;
        },
        openfilters(){
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
      productListMob : ProductListMob,
      'no-ssr': NoSSR },
    scrollToTop: false,
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