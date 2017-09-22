<template>
  <main>
  <v-layout>
    <v-dialog v-model="dialog" class="hidden-md-and-up " fullscreen transition="dialog-bottom-transition"  :overlay=false >
          <v-card >
          <div v-if ="product" class='pld'>
          <v-toolbar dark class="primary">
          <v-btn icon @click.native="closedialog" dark>
            <v-icon>close</v-icon>
          </v-btn>
          </v-toolbar>
            <h3 class="headline">{{product.title}}</h3>
             <h3 class="title">{{product.brand.brand}}</h3>
             <v-progress-linear :value="(imgCounter + 1) * 20"></v-progress-linear>
            <no-ssr> 
            <v-touch v-on:swipeleft="onswipeleft" v-on:swiperight="onswiperight" class="dragme">
            <div id="imgcon" class="subcon">
                 <img id="imgOne" :src='product.images[0]' data-imgid=0 >
                 <img id="imgOne" :src='product.images[1]' data-imgid=1 >
                 <img id="imgOne" :src='product.images[2]' data-imgid=2 >
                 <img id="imgOne" :src='product.images[3]' data-imgid=3 >
                 <img id="imgOne" :src='product.images[4]' data-imgid=4 >
            </div>
            </v-touch>
            </no-ssr>
                <div class="inlineradio color" v-for="color in product.color">
                  <v-radio v-bind:label="`${color}`" v-model="colors" :value="color" v-bind:style="{ 'background-color': `${color}`,height: '50px',width: '50px' }">
                  </v-radio>
               </div>
               <div class="title">Size : {{size}}</div>
               <div class="inlineradio size" v-for="item in product.size_available">
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
          </div>
          </v-card>
        </v-dialog>
    </v-layout>
  </main>

</template>
<script>

import NoSSR from 'vue-no-ssr'
import axios from 'axios'

export default {

asyncData ({ params, error },callback) {

  if(params.id == 0) {

      console.log("param id is zero " + params.id)
      return 0

  } else {
    console.log("param id is not zero " + params.id)
     return axios.get(`http://52.52.8.87/api/v2/catalogue/product/${+params.id}`)
    //.then((res) => res.data)
    .then((res) => {
        //console.log(res.data.data[0].products)
        callback(null, { 
          product: res.data.data[0].products ,
          description: res.data.data[0]

        })
      })
    .catch((error) => {
      console.log(error)
      //error({ message: 'User not found', statusCode: 404 })
    })

  }
    
  },
  data(){
    return {
      param:null,
      dialog:true,
      product:null,
      imgCounter:0,
      quantity:0,
      size:0,
      colors:null,
      data:""
    }
  },
  methods :{
    closedialog : function(){
      this.dialog = false
      console.log(this.$refs)
    },
    onswiperight:function(e){
        console.log("imgCounter :" + this.imgCounter)
        if(this.imgCounter > 0 ){
          let n = this.imgCounter - 1 
          this.imgCounter--
          console.log("imgCounter :" + this.imgCounter + " n : "+ n)
          document.getElementById("imgcon").style.right = n * 280  +"px"
        }    
    },
    onswipeleft:function(){
        //alert
        let img = document.getElementById('imgOne')
        if(this.imgCounter < 4 ){
          let n = this.imgCounter + 1     
          this.imgCounter++
          console.log("imgCounter :" + this.imgCounter + " n : "+ n)
          document.getElementById("imgcon").style.right = n * 280  +"px"
        }
    },
      inc : function(){
        this.quantity++
        //this.quantityUpdate(quantity,itemid)
        //return  this.quantity++
      },
      dec : function(){
        this.quantity--
       
        //this.quantityUpdate(quantity,itemid)
        //return  this.quantity--
      },
      // 
  },
  components : {
    'no-ssr': NoSSR 
  },
  mounted(){
      this.dialog =  true
    // let vm = this
    // let paramid = window.location.pathname.split('/')[2]
    // axios.get(`http://52.52.8.87/api/v2/catalogue/product/${+paramid}`)
    // //.then((res) => res.data)
    // .then((res) => {
    //     console.log(res.data.data[0].Products)
    //     vm.product = res.data.data[0].Products 
    //     vm.description = res.data.data[0]
        
    //   })
    // .catch((error) => {
    //   console.log(error)
    // })

    // if(!(this.$route.params.id > 0))
    //   return

    // let vm = this
    // let st = this.$store.state.productlist
    // let objst = JSON.parse(st)
    // if(objst){
    //   this.dproduct = objst.filter(function(obj){
    //   if(obj.id == vm.$route.params.id){
    //       console.log(obj)
    //      vm.dialog= true
    //      return obj
    //   }
    // })
    // console.log(this.dproduct)  
    // }    
   
    // console.log("in created")
  }
}
</script>

<style>

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
  .overlay.overlay--active{
    display: none;
  }
    .input-group__details{
    display: none;
  }
  .pld .size .input-group__input, .color .input-group__input{
    visibility: hidden;
  }
  .size .input-group--selection-controls label, .color .input-group--selection-controls label{
    margin-left: 0;
    position: relative;
    height: 50px;
    width: 50px;
    padding: 12px;
  }
  .pld .size .input-group--selection-controls label{
    background-color: grey;
  }
  .inlineradio  {
    display: inline-flex;
    margin-left: 10px;
    padding: 0 !important;
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

</style>
