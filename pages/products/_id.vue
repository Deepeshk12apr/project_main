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
    {{$nuxt.$route.name}}
    <h3 class="headline">{{product.title}}</h3>
    <h3 class="title">{{product.brand.brand}}</h3>  
    <p>{{description}}</p>
    <div class="outer">
      <div class="subcon">
        <img class="pimmg" :src='product.images[0]' >
        <img class="pimmg" :src='product.images[1]' > 
        <img class="pimmg" :src='product.images[2]' >
      </div>
    </div><br>
    <div>color</div>
    <div v-for="color in product.color">
      <v-radio  v-bind:label="`${color}`" v-model="colors" :value="color">
      </v-radio>
    </div>
    <div>Size : {{size}}</div>
    <div class="inlineradio" v-for="item in product.size_available">
        <!-- <input type="radio" name="size" value="item.product_variation_id"> {{item.size}}<br> -->
        <v-radio  v-bind:label="`${item.size}`" v-model="size" :value="item.product_variation_id">
        </v-radio>
    </div>
    <br>  
    <a href="/">size guide</a>
    <p>Quantity</p>
    <v-btn @click.native='addtoCart()' class="green" block secondary >Add to Cart</v-btn><br><br>

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

  </main>

</template>
<script>
import axios from 'axios'
import { setCart , setguestToken } from '../../utils/auth'

export default {
  // validate ({ params }) {
  //   return !isNaN(+params.id)
  // },
  asyncData ({ params, error },callback) {
    return axios.get(`http://52.52.8.87/api/v2/catalogue/product/${+params.id}`)
    //.then((res) => res.data)
    .then((res) => {
        console.log(res.data.data[0].Products)
        callback(null, { 
          product: res.data.data[0].Products ,
          description: res.data.data[0]

        })
      })
    .catch((error) => {
      console.log('some big error')
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
    methods: {
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
      addtoCart: function(){
          let vm = this
          console.log(vm.$store.state.length)
          if(vm.$store.state.islogged || vm.$store.state.token.length < 1){
              axios.get('http://52.52.8.87/api/v2/user/create-guest/')
              .then((res) =>{
                console.log(res.data.data[0].user.authentication_token)
                let gt = res.data.data[0].user.authentication_token
                  vm.$store.commit('setGuestToken',res.data.data[0].user.authentication_token)
                  setguestToken(res.data.data[0].user.authentication_token)
                  axios.post('http://52.52.8.87/api/v2/cart/',
                  { "product" : this.size,"quantity": 1},
                  { headers: {'Authorization': "Token " + gt}})
                .then((res) => {
                   console.log(res.data)
                     //callback(null, { products: res.data.data[0].products })
                 })
              })
          }
          //  else {
          //   axios.post('http://52.52.8.87/api/v2/cart/',
          //   { "product" : this.size,"quantity": 1},
          //   { headers: {'Authorization': "Token " + vm.$store.state.token}})
          // .then((res) => {
          //    console.log(res.data)
          //      //callback(null, { products: res.data.data[0].products })
          //  })
          // }
      }
  },
  completed(){
    console.log($nuxt.$route.path) 
  },
  middleware: ['authlogin','cart']
}
</script>

<style>

  .container.fluid{
    overflow: hidden;
  }
  .outer{
    height: 400px; 
    width: 1700px;
    margin: 0px;
  }
  .subcon  {
    height: 400px;
    width: 400px;
    display: inline-flex;
    overflow-x: scroll;
  }
  .subcon img {
    height: 400px;
    /*width: 300px;*/
    padding: 10px;
  }
  .inlineradio  {
    display: inline-flex;
    padding-left: 15px;
    padding-right: 15px;
}
</style>