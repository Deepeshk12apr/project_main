<template>
   <main>
      <v-flex xs4>
         <v-breadcrumbs divider="/">
            <v-breadcrumbs-item 
               v-for="item in items" :key="item.text"
               :disabled="item.disabled"
               >
               {{ item.text }}
            </v-breadcrumbs-item>
         </v-breadcrumbs>
      </v-flex>
      <!-- <v-touch v-on:swipeleft="onSwipeLeft">Swipe me!</v-touch> -->
      <!-- <p>{{product}}</p> -->
      <!-- <p>{{date}}</p> -->
      <div class="hidden-md-and-up" >
         <h3 class="headline">{{product.title}}</h3>
         <h3 class="title">{{product.brand.brand}}</h3>
         <!-- <v-touch @swipe="onswipeleft" class="hidden-md-and-up" >
            <img class="pimmg" :src='product.images[0]' style="width: 300px;">
            </v-touch> -->
            <v-progress-linear :value="imgCounter * 20"></v-progress-linear>
            <no-ssr> 
            <!-- <div class="outer"> -->
            <v-touch v-on:swipeleft="onswipeleft" v-on:swiperight="onswiperight" class="dragme">
            <div id="imgcon" class="subcon">
                 <img id="imgOne" :src='product.images[0]' data-imgid=0 >
                 <img id="imgOne" :src='product.images[1]' data-imgid=1 >
                 <img id="imgOne" :src='product.images[2]' data-imgid=2 >
                 <img id="imgOne" :src='product.images[3]' data-imgid=3 >
                 <img id="imgOne" :src='product.images[4]' data-imgid=4 >
            </div>
            </v-touch>
            <!-- </div> -->
            </no-ssr>
<!--             <div class="outer">
            <div id="imgcon" class="subcon" @scroll="slideimage">
                 <img id="imgOne" :src='product.images[0]' data-imgid=0 >
                 <img id="imgOne" :src='product.images[1]' data-imgid=1 >
                 <img id="imgOne" :src='product.images[2]' data-imgid=2 >
                 <img id="imgOne" :src='product.images[3]' data-imgid=3 >
                 <img id="imgOne" :src='product.images[4]' data-imgid=4 >
            </div></div> -->
         <br>
         <div class="title">RS {{product.listing_price}}</div>
         <div class="title">color</div>
         <div class="inlineradio color" v-for="color in product.color">
            <v-radio v-bind:label="`${color}`" v-model="colors" :value="color" v-bind:style="{ 'background-color': `${color}`,height: '50px',width: '50px' }">
            </v-radio>
         </div>
         <div class="title">Size : {{size}}</div>
         <div class="inlineradio size" v-for="item in product.size_available">
            <!-- <input type="radio" name="size" value="item.product_variation_id"> {{item.size}}<br> -->
            <v-radio  v-bind:label="`${item.size}`" v-model="size" :value="item.product_variation_id">
            </v-radio>
         </div>
         <br>  
         <a href="/">Size Guide</a>
         <div class="quantity">
            <label class="title" >Quantity</label> <br>
            <div>{{quantity}}</div>
            <div @click= "inc()"> + </div>
            <div @click= "dec()"> - </div>
         </div>
         <v-btn @click.native='addtoCart()' class="green" block secondary >Add to Cart</v-btn>
         <br><br>
         <v-expansion-panel expand>
            <v-expansion-panel-content>
               <div slot="header">BRAND DETAILS</div>
               <v-card>
                  <v-card-text class="grey lighten-3">{{product.brand.brand}}  {{product.brand.description}}</v-card-text>
               </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content >
               <div slot="header">PRODUCT DETAILS</div>
               <v-card>
                  <v-card-text class="grey lighten-3">{{product.description}}</v-card-text>
               </v-card>
            </v-expansion-panel-content>
         </v-expansion-panel>
      </div>
      <div>
         <v-layout row class="hidden-sm-and-down">
            <v-flex class="smallImg_container" offset-md2 offset-lg2 >
               <ul v-for= "img in product.images">
                  <li><img class="small_img" :src='img' @click='changeImg(img)' ></li>
               </ul>
            </v-flex>
            <v-flex md4 lg4>
               <img id="p_img" class="web_img" :src='product.images[0]' >
            </v-flex>
            <v-flex md5 lg5 class="web_productData">
               <div class="headline">{{product.title}}</div>
               <div class="title brand">{{product.brand.brand}}</div>
               <div class="title price">RS {{product.listing_price}}</div>
               <div class="title">color</div>
               <div class="inlineradio color" v-for="color in product.color">
                  <v-radio v-bind:label="`${color}`" v-model="colors" :value="color" v-bind:style="{ 'background-color': `${color}`,height: '50px',width: '50px' }">
                  </v-radio>
               </div>
               <div class="title">Size : {{size}}</div>
               <div class="inlineradio size" v-for="item in product.size_available">
                  <!-- <input type="radio" name="size" value="item.product_variation_id"> {{item.size}}<br> -->
                  <v-radio  v-bind:label="`${item.size}`" v-model="size" :value="item.product_variation_id">
                  </v-radio>
               </div>
               <br>  
               <a href="/">Size Guide</a>
               <div class="quantity">
                  <label class="title" >Quantity</label> <br>
                  <div>{{quantity}}</div>
                  <div @click= "inc()"> + </div>
                  <div @click= "dec()"> - </div>
               </div>
               <v-btn @click.native='addtoCart()' class="green" block secondary >Add to Cart</v-btn>
               <br><br>
            </v-flex>
         </v-layout>
         <!-- alert dialog -->
           <v-layout row justify-center style="position: relative;">
            <v-dialog v-model="dialog" lazy absolute>
              <!-- <v-btn primary dark slot="activator">Open Dialog</v-btn> -->
              <v-card>
                <v-card-title>
                  <div class="headline">Alert</div>
                </v-card-title>
                <v-card-text>Product "<b> {{product.title}} </b>" already added in cart, do you want to increse count or discard adding product</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
                  <v-btn class="green--text darken-1" flat="flat" @click.native="putnewQuantity()">Agree</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
          <v-alert info dismissible v-model="alertsuccess">
                  This is a success alert that is closable.
              </v-alert>

              <!-- <snack-bar :result="reset"></snack-bar> -->
      </div>
   </main>
</template>
<script>
import axios from 'axios'
import NoSSR from 'vue-no-ssr'
import SnackBar from '../../components/snack-bar.vue'
//import VueTouch from 'vue-touch'
import { setCart , setguestToken } from '../../utils/auth'

export default {
  // validate ({ params }) {
  //   return !isNaN(+params.id)
  // },
  name: 'date',
  serverCacheKey () {
    // Will change every 10 secondes
    return Math.floor(Date.now() / 10000)
  },
  asyncData ({ params, error },callback) {
    return axios.get(`http://52.52.8.87/api/v2/catalogue/product/${+params.id}`)
    .then((res) => {
        console.log(res.data.data[0].products)
        callback(null, { 
          product: res.data.data[0].products ,
          description: res.data.data[0]

        })
      })
    .catch((error) => {
      console.log(error)
      //error({ message: 'User not found', statusCode: 404 })
    })
  },

  data(){
    return {
      // product: {
      //     id: 101,
      //     name: 'tshirt',
      //     brand: 'Molly',
      //     price: 500,
      //     size: 'L'
      // },
      // snackbar: false,
      // y: 'top',
      // x: 'right',
      // context: '',
      // mode: '',
      // timeout: 6000,
      date: Date.now(),
      snackdata:{
        //snackbar: true,
        y: 'top',
        x: 'right',
        context: '',
        mode: '',
        timeout: 6000,
        snacktext: 'Hello, I\'m a snackbar',
      },
      alertsuccess:false,
      dialog:false,
      imgCounter:0,
      quantity:1,
      swipeDirection: 'None',
      size:9,
      colors:null,
      path:[],
      items: [
          {
            text: 'Dashboard',
            disabled: false
          },
          {
            text: 'Link 1',
            disabled: false
          },
          {
            text: 'Link 2',
            disabled: true
          }
        ]
    }
  },
  computed :{
    reset: function(){
            let vm =  this
            vm.snackdata.context = "error"
            vm.snackdata.snackbar = true
            vm.snackdata.snacktext = "product  there"
            return vm.snackdata
    }
  },
    methods: {
       changeImg:function(img){ 
          document.getElementById('p_img').src = img; 
      },      
      slideimage:function(e){
         //alert("scroll")
         // document.getElementById("imgcon").style.right = "100px"
         e.preventDefault()
         if(this.imgCounter > 0){
          document.getElementById("imgcon").style.right = (this.imgCounter--) * 280  +"px"
         } else {
          document.getElementById("imgcon").style.right = (this.imgCounter++) * 280  +"px"
         }
        
      },
      onswiperight:function(e){
        // let img = document.getElementById('imgOne')
        // let counter = img.dataset.imgid
        // if(counter > 0)
        // img.setAttribute("data-imgid", counter--) 
        // img.src = this.product.images[img.dataset.imgid]
        console.log("imgCounter :" + this.imgCounter)
        if(this.imgCounter > 0 ){
          let n = this.imgCounter - 1 
          this.imgCounter--
          console.log("imgCounter :" + this.imgCounter + " n : "+ n)
          document.getElementById("imgcon").style.right = n * 280  +"px"
        }    
        //img.src = this.product.images[this.imgCounter--]

      },
      onswipeleft:function(){
        //alert('right')
        // let img = document.getElementById('imgOne')
        // let counter = img.dataset.imgid
        // if(counter < 5) 
        // img.setAttribute("data-imgid", counter++)
        // img.src = this.product.images[img.dataset.imgid]
        let img = document.getElementById('imgOne')
        if(this.imgCounter < 4 ){
          let n = this.imgCounter + 1     
          this.imgCounter++
          console.log("imgCounter :" + this.imgCounter + " n : "+ n)
          document.getElementById("imgcon").style.right = n * 280  +"px"
        }
        
        //img.src = this.product.images[this.imgCounter++]
        
      },
      // inc : function(){
      //   let vm = this;
      //   console.log("quantity" + this.quantity)
      //   return  this.quantity++
      // },
      // dec : function(){
      //   let vm = this;
      //   console.log("quantity" + this.quantity)
      //   return  this.quantity--
      // },
      quantityUpdate: function(quantity,item){

      },
      inc : function(itemid){
        console.log("itemid is " + itemid)
        this.quantity++
        this.quantityUpdate(quantity,itemid)
        //return  this.quantity++
      },
      dec : function(quantity,itemid){
        console.log("itemid is " + itemid)
        quantity--
        quantity = -1 * quantity
        this.quantityUpdate(quantity,itemid)
        //return  this.quantity--
      },
      // addtoCart: function(){

      //   let vm = this
      //   let item = {
      //         'product': this.product,
      //         'quantity': 1
      //   }
        
      //   let Kart =  vm.$store.state.cart.length
      //   if(Kart == 0 ) {              
      //         vm.$store.commit('addtoCart',JSON.stringify(item))
      //         console.log(this.$store.state.cart)
      //         setCart(this.$store.state.cart);
      //   } else {
      //     console.log(JSON.parse(vm.$store.state.cart))
      //     for(citem in JSON.parse(vm.$store.state.cart)){
      //     alert( "product id : "+ citem.product.id)
      //     // if(citem.product.id == this.product.id)
      //     // {
      //     //   if (confirm("similar product , Do u want to increse quantity") == true) {
      //     //       citem['quatity']++
      //     //     this.$store.commit('addtoCart',JSON.stringify(item))
      //     //     updateCart(this.$store.state.cart);
                
      //     //   } else {
      //     //       alert('dont add')
      //     //   }
      //     // } else {
      //     //     this.$store.commit('addtoCart',item)
      //     //     setCart(this.$store.state.cart);
      //     // }
          
      //   }
      //   }


      //   //this.$router.replace('/checkout101')
      // },
      swipe (direction) {
        this.swipeDirection = direction
      },

      addtoCart: function(){
          let vm = this

          if(!vm.$store.state.islogged){
              if(vm.$store.getters.getToken.split('Token')[1].trim() == "null"){
                axios.get('http://52.52.8.87/api/v2/user/create-guest/')
                .then((res) =>{
                  console.log(res.data.data[0].user.authentication_token)
                  let gt = res.data.data[0].user.authentication_token
                    vm.$store.commit('setGuestToken',res.data.data[0].user.authentication_token)
                    setguestToken(res.data.data[0].user.authentication_token)
                    axios.post('http://52.52.8.87/api/v2/cart/',
                    { "product" : vm.size,"quantity": vm.quantity},
                    { headers: {'Authorization': "Token " + gt}})
                  .then((res) => {
                      vm.alertsuccess = true  
                     console.log(res.data)
                   })
                })
              } else {
                console.log(vm.$store.getters.getToken)
                axios.post('http://52.52.8.87/api/v2/cart/',
                  { "product" : vm.size,"quantity": vm.quantity},
                  { headers: {'Authorization': vm.$store.getters.getToken.toString()}})
                .then((res) => {
                   console.log(res.data)  
                   vm.alertsuccess = true                  
                 })
                .catch((e)=>{
                    console.log("error "+ e.response.data.error.message)
                    if(e.response.data.error.code == 1002)
                    vm.dialog = true
                })
              }
          } 
          // for normal user
          else {
            axios.post('http://52.52.8.87/api/v2/cart/',
            { "product" : vm.size,"quantity": vm.quantity},
            { headers: {'Authorization':  vm.$store.getters.getToken.toString()}})
            .then((res) => {
              console.log(res.data)
              vm.alertsuccess = true
             })
            .catch((e)=>{
              console.log("error "+ e.response.data.error.message)
              if(e.response.data.error.code == 1002)
              vm.dialog = true
            })
          }
      },
      putnewQuantity:function(){
        let vm = this
        let url =  'http://52.52.8.87/api/v2/cart/' + this.size
         axios.put(url, {"quantity": this.quantity},
            { headers: {'Authorization': "Token " + vm.$store.state.token}})
            .then((res) => {
               console.log(res.data)
             })
            .catch((e)=>{
              console.log(e)
              vm.dialog = true
            })
      }
  },
  completed(){
    console.log($nuxt.$route.path) 
  },
  components : {
    snackBar : SnackBar,
    'no-ssr': NoSSR 
  },
  middleware: ['authlogin','cart']
}
</script>

<style>
  /*enabling vertical dragging on img*/
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
  .web_img{
    max-width: 100%;
    height:auto;
    padding: 10px 20px 10px 20px;
  }
  .small_img{
    width: 100px;
    height: auto;
  }
  .web_productData .price,
  .web_productData .brand,
  .web_productData .headline{
    margin-bottom: 20px;
  }
  .smallImg_container{
    height: 600px;
  }
</style>