<template>
   <main class="pdlist_main">
    <v-snackbar
      :timeout="timeout"
      :color="snackcolor"
      v-model="snackbar"
    > {{snacktext}} <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
      <div   class="loader"  v-if="list.length > 0">
      </div>
      <div v-else>
         <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" class="purple--text"></v-progress-circular>
      </div>
      <!-- <div>{{offsetTop}}</div> -->
      <div class="">
         <v-layout class="inline product" row wrap>
            <div v-if="noProductsFound">
               <h4>No products found </h4>
            </div>
            <!-- <div v-else> -->
            <v-flex xs6 sm4 md3  v-for="product in list" :key="product.title" >
               <!-- <nuxt-link :to="'/pdlist/'+product.id"> -->
               <v-card class="product_card" @click="indivisualproduct(product)">
                  <!-- <v-card @click="loaddialogdirectly(product.product_attr_id)"> -->
                  <v-card-media :src="product.images[0]" height="240px" widht="180px !important">
                  </v-card-media>
                  <!-- <p>{{product.images}}</p> -->
                  <div class="product_data">
                     <p class="label_brand">{{product.brand | capitalize}}</p>
                     <p class="label_title">{{product.title}}</p>
                     <p class= "listing_price"><b>&#8377 {{product.listing_price}}</b></p>
                  </div>
                  
               </v-card>
               <!-- </nuxt-link> -->
               <!-- <v-btn icon class="quickView" @click.native.stop="opendialog(product)">
                  <v-icon>remove_red_eye</v-icon>
               </v-btn> -->
            </v-flex>   
            <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
            <!-- </div> -->
            <v-dialog id="dialogProduct"  v-model="dialog_mob" persistent fullscreen :transition="gettransition" :overlay=false>
               <v-card v-if="dproduct" class ="hidden-sm-and-down ">
                  <v-toolbar dark absolute class="primary" scroll-off-screen scroll-target="#pdc">
                     <v-btn icon @click.native="closedialog" dark>
                        <v-icon>close</v-icon>
                     </v-btn>
                  </v-toolbar>
                  <v-layout row class="hidden-sm-and-down web_product">
                     <div class="smallImg_container">
                        <ul v-for= "img in dproduct.images">
                           <li><img class="small_img" :src='img' @click='changeImg(img)' ></li>
                        </ul>
                     </div>
                     <div>
                        <img id="p_img" class="web_img" :src='dproduct.images[0]' >
                     </div>
                     <div class="web_productData">
                        <div class="headline">{{dproduct.title}}</div>
                        <div class="title brand">{{dproduct.brand.brand}}</div>
                        <div class="title price">&#8377 {{dproduct.listing_price}}</div>
                        <div class="label_title color">color</div>
                        <div class="inlineradio color" v-for="color in dproduct.color">
                           <v-radio  v-model="colors" :value="color.color" v-bind:style="{ 'background-color': `${color.hex_code}`,height: '40px',width: '40px',margin:'0px' }">
                           </v-radio>
                        </div>
                        <div class="label_title size">Size: {{productSize}} </div>
                        <div class="inlineradio size" v-for="item in dproduct.size_available">
                           <v-radio  v-bind:label="`${item.size}`" v-model="productSize" :value="item.product_variation_id"
                              v-bind:style="{ height: '40px',width: '40px',margin:'0px' }"
                              >
                           </v-radio>
                        </div>
                        <br>
                        <div class="sizeGuide" >
                           <a href="/">Size Guide</a>  
                        </div>
                        <div class="quantity">
                           <label class="label_title" >Quantity</label> <br>
                           <div class="count">{{quantity}}</div>
                           <div class="inc" @click= "inc(dproduct.size_available)"> + </div>
                           <div class="dec" @click= "dec(dproduct.size_available)"> - </div>
                        </div>
                        <v-btn @click.native='addtoCart()' class="green addtocart" block secondary >Add to Cart</v-btn>
                        <div class="Notify-me-when-avail ">
                           <a href="/">Notify me when available</a>
                        </div>
                     </div>
                  </v-layout>
                  <div class="hidden-sm-and-down">
                     <div class="Share-with-a-friend ">
                        Share with a friend
                        <div>
                           <a href="'whatsapp://send?text=localhost:3000/'+$route.fullPath">
                           <img class="shareicons" src="https://i.pinimg.com/originals/b3/dd/83/b3dd835904f90189f282cd5ed1cbaaba.png">
                           </a>
                           <img class="shareicons" src="http://store-images.s-microsoft.com/image/apps.7488.13510798886918977.69182166-f125-495d-80d2-44fdaab21523.8fcea13e-5d9a-48a9-9937-b26deeced1b5">
                           <img class="shareicons at" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/At_Sign_Nimbus.svg/2000px-At_Sign_Nimbus.svg.png">
                        </div>
                     </div>
                  </div>
               </v-card>
               <v-card class ="hidden-md-and-up">
                  <v-toolbar dark absolute class="primary" scroll-off-screen scroll-target="#pdc">
                     <v-btn icon @click.native="closedialog" dark>
                        <v-icon>close</v-icon>
                     </v-btn>
                  </v-toolbar>
                  <div id="pdc" class="dialogCard" v-if="dproduct">
                     <v-breadcrumbs divider="/">
                        <v-breadcrumbs-item 
                           v-for="item in bcItems" :key="item"
                           :disabled="item.disabled"
                           >
                           {{ item }}
                        </v-breadcrumbs-item>
                     </v-breadcrumbs>
                     <div class="headline label_title">{{dproduct.title}}</div>
                     <div class="title label_brand">{{dproduct.brand.brand}}</div>
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
                     <div class="price_fav_block">
                        <div class="title label_price inline-block" >&#8377 {{dproduct.listing_price}}</div>
                        <div class="inline-block fav_block">
                           <v-btn icon :ripple="false" @click.native="togglelove(dproduct.id)">
                              <div v-if="love">
                                 <v-icon large class="redheart" >favorite_border</v-icon>
                              </div>
                              <div v-else>
                                 <v-icon large >favorite_border</v-icon>
                              </div>
                           </v-btn>
                        </div>
                     </div>
                     <div class="label_part color">COLOUR</div>
                     <div class="inlineradio color" v-for="color in dproduct.color">
                        <v-radio  v-model="colors" :value="color.color" v-bind:style="{ 'background-color': `${color.hex_code}`,height: '40px',width: '40px',margin:'0px' }">
                        </v-radio>
                     </div>
                     <div class="label_part size">SIZE : {{productSize}} </div>
                     <div class="inlineradio size" v-for="item in dproduct.size_available">
                        <v-radio  v-bind:label="`${item.size}`" v-model="productSize" :value="item.product_variation_id"
                           v-bind:style="{ height: '40px',width: '40px',margin:'0px' }"
                           >
                        </v-radio>
                     </div>
                     <div class="sizeGuide" >
                        <a href="/">Size Guide</a>  
                     </div>
                     <div class="quantity">
                        <label class="label_part" >QUANTITIY</label> <br> 
                        <div>{{quantity}}</div>
                        <div @click= "inc(dproduct.size_available)"> + </div>
                        <div @click= "dec(dproduct.size_available)"> - </div>
                     </div>
                     <v-btn @click.native='addtoCart()' class="green addtocart" block secondary >Add to Kart</v-btn>
                     <br><br>                     
                     <v-btn v-clipboard:copy="'localhost:3000/'+$route.fullPath" v-clipboard:success="onCopy" >submit</v-btn>
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
                     <div class="Share-with-a-friend ">
                        Share with a friend
                        <div>
                           <a href="'whatsapp://send?text='+$route.fullPath">
                           <img class="shareicons" src="https://i.pinimg.com/originals/b3/dd/83/b3dd835904f90189f282cd5ed1cbaaba.png">
                           </a>
                           <img class="shareicons" src="http://store-images.s-microsoft.com/image/apps.7488.13510798886918977.69182166-f125-495d-80d2-44fdaab21523.8fcea13e-5d9a-48a9-9937-b26deeced1b5">
                           <img class="shareicons at" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/At_Sign_Nimbus.svg/2000px-At_Sign_Nimbus.svg.png">
                        </div>
                     </div>
                  </div>
               </v-card>
            </v-dialog>
            <div v-if="dproduct">
               <v-layout row justify-center style="position: relative;">
                  <v-dialog v-model="dialog" class="already" lazy absolute>
                     <!-- <v-btn primary dark slot="activator">Open Dialog</v-btn> -->
                     <div v-if="dproductloading">
                        <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" class="purple--text"></v-progress-circular>
                     </div>
                     <div v-else>
                        <v-card>
                           <v-card-title>
                              <div class="headline">Alert</div>
                           </v-card-title>
                           <v-card-text>Product "<b> {{dproduct.title}} </b>" already added in cart, do you want to increse count or discard adding product</v-card-text>
                           <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
                              <v-btn class="green--text darken-1" flat="flat" @click.native="putnewQuantity()">Agree</v-btn>
                           </v-card-actions>
                        </v-card>
                     </div>
                  </v-dialog>
               </v-layout>
            </div>
         </v-layout>
      </div>
   </main>
</template>
<script>
import axios from 'axios'
import eventHub from '~plugins/event-hub'
import filters from '~plugins/filters'
import Raven from '~plugins/Raven'
import NoSSR from 'vue-no-ssr'
import InfiniteLoading from './InfiniteLoading.vue'
import { inc , dec } from '../utils/commonFunction'

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

    asyncData({
        params,
        store
    }, callback) {
        let config = {
            Authorization: store.getters.getToken.toString()
        }
        let url = "http://apidev.zapyle.com/api/v2/user/love/"
        console.log('asyncData')
        return axios.get(url, {
                headers: config
            })
            .then((res) => {
                //console.log(JSON.stringify(response.data.data[0].data))     
                callback(null, {
                    lovelist: response.data.data[0].data
                })
            })
    },
    // filters: {
    //   capitalize: function (value) {
    //     if (!value) return ''
    //     value = value.toString()
    //     return value.charAt(0).toUpperCase() + value.slice(1)
    //   }
    // },
    data() {
        return {
            list: [],
            //lovelist:[],
            bcItems: [],
            love: null,
            quantity: 1,
            from_doc: 0,
            colors: '',
            loading: true,
            dialog: false,
            transition: null,
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
            noProductsFound: false,
            dproductloading: true,
            timeout: 4000,
            snacktext: '',
            snackcolor: '',
            snackbar: false,
            previousScroll: 0
        }
    },
    computed: {
        gettransition: function() {
            let width = window.screen.width
            if (width >= 1024) {
                this.transition = 'fade-transition'
            } else {
                this.transition = 'dialog-bottom-transition'
            }
            return this.transition

        }
    },
    methods: {
        bringmenu: function() {
            var currentScroll = document.documentElement.scrollTop

            if (currentScroll > this.previousScroll) {
                console.log('down')
                document.getElementById('filter_toolbar').style.top = "-20%"
            } else {
                console.log('up')
                document.getElementById('filter_toolbar').style.top = "0"
            }
            this.previousScroll = currentScroll
        },
        geturl: function() {
            let url = " document.URL"
            alert(url)
            return url
        },
        onCopy: function(e) {
            alert("coupon code coipied")
        },
        togglelove: function(pid) {

            this.love = !this.love

            let vm = this
            let url = "http://apidev.zapyle.com/api/v2/user/love/" + pid
            let config = {
                Authorization: this.$store.getters.getToken.toString()
            }
            axios.get(url, {
                    headers: config
                })
                .then(response => {
                    console.log(response.data.data[0].data)
                    let result = response.data.data[0].data == 'Loved' ? true : false
                    // vm.$router.go()
                    // vm.love = result
                    // vm.islove()
                })
        },
        islove: function(pid) {
            let vm = this
            let val = null
            let url = "http://apidev.zapyle.com/api/v2/user/love/"
            let config = {
                Authorization: this.$store.getters.getToken.toString()
            }
            axios.get(url, {
                    headers: config
                })
                .then(response => {
                    console.log(JSON.stringify(response.data.data[0].data))
                    let p = response.data.data[0].data.filter(function(obj) {
                        return obj.id == 104
                    })
                    if (p.length) {
                        val = true
                    } else {
                        val = false
                    }
                })

            return val

        },
        changeImg: function(img) {
            document.getElementById('p_img').src = img;
        },
        inc: function(sizearr) {
            let vm = this
            if (vm.productSize == null) {
                alert('select size first')
                return
            }
            let quantity_available = sizearr.map(function(obj) {
                if (obj.product_variation_id == vm.size)
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
            let url = 'http://apidev.zapyle.com/api/v2/cart/' + itemid + '/'
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
        repostionScroll() {
            let pos = window.localStorage.scrollY
            let data = window.localStorage.productlist
            console.log(JSON.parse(data))
            this.list = JSON.parse(data)
            // let currpos = window.scrollY
            //alert(pos + " and " + currpos)
            console.log("pos from close dialog" + pos)
            window.scrollTo(0, pos - 100)
        },
        closedialog: function() {

            let pos = window.localStorage.scrollY
            window.scrollTo(0, pos)
            //this.$router.push('pdlist',this.repostionScroll) 
            //this.$router.go(-1)
            var el = document.getElementsByClassName('overlay')
            if (el && el.length > 0) {
                if (el[0].classList.contains("overlay--active")) {
                    el[0].classList.remove('overlay--active')
                }
            }
            this.dialog_mob = false
            //          
        },
        indivisualproduct: function(product) {

            if (this.$store.getters.getToken.split('Token')[1].trim() == 'null') {
                this.redirectcardviacache(product)
            } else {
                this.redirectcard(product)
            }

        },
        redirectcardviacache: function(product) {

            let position = window.scrollY
            console.log("window.scrollY" + window.scrollY)
            window.localStorage.setItem('scrollY', position)
            delete window.$nuxt.$route.query['pid']
            let str = ''
            let obj = window.$nuxt.$route.query
            for (var i in obj) {
                str += i + '=' + obj[i]
                str = '&' + str
            }
            //let query = '/pdlist?'+this.$nuxt.$route.fullPath.split('?')[1] +'&pid=' + product.id
            let query = '/pdlist?pid=' + product.id + str
            this.$nuxt.$router.replace(query)
            this.dproduct = product
            this.dialog_mob = true
        },
        redirectcard: function(product) {
            //this.$nuxt.$router.replace('?pid=' + product.id)
            this.dproduct = product
            let position = window.scrollY
            console.log("window.scrollY" + window.scrollY)
            window.localStorage.setItem('scrollY', position)

            delete this.$route.query['pid']
            let str = '',
                strarr = []
            let obj = window.$nuxt.$route.query
            let objkeys = Object.keys(obj)
            let objvalues = Object.values(obj)

            this.bcItems = []
            this.bcItems.push('Discover')
            //this.bcItems.push(objkeys)
            let vm = this

            objkeys.forEach(function(value, i) {
                vm.bcItems.push(objvalues[i])
                strarr[i] = value + '=' + objvalues[i]
            })
            str = '&' + strarr.join('&')
            // for(var i in obj){             
            //   str =  i + '=' + obj[i]
            //   str= '&' + str                          
            // }
            //let query = '/pdlist?'+this.$nuxt.$route.fullPath.split('?')[1] +'&pid=' + product.id
            let query = '/pdlist?pid=' + product.product_attr_id + str
            this.$nuxt.$router.replace(query)
            // let vm =  this
            let config = {
                Authorization: vm.$store.getters.getToken.toString()
            }
            axios.get(`http://apidev.zapyle.com/api/v2/catalogue/product/${+ product.product_attr_id}`, {
                    headers: config
                })
                .then((res) => {
                    console.log(res.data.data[0].products)
                    //vm.dproductloading = false
                    //vm.dproduct = res.data.data[0].products
                    vm.love = res.data.data[0].products.is_loved
                })
                .catch((e) => {

                    console.log(e.message)
                })

            //this.dproduct = product
            this.dialog_mob = true
        },
        loaddialogdirectly: function(pid) {
            let vm = this
            vm.dialog_mob = true
            //alert(pid)
            this.bcItems.push('Discover')
            let obj = window.$nuxt.$route.query
            let objvalues = Object.values(obj)
            delete objvalues[0]
            objvalues.forEach(function(value, i) {
                vm.bcItems.push(value)
            })

            let config = {
                Authorization: vm.$store.getters.getToken.toString()
            }
            axios.get(`http://apidev.zapyle.com/api/v2/catalogue/product/${+pid}`, {
                    headers: config
                })
                .then((res) => {
                    console.log(res.data.data[0].products)
                    vm.dproduct = res.data.data[0].products
                    vm.love = res.data.data[0].products.is_loved
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
        viacategory: function() {
            let q = vm.$nuxt.$route.query
            return q.category
        },
        filterpanel: function(vm, filter) {
            let fltr = ''
            if (typeof(filter) != "undefined") {
                fltr = '&applied_filter=' + JSON.stringify(filter)
            }
            return filter
        },
        searchquery: function(vm) {
            let q = vm.$nuxt.$route.query
            let search = ''
            if (q.search != undefined) {
                let val = q.search
                search = {
                    query: [val]
                }

                //search = JSON.stringify(search)
                console.log(search)
                //search =  "&applied_filter=" + search
                return search
            }
        },

        onInfinite: function(param) {
            //alert("infinite scroll")
            // if (window.screen.width <= 920) {
            

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
                let filterQuery
                if (fltr) {
                    if (Object.keys(fltr).length) {
                        filterQuery = vm.filterpanel(vm, fltr)
                    }
                }

                if (param) {
                    this.from_doc = 0
                }

                let cat_query, sub_cat

                //category from query parameter
                if (param != undefined && param != true && this.from_doc == 0) {
                    cat_query = param.split('/')[0]
                    sub_cat = param.split('/')[1]
                } else {
                    cat_query = vm.$nuxt.$route.query.category
                }

                //
                let category = {
                    "parent_category_name": [cat_query]
                }
                let sub_category = {
                    "category": [sub_cat]
                }
                if (sub_category.category[0] != undefined && sub_category.category[0] != "undefined") {
                    category = Object.assign(category, sub_category)
                }

                console.log(category)

                let fd = this.from_doc
                let url = 'http://apidev.zapyle.com/api/v2/catalogue/elastic-products/'
                let limits = '?from_doc=' + fd + '&size=' + vm.size
                url = url + limits


                if (searchQuery) {
                    if (searchQuery && filterQuery) {
                        url = url + "&applied_filter=" + encodeURIComponent(JSON.stringify(Object.assign(searchQuery, filterQuery)).replace(/\\/g, ""))
                    } else if (searchQuery) {
                        url = url + "&applied_filter=" + encodeURIComponent(JSON.stringify(searchQuery))
                    }
                } else if (Object.values(category.parent_category_name)[0] != undefined) {
                    if (category.parent_category_name && filterQuery != '{}' && filterQuery != undefined) {
                        url = url + "&applied_filter=" + encodeURIComponent(JSON.stringify(Object.assign(category, filterQuery)).replace(/\\/g, ""))
                    } else if (category.parent_category_name) {
                        url = url + "&applied_filter=" + encodeURIComponent(JSON.stringify(category))
                    }
                } else if (filterQuery) {
                    url = url + "&applied_filter=" + encodeURIComponent(JSON.stringify(filterQuery).replace(/\\/g, ""))
                } else {
                    url = url
                }

                if (typeof(filterQuery) != "undefined") {
                    if (param) {
                        // url = url + "&applied_filter=" + search
                        axios.get(url)
                            .then((res) => {
                                vm.list = []
                                //vm.list = vm.list.concat(res.data.data[0].products)
                                let totalProduct = res.data.data[0].total_documents
                                let productCount = res.data.data[0].products.length

                                if (totalProduct == 0) {
                                    vm.noProductsFound = true
                                    return
                                }

                                if (productCount) {
                                    vm.list = vm.list.concat(res.data.data[0].products)
                                    fd = fd + 12
                                    vm.from_doc = fd
                                    vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                                }

                            })
                    } else {
                        axios.get(url)
                            .then((res) => {
                                //callback(null, { products: res.data.data[0].products })
                                let totalProduct = res.data.data[0].total_documents
                                let productCount = res.data.data[0].products.length

                                if (totalProduct == 0) {
                                    vm.noProductsFound = true
                                    return
                                }

                                if (productCount) {
                                    vm.list = vm.list.concat(res.data.data[0].products)
                                    fd = fd + 12
                                    vm.from_doc = fd
                                    vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                                } else {
                                    // vm.noProductsFound = true
                                }

                                //vm.fd_page = vm.fd_page + 1
                                //window.localStorage.setItem('scrollY', window.scrollY)
                                //vm.$nuxt.$router.replace('?page='+ vm.fd_page)
                            })
                    }
                } else {
                    axios.get(url)
                        .then((res) => {
                            //callback(null, { products: res.data.data[0].products })
                            let totalProduct = res.data.data[0].total_documents
                            let productCount = res.data.data[0].products.length

                            if (totalProduct == 0) {
                                vm.noProductsFound = true
                                return
                            }

                            if (productCount) {
                                vm.list = vm.list.concat(res.data.data[0].products)
                                fd = fd + 12
                                vm.from_doc = fd
                                vm.$store.commit('setFromDoc', JSON.stringify(vm.from_doc))
                                vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
                            }
                        })
                        .catch((e) => {

                            console.log(e.message)
                        })

                }
                vm.$store.commit('setproductlist', JSON.stringify(vm.list))
                window.localStorage.setItem('productlist', JSON.stringify(vm.list))
            
        },

        addtoCart: function() {
            let vm = this

            if (!vm.$store.state.islogged) {
                if (vm.$store.getters.getToken.split('Token')[1].trim() == "null") {
                    axios.get('http://apidev.zapyle.com/api/v2/user/create-guest/')
                        .then((res) => {
                            console.log(res.data.data[0].user.authentication_token)
                            let gt = res.data.data[0].user.authentication_token
                            vm.$store.commit('setGuestToken', res.data.data[0].user.authentication_token)
                            setguestToken(res.data.data[0].user.authentication_token)
                            axios.post('http://apidev.zapyle.com/api/v2/cart/', {
                                    "product": vm.productSize,
                                    "quantity": vm.quantity
                                }, {
                                    headers: {
                                        'Authorization': "Token " + gt
                                    }
                                })
                                .then((res) => {
                                    // vm.alertsuccess = true
                                    vm.snacktext = res.data.data[0].item
                                    vm.snackbar = true
                                    console.log(res.data)
                                })
                                .catch((e) => {

                                    console.log("error " + e.response.data.error.message)
                                    vm.snacktext = e.response.data.error.message
                                    vm.snackbar = true
                                    alert(e.response.data.error.message)
                                    if (e.response.data.error.code == 1002)
                                        alert('eroor while adding to cart')
                                })
                        })
                } else {
                    console.log(vm.$store.getters.getToken)
                    axios.post('http://apidev.zapyle.com/api/v2/cart/', {
                            "product": vm.productSize,
                            "quantity": vm.quantity
                        }, {
                            headers: {
                                'Authorization': vm.$store.getters.getToken.toString()
                            }
                        })
                        .then((res) => {
                            console.log(res.data)
                            vm.snacktext = res.data.data[0].item
                            vm.snackcolor = 'red lighten-2'
                            vm.snackbar = true
                            alert("item added to cart")
                        })
                        .catch((e) => {

                            console.log("error " + e.response.data.error.message)
                            vm.snacktext = e.response.data.error.message
                            vm.snackcolor = 'red lighten-2'
                            vm.snackbar = true
                            alert(e.response.data.error.message)
                            if (e.response.data.error.code == 1002)
                                alert('eroor while adding to cart')
                        })
                }
            }
            // for normal user
            else {
                axios.post('http://apidev.zapyle.com/api/v2/cart/', {
                        "product": vm.productSize,
                        "quantity": vm.quantity
                    }, {
                        headers: {
                            'Authorization': vm.$store.getters.getToken.toString()
                        }
                    })
                    .then((res) => {
                        console.log(res.data)
                        vm.snacktext = res.data.data[0].item
                        vm.snackbar = true

                    })
                    .catch((e) => {

                        console.log("error " + e.response.data.error.message)
                        vm.snacktext = e.response.data.error.message
                        vm.snackbar = true
                        if (e.response.data.error.code == 1002)
                            vm.dialog = true
                    })
            }
        },
    },
    created() {
        //console.log("infiite ")
        eventHub.$on('emitfilter', this.onInfinite)
        eventHub.$on('emitCategory', this.onInfinite)

        window.addEventListener('scroll', this.bringmenu)

        // console.log("Store value for scrollY" + window.localStorage.scrollY)
        // let cy = window.localStorage.scrollY
        // console.log(typeof(cy))
        // window.scroll(0, parseInt(cy))
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

  i.icon.icon--large.material-icons.redheart {
    color : red;
  }

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
    height: 360px;
    width: 270px;
    position: relative;
    display: inline-flex;
    /*overflow-x: scroll;*/
  }
  .subcon img { 
    height: 360px;
    /*width: 270px;*/
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
  .inline-block{
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

  .dialogCard .breadcrumbs{
    justify-content: start;
    padding: 0px;
  } 
  .label_title{
    font-size: 20px !important;
    line-height: 1.5;
    text-align: left;
    color: #47525f;
  }
  .label_brand{
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: Roboto;
    font-size: 14px !important;
    font-weight: bold;
    line-height: 1.43;
    text-align: left;
    color: #47525f; 
  }
  .label_price{
    margin-top: 10px;
    font-family: Roboto;
    font-size: 20px !important;
    font-weight: bold;
    line-height: 2;
    text-align: left;
    color: #47525f;
  }
  .price_fav_block{
    position: relative;
    margin-bottom: 20px; 
  }
  .fav_block{
    float: right;
  }
  .inlineradio{
    display: inline-flex;
    padding: 0 !important;
  }
  .size .input-group__input, .color .input-group__input{
    visibility: hidden;
  }
  .size .input-group--selection-controls label{
    background-color: #eaebf0;
  }
  .label_part{
    font-family: Roboto;
    font-size: 14px;
    line-height: 1.43;
    text-align: left;
    color: #47525f;
  }
  .label_part.size{
    margin-bottom: 10px;
    margin-top: 20px;
  }
  .label_part.color{
    margin-bottom: 10px;
  }
  .fix{
    position: fixed;
  }
  .already .card {
    margin-bottom: 0px !important;
  }
    .quantity div{
    margin: 10px 10px 0px 10px;
    position: relative;
    height: 40px;
    width: 40px;
    padding: 12px;
    font-size: 14px;
    background-color: #eaebf0;
    display: inline-block;
  }
  .quantity{
    margin: 20px 0 20px 0;
  }
    .sizeGuide{
    margin-top: 20px;
  }
  .sizeGuide a {
    font-size: 12px;
    line-height: 1.67;
    text-align: left;
    color: #47525f;
  }
  .addtocart{
     /*width: 335px;*/
     height: 60px;
  }
    .Share-with-a-friend {
  width: 151px;
  height: 40px;
  font-family: Roboto;
  margin-top: 20px !important;
  margin-bottom: 20px !important;
  margin: auto;
  font-size: 18px;
  font-weight: 500;
  line-height: 2.22;
  text-align: center;
  color: #47525f;
}
.shareicons {
  width: 40px;
  height: 40px;
}
.at{
  padding:6px;
}
.smallImg_container{
  height: 600px;
  margin-bottom: 5px;
  display: inline-block;
}
.small_img{
   width: 60px;
   height: 80px;
}
.web_img_container{
  display: inline-block;
}
.web_img{
    /*max-width: 100%;*/
    width: 420px;
    /*height:auto;*/
    height: 560px;
    /*padding: 10px 20px 10px 20px;*/
    margin-right: 40px;
    margin-left: 20px;
  }
  .web_product{
    margin-top: 20px !important;
    max-width: 986px;
    margin: auto;
  }
    .web_productData .price{
    margin-top: 20px;
    /*margin-bottom: 20px;*/
    font-size: 20px !important;

  }
  .web_productData .brand,
  .web_productData .headline{
    margin-bottom: 10px;
    color: #47525f;
    font-size: 20px !important;
  }
  .web_productData .brand{
    font-size: 14px !important;
  }
  .product_card{
    cursor: pointer;
    margin-right: 20px;
    box-shadow: none;
  }
  .product_data .label_brand,.product_data .label_title{
    font-family: Roboto;
    margin-bottom: 5px;
    font-size: 12px !important;
    line-height: 1.5;
    text-align: left;
    color: #47525f; 
  }
  .product_data .label_price {
    font-family: Roboto;
    font-size: 14px !important;
    font-weight: bold;
    line-height: 1.14;
    text-align: left;
    color: #47525f;
  }
  .pdlist_main{
    /*max-width: 780px;*/
    /*margin:auto;*/
  }
</style>