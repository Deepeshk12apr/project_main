<template>
   <main>
      <div v-if="list.length > 0">
      </div>
      <div  class="loader" v-else>
         <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" class="purple--text"></v-progress-circular>
      </div>
      <!-- <div>{{offsetTop}}</div> -->
      <div class="">      
      <v-layout class="inline product" row wrap>
         <v-flex xs6 sm4 md3  v-for="product in list" :key="product.title" >
            <!-- <nuxt-link :to="'/pdlist/'+product.id"> -->
               <v-card @click="redirectcard(product)">
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
            <!-- </nuxt-link> -->
            <v-btn icon class="quickView" @click.native.stop="opendialog(product)">
                 <v-icon>remove_red_eye</v-icon>
            </v-btn>
         </v-flex>
         <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
         <v-dialog class="hidden-md-and-up" v-model="dialog_mob" persistent fullscreen transition="dialog-bottom-transition" :overlay=false>
          <v-card >
          <v-toolbar dark absolute class="primary" scroll-off-screen scroll-target="#pdc">
          <v-btn icon @click.native="dialog_mob = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          </v-toolbar>
            <div id="pdc" class="dialogCard" v-if="dproduct">
                  this one
                  <div class="headline">{{dproduct.title}}</div>
                  <div class="title">{{dproduct.brand.brand}}</div>  
                  <div class="title">RS {{dproduct.listing_price}}</div>
                              <no-ssr> 
            <v-touch v-on:swipeleft="onswipeleft" v-on:swiperight="onswiperight" class="dragme">
            <div id="imgcon" class="subcon">
                 <img id="imgOne" :src='dproduct.images[0]' data-imgid=0 >
                 <img id="imgOne" :src='dproduct.images[1]' data-imgid=1 >
                 <img id="imgOne" :src='dproduct.images[2]' data-imgid=2 >
                 <img id="imgOne" :src='dproduct.images[3]' data-imgid=3 >
                 <img id="imgOne" :src='dproduct.images[4]' data-imgid=4 >
            </div>
            </v-touch>
            </no-ssr>
                           <div class="title">Size : {{productSize}}</div>
         <div class="inlineradio size" v-for="item in dproduct.size_available">
            <!-- <input type="radio" name="size" value="item.product_variation_id"> {{item.size}}<br> -->
            <v-radio  v-bind:label="`${item.size}`" v-model="productSize" :value="item.product_variation_id">
            </v-radio>
         </div>
             <div class="quantity">
                <label class="title" >Quantity</label> <br>
                <div>{{quantity}}</div>
                <div @click= "inc(dproduct.size_available)"> + </div>
                <div @click= "dec(dproduct.size_available)"> - </div>
             </div>
             <!-- <p>{{dproduct}}</p> -->
           <!-- <div class="quantity">
                      <label class="title" >Quantity</label> <br>
                      <div>{{dproduct.quantity}}</div>
                      <div @click= "inc(dproduct.id,dproduct.quantity,dproduct.quantity_available)"> + </div>
                      <div @click= "dec(dproduct.id,dproduct.quantity,dproduct.quantity_available)"> - </div>
                   </div>  -->  
               <v-btn @click.native='addtoCart()' class="green" block secondary >Add to Cart</v-btn>                  
         <br><br>
         <v-expansion-panel expand>
            <v-expansion-panel-content>
               <div slot="header">BRAND DETAILS</div>
               <v-card>
                  <v-card-text class="grey lighten-3">{{dproduct.brand.brand}}  {{dproduct.brand.description}}</v-card-text>
               </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content >
               <div slot="header">PRODUCT DETAILS</div>
               <v-card>
                  <v-card-text class="grey lighten-3">{{dproduct.description}}</v-card-text>
               </v-card>
            </v-expansion-panel-content>
         </v-expansion-panel>
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
import NoSSR from 'vue-no-ssr'
import InfiniteLoading from './InfiniteLoading.vue'
import {
    setproductlist,
    getproductlistFromLocalStorage
} from '../utils/productlist'
import {
    setCart,
    setguestToken
} from '../utils/auth'
import {
    setfrom_doc,
    getfrom_docFromLocalStorage,
    getfrom_docFromCookie
} from '../utils/infinite-scroll'


export default {

    data() {
        return {
            list: [],
            quantity: 1,
            from_doc: 0,
            loading: true,
            dialog_mob: false,
            active: false,
            dproduct: null,
            clientX: null,
            page: 1,
            fd_page: 1,
            clientY: null,
            brandfilter: null,
            scrollPosition: 0,
            size: 12,
            productSize: null,
            offsetTop: 0,
            imgCounter: 0,
            quantity: 1
        }
    },
    methods: {
        inc: function(sizearr) {

            if (this.productSize == null) {
                alert('select size first')
                return
            }
            let quantity_available = sizearr.map(function(obj) {
                if (obj.product_variation_id == 8772)
                    return obj.quantity
            })

            if (this.quantity == quantity_available[0]) {
                alert("No more products available")
            } else {
                this.quantity = this.quantity + 1
            }
            //return  this.quantity++
        },
        dec: function(sizearr) {
            if (this.productSize == null) {
                alert('select size first')
                return
            }
            if (this.quantity > 1) {
                this.quantity = this.quantity - 1
            } else {
                alert('min anount in cart')
            }

            //return  this.quantity--
        },
        quantityUpdate: function(quantity, itemid) {
            console.log("itemid is " + itemid)
            let vm = this
            let url = 'http://52.52.8.87/api/v2/cart/' + itemid + '/'
            axios.put(url, {
                    "quantity": quantity
                }, {
                    headers: {
                        'Authorization': "Token " + vm.$store.state.token
                    }
                })
                .then((res) => {
                    console.log(res.data)
                    vm.$nuxt.$router.go('')
                })
                .catch((e) => {
                    console.log(e)
                    vm.dialog = true
                })
            return this.quantity
        },
        onswiperight: function(e) {
            console.log("imgCounter :" + this.imgCounter)
            if (this.imgCounter > 0) {
                let n = this.imgCounter - 1
                this.imgCounter--
                    console.log("imgCounter :" + this.imgCounter + " n : " + n)
                document.getElementById("imgcon").style.right = n * 280 + "px"
            }
        },
        onswipeleft: function() {
            //alert
            let img = document.getElementById('imgOne')
            if (this.imgCounter < 4) {
                let n = this.imgCounter + 1
                this.imgCounter++
                    console.log("imgCounter :" + this.imgCounter + " n : " + n)
                document.getElementById("imgcon").style.right = n * 280 + "px"
            }
        },
        onScroll(e) {
            console.log("onScrolltop called ")
            this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
        },
        opendialog(product) {
            this.dialog_mob = true
            this.dproduct = product
            console.log(this.dproduct)
        },
        removeDecimal(val) {
            return val.substring(0, val.indexOf('.'));
        },
        redirectcard: function(product) {
            //this.$nuxt.$router.replace('?pid=' + product.id)
            delete window.$nuxt.$route.query['pid']
            let str=''
            let obj= window.$nuxt.$route.query            
            for(var i in obj){
              str = i + '=' + obj[i]
              str= '&' + str
            }
            //let query = '/pdlist?'+this.$nuxt.$route.fullPath.split('?')[1] +'&pid=' + product.id
            let query = '/pdlist?pid=' + product.id + str
            this.$nuxt.$router.replace(query)
            this.dproduct = product
            this.dialog_mob = true
        },
        loaddialogdirectly: function(pid) {
            let vm = this
            vm.dialog_mob = true
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
            // vm.$nuxt.$router.replace('?pid='+ vm.fd_page)
        },
        filterproductlist: function(filter) {

            console.log("selected filters are " + filter)

            if (typeof(filter) != "undefined") {
                if (filter.length > 0) {
                    let val = filter.join('","')
                    fltr = {
                        brand: [val]
                    }
                    fltr = JSON.stringify(fltr)
                    console.log(fltr)
                }
                              // for(f in filter) {
              //       let val = filter[f].join('","')
              //       fltr[f]=val
              //       fltr = JSON.stringify(fltr)
              //       fltr = fltr + ','
                    
              //   }
              //   console.log(fltr)
            }

        },
        filterpanel: function(vm,filter) {
          let fltr= ''
          if (typeof(filter) != "undefined") {
              fltr = '&applied_filter=' + JSON.stringify(filter)
            }
            return fltr
        },
        searchquery: function(vm) {
            let q = vm.$nuxt.$route.query
            let search = ''
            if (q.search != undefined) {            
              let val = q.search
                search = {
                query: [val]
                }
              search = JSON.stringify(search)
              console.log(search)
              search =  "&applied_filter=" + search
              return search
            }
        },

        onInfinite: function(byfilter) {
            //alert("infinite scroll")
            if (window.screen.width <= 920) {

                let vm = this
                let config = {
                    Authorization: this.$store.state.token
                }

                let q = vm.$nuxt.$route.query
                  if (q.pid != undefined && vm.from_doc == 0) {
                  vm.loaddialogdirectly(q.pid)
                  }

                let searchQuery = vm.searchquery(vm)

                //get filter from store
                let fltr = this.$store.getters.getfilter
                console.log("fltr")
                console.log(fltr)
                let filterQuery 
                if(fltr){
                    filterQuery = vm.filterpanel(vm,fltr)                  
                }

                if(byfilter){
                  this.from_doc = 0
                }

                let fd = this.from_doc
                let url = 'http://52.52.8.87/api/v2/catalogue/elastic-products/'
                let limits = '?from_doc=' + fd + '&size=' + vm.size
                url = url + limits

                if(searchQuery)
                url = url + searchQuery
                if(filterQuery)
                url = url + filterQuery  

                if (typeof(filterQuery) != "undefined") {
                    if (byfilter) {
                       // url = url + "&applied_filter=" + search
                        axios.get(url)
                            .then((res) => {
                                vm.list = []
                                //vm.list = vm.list.concat(res.data.data[0].products)
                                vm.list = vm.list.concat(res.data.data[0].products)
                                fd = fd + 12
                                vm.from_doc = fd
                                vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');

                            })
                    } else {
                        axios.get(url)
                            .then((res) => {
                                //callback(null, { products: res.data.data[0].products })
                                vm.list = vm.list.concat(res.data.data[0].products)
                                fd = fd + 12
                                vm.from_doc = fd
                                vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                                vm.fd_page = vm.fd_page + 1
                                //vm.$nuxt.$router.replace('/pdlist?page='+ vm.fd_page)
                            })
                    }
                } else {
                    axios.get(url)
                        .then((res) => {
                            //callback(null, { products: res.data.data[0].products })
                            vm.list = vm.list.concat(res.data.data[0].products)
                            fd = fd + 12
                            vm.from_doc = fd
                            vm.$store.commit('setFromDoc', JSON.stringify(vm.from_doc))
                            vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');

                        })
                }
                vm.$store.commit('setproductlist', JSON.stringify(vm.list))
                window.localStorage.setItem('productlist', JSON.stringify(vm.list))
            }
        },

        addtoCart: function() {
            let vm = this

            if (!vm.$store.state.islogged) {
                if (vm.$store.getters.getToken.split('Token')[1].trim() == "null") {
                    axios.get('http://52.52.8.87/api/v2/user/create-guest/')
                        .then((res) => {
                            console.log(res.data.data[0].user.authentication_token)
                            let gt = res.data.data[0].user.authentication_token
                            vm.$store.commit('setGuestToken', res.data.data[0].user.authentication_token)
                            setguestToken(res.data.data[0].user.authentication_token)
                            axios.post('http://52.52.8.87/api/v2/cart/', {
                                    "product": vm.productSize,
                                    "quantity": vm.quantity
                                }, {
                                    headers: {
                                        'Authorization': "Token " + gt
                                    }
                                })
                                .then((res) => {
                                    vm.alertsuccess = true
                                    console.log(res.data)
                                })
                        })
                } else {
                    console.log(vm.$store.getters.getToken)
                    axios.post('http://52.52.8.87/api/v2/cart/', {
                            "product": vm.productSize,
                            "quantity": vm.quantity
                        }, {
                            headers: {
                                'Authorization': vm.$store.getters.getToken.toString()
                            }
                        })
                        .then((res) => {
                            console.log(res.data)
                            alert("item added to cart")
                        })
                        .catch((e) => {
                            console.log("error " + e.response.data.error.message)
                            if (e.response.data.error.code == 1002)
                                alert('eroor while adding to cart')
                        })
                }
            }
            // for normal user
            else {
                axios.post('http://52.52.8.87/api/v2/cart/', {
                        "product": vm.productSize,
                        "quantity": vm.quantity
                    }, {
                        headers: {
                            'Authorization': vm.$store.getters.getToken.toString()
                        }
                    })
                    .then((res) => {
                        console.log(res.data)
                        vm.alertsuccess = true
                    })
                    .catch((e) => {
                        console.log("error " + e.response.data.error.message)
                        if (e.response.data.error.code == 1002)
                            vm.dialog = true
                    })
            }
        },

        //   onInfinite(filter) {
        //     let fltr = ""
        //     if (typeof(filter) != "undefined") {
        //         if (filter.length > 0) {
        //             let val = filter.join('","')
        //             fltr = {
        //                 brand: [val]
        //             }
        //             fltr = JSON.stringify(fltr)
        //             console.log(fltr)
        //         }
        //     }

        //     let vm = this
        //     let config = {
        //         Authorization: this.$store.state.token
        //     }
        //     let fd = this.from_doc
        //     // let fd_page = (this.page - 1) * 12

        //     let q = vm.$nuxt.$route.query

        //     if(q.page){
        //       console.log("has page"+ q.page)
        //       vm.fd_page = 0
        //       vm.size = q.page *12
        //     }

        //     let url = 'http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc=' + vm.fd_page + '&size='+ vm.size
        //     if (typeof(filter) != "undefined") {
        //         if (filter.length > 0) {
        //             url = url + "&applied_filter=" + fltr
        //             axios.get(url)
        //                 .then((res) => {
        //                     vm.list = []
        //                     vm.list = vm.list.concat(res.data.data[0].products)
        //                     fd = fd + 12
        //                     vm.from_doc = fd
        //                     vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
        //                     vm.fd_page = fd_page + 1
        //                     vm.$nuxt.$router.replace('/pdlist?page='+ vm.fd_page)
        //                 })
        //         } else {
        //             axios.get(url)
        //                 .then((res) => {
        //                     //callback(null, { products: res.data.data[0].products })
        //                     vm.list = vm.list.concat(res.data.data[0].products)
        //                     fd = fd + 12
        //                     vm.from_doc = fd
        //                     vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
        //                     vm.fd_page = fd_page + 1
        //                     vm.$nuxt.$router.replace('/pdlist?page='+ vm.fd_page)
        //                 })
        //         }
        //     } else {
        //         axios.get(url)
        //             .then((res) => {
        //                 //callback(null, { products: res.data.data[0].products })
        //                 vm.list = vm.list.concat(res.data.data[0].products)
        //                 fd = fd + 12
        //                 vm.from_doc = fd
        //                 vm.$store.commit('setFromDoc',JSON.stringify(vm.from_doc))
        //                 vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
        //                 vm.fd_page = vm.size/12
        //                 vm.fd_page = vm.fd_page + 1
        //                 //vm.$nuxt.$router.replace('?page='+ vm.fd_page)
        //                 //window.scrollTo(0,window.$nuxt.$el.scrollHeight)
        //             })
        //     }
        //      vm.$store.commit('setproductlist',JSON.stringify(vm.list))
        //      window.localStorage.setItem('productlist', JSON.stringify(vm.list))
        // },
    },
    created() {
        //console.log("infiite ")
        eventHub.$on('emitfilter', this.onInfinite)

        console.log("Store value for scrollY" + window.localStorage.scrollY)
        let cy = window.localStorage.scrollY
        console.log(typeof(cy))
        window.scroll(0, parseInt(cy))
    },
    components: {
        infiniteLoading: InfiniteLoading,
        'no-ssr': NoSSR
    },
    middleware: ['productlist', 'infinitescroll']
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

    .dragme{
     touch-action:pan-down !important;
     user-select: none !important; 
     -webkit-user-drag: element !important; 
  }
  /*image transition*/
   #imgcon{
     -webkit-transition: all .5s ease-in-out;
     -moz-transition: all .5s ease-in-out;
     -o-transition: all .5s ease-in-out;
     transition: all .5s ease-in-out;
  }
  .pld{
    overflow: hidden;
  }
  .container.fluid {
    overflow: hidden;
  }
  .outer{
    height: 400px; 
    width: 1700px;
    /*position: absolute;*/
    margin: 0px;
  }
  .subcon  {
    height: 350px;
    width: 400px;
    position: relative;
    display: inline-flex;
    /*overflow-x: scroll;*/
  }
  .subcon img {
    height: 350px;
    /*width: 300px;*/
    padding: 10px;
  }

  .inlineradio  {
    display: inline-flex;
   /* padding-left: 15px;
    padding-right: 15px;*/
  }
  .size .input-group__input, .color .input-group__input{
    visibility: hidden;
  }
  .size .input-group--selection-controls label, .color .input-group--selection-controls label{
    margin-left: 0;
    position: relative;
    height: 50px;
    width: 50px;
    padding: 12px;
  }
  .quantity div{
    margin: 10px 10px 25px 10px;
    position: relative;
    height: 50px;
    width: 50px;
    padding: 12px;
    font-size: 20px;
    background-color: grey;
    display: inline-block;
  }
  .quantity{
    margin: 25px 0 25px 0;
  }
  .size .input-group--selection-controls label{
    background-color: grey;
  }
  .input-group__details{
    display: none;
  }
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
    padding: 0 !important;
  }
  .fix{
    position: fixed;
  }
</style>