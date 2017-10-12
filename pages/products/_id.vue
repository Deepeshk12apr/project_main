<template>
   <main class="product_main">
      <div>
        {{updatebread}}
         <v-breadcrumbs divider="/">
            <v-breadcrumbs-item 
               v-for="item in product_route" :key="item"
               :disabled="item.disabled"
               >
               {{ item }}
            </v-breadcrumbs-item>
         </v-breadcrumbs>
      </div>
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
         <div class="title">&#8377 {{product.listing_price}}</div>
        <v-btn icon :ripple="false" @click.native="togglelove(product.id)">
            <!-- <p>{{product.is_loved}}</p> -->
            <div v-if="product.is_loved">
              <v-icon large class="redheart" >favorite</v-icon>
            </div>                    
            <div v-else>
              <v-icon large >favorite</v-icon>  
            </div>
            </v-btn>
         <div class="title">colors</div>
         <div class="inlineradio color" v-for="color in product.color">
           <!-- <p>{{color.color}}</p>  -->
            <v-radio  v-model="colors" :value="color.color" v-bind:style="{ 'background-color': `${color.color}`,height: '50px',width: '50px' }">
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
            <div @click= "inc(product.size_available)"> + </div>
            <div @click= "dec(product.size_available)"> - </div>
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
            <div class="smallImg_container">
               <ul v-for= "img in product.images">
                  <li><img class="small_img" :src='img' @click='changeImg(img)' ></li>
               </ul>
            </div>
            <div>
               <img id="p_img" class="web_img" :src='product.images[0]' >
            </div>
            <div class="web_productData">
               <div class="headline">{{product.title}}</div>
               <div class="title brand">{{product.brand.brand}}</div>
               <div class="title price">&#8377 {{product.listing_price}}</div>
               <div class="label_title color">color</div>
               <div class="inlineradio color" v-for="color in product.color">
                  <v-radio  v-model="colors" :value="color.color" v-bind:style="{ 'background-color': `${color.hex_code}`,height: '40px',width: '40px',margin:'0px' }">
                  </v-radio>
               </div>
               <div class="label_title size">Size : {{size}} </div>
               <div class="inlineradio size" v-for="item in product.size_available">
                  <!-- <input type="radio" name="size" value="item.product_variation_id"> {{item.size}}<br> -->
                  <v-radio  v-bind:label="`${item.size}`" v-model="size" :value="item.product_variation_id"
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
                  <div class="inc" @click= "inc(product.size_available)"> + </div>
                  <div class="dec" @click= "dec(product.size_available)"> - </div>
               </div>
               <v-btn @click.native='addtoCart()' class="green addtocart" block secondary >Add to Cart</v-btn>
               <div class="Notify-me-when-avail ">
                 <a href="/">Notify me when available</a>
               </div>
            </div>
         </v-layout>
         <div class="hidden-sm-and-down">
            <v-tabs fixed centered>
                <v-tabs-bar class="white">
                  <v-tabs-slider class="black"></v-tabs-slider>
                  <v-tabs-item
                    v-for="(item,i) in tabitems"
                    :key="i"
                    @click.native="showcontent(i)"
                  >
                    {{ item }}
                  </v-tabs-item>
                </v-tabs-bar>
                <v-tabs-items>
                <!-- <p>{{item}}</p> -->
                  <v-tabs-content
                    v-for="i in tabitems"
                    :key="i"
                    :id="'tab-' + i"
                  >
                    <v-card flat>
                      <!-- <v-card-text>{{ i }}</v-card-text> -->
                      <v-card-text>
                        <p>Shipping is free on purchases above Rs. 3000. Shipping charges are non-refundable in case of returns.</p>
                        <p>You have a full 24 hours to return your products starting from the day you received your order. All you have to do is fill in your details here: <a href="https://goo.gl/forms/QWtT0I4cPc8bVsNt2">Return/Exchange</a>.</p>
                      </v-card-text>
                    </v-card>
                  </v-tabs-content>
                </v-tabs-items>
            </v-tabs>
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
  asyncData ({ params, store },callback) {

    var config = { Authorization: store.getters.getToken.toString() };
    return axios.get(`http://52.52.8.87/api/v2/catalogue/product/${+params.id}`, { headers: config })
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
      // },
      tabitems: ['PRODUCT DETAILS', 'BRAND DETAILS', 'DELIVERY INFO','RETURNS POLICY'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',      
      product_details:null,
      brand_details: null,
      delivery_info:null,
      return_policy:"You have a full 24 hours to return your products starting from the day you received your order. All you have to do is fill in your details here: Return/Exchange. Once your return is confirmed, pack and seal the item, just as it was delivered to you, before handing it over to our delivery partner. Zapyle will not be responsible for any loss or theft due to the packing condition upon return. The product must be unused, unwashed and all tags must be intact. Place the invoice outside the packet, so that the return address is visible.",
      product_route:[],
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
      size:null,
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
    },
    updatebread:function(){
      this.product_route.push('Discover') 
            let obj= this.$route.query 
            let objvalues = Object.values(obj)
            delete objvalues[0  ]
            objvalues.forEach(function(value,i){
              vm.product_route.push(value)             
            })
    }
  },
    methods: {
      showcontent: function(id){
        // alert(id)
        let elem = this.tabitems[id]
        let elemid= "tab-" + this.tabitems[id]
        let localArr = ['PRODUCT_DETAILS', 'BRAND_DETAILS', 'DELIVERY_INFO','RETURNS_POLICY']
        // let doc = document.getElementById(elemid).show()
        this.tabitems.forEach(function(obj){
            if(obj ==  elem){
              // alert(obj)
              document.getElementById("tab-"+obj).style.display = "block"
            } else {
              // alert(obj)
              document.getElementById("tab-"+obj).style.display = "none"
            }
        })
      },
      togglelove : function(pid){

        let vm = this
        let url = "http://52.52.8.87/api/v2/user/love/" + pid
        let config = { Authorization : this.$store.getters.getToken.toString() } 
        axios.get(url, { headers: config } )
        .then(response => {
              console.log(response.data.data[0].data)
              //let result = response.data.data[0].data == 'Loved' ? true : false
              vm.$router.go()
              // vm.love = result
              // vm.islove()
            })
      },
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
      // inc : function(itemid){
      //   console.log("itemid is " + itemid)
      //   this.quantity++
      //   this.quantityUpdate(quantity,itemid)
      //   //return  this.quantity++
      // },
      // dec : function(quantity,itemid){
      //   console.log("itemid is " + itemid)
      //   this.quantity--
      //   this.quantity = -1 * quantity
      //   this.quantityUpdate(quantity,itemid)
      //   //return  this.quantity--
      // },
       inc: function(sizearr) {

            if (this.size == null) {
                alert('select size first')
                return
            }
            let vm = this
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
            if (this.size == null) {
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

  .product_main{
    max-width: 986px;
    margin: auto;
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
    display: inline-block;
   /* padding-left: 15px;
    padding-right: 15px;*/
  }
  .size .input-group__input, .color .input-group__input{
    visibility: hidden;
  }

  .input-group.input-group--selection-controls .input-group__input{
    visibility: hidden;
  }
  .size .input-group--selection-controls label, .color .input-group--selection-controls label{
    margin-left: 0;
    position: relative;
    height: 40px;
    width: 40px;
    padding: 12px;
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
  .size .input-group--selection-controls label{
    background-color: #eaebf0;
  }
  .input-group__details{
    display: none;
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
  .small_img{
    width: 60px;
    height: 80px;
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
  .label_title{
    font-family: Roboto;
    font-size: 14px;
    line-height: 1.43;
    text-align: left;
    color: #47525f;
  }
  .label_title.color,.label_title.size{
    margin-bottom: 10px;
    margin-top: 20px;
  }
  .sizeGuide{
    margin-top: 10px;
  }
  .sizeGuide a {
    font-size: 12px;
    line-height: 1.67;
    text-align: left;
    color: #47525f;
  }
  .inc,.dec{
    cursor: pointer;
  }
  .smallImg_container{
    height: 600px;
    margin-bottom: 5px;
  }

  i.icon.icon--large.material-icons.redheart {
    color : red;
  }
  .addtocart{
     width: 335px;
     height: 60px;
  }

  .Notify-me-when-avail {
  width: 156px;
  height: 40px;
      margin-left: 95px;
    margin-top: 20px;
}
  .Notify-me-when-avail a {    
  font-family: Roboto;
  font-size: 14px;
  line-height: 2.86;
  text-align: left;
  color: #13b868;
  }

  .Share-with-a-friend {
  width: 151px;
  height: 40px;
  font-family: Roboto;
  margin-top: 60px !important;
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
</style>