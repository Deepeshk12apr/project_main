<template>
  <main>
    <div class='rectangle-15'>
      <p>My Account</p>
    </div>
    <v-list class="macc"    >
        <v-list-tile  
          v-for="(item, i) in account"
          :key="i"
          :to="item.to"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>           
          </v-list-tile-content>
          <v-list-tile-action>
            
            <div v-if="item.title == 'Zap Cash'">
              <v-list-tile-title>{{zapcash}}</v-list-tile-title>  
            </div> 
            <div v-else>
              <v-icon v-html="item.icon"></v-icon>
            </div>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <div class='rectangle-3'>
      <p>Contact Us</p>
    </div>
      <v-list class="macc">
        <v-list-tile 
          v-for="(item, i) in contact"
          :key="i"
          :to="item.to"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
          </v-list-tile>
      </v-list>

  </main>
</template>
<script>

import axios from 'axios'

  export default {
    data () {
      return {
        zapcash : 0,
        account: [
          { icon: 'bubble_chart', title: 'Profile', to: '/account/profile', islogged: true },
          { icon: 'bubble_chart', title: 'Address Details', to: '/account/address' },
          { icon: 'bubble_chart', title: 'Recent Orders', to: '/account/order' },
          { icon: 'bubble_chart', title: 'Coupons', to: '/account/coupon'},
          { icon: 'bubble_chart', title: 'Zap Cash', to: '/account/coupon'},
          { icon: 'bubble_chart', title: 'Refer & Earn', to: '/account/refer' }
        ],
        contact: [
          { title: '0123467896', to: '/register' },
          { title: 'care@zapyle.com', to: '/myaccount' }
        ]
      }
  },
  created(){
          let vm = this
          let config = { Authorization : this.$store.getters.getToken.toString() } 
          console.log(config)
         axios.get('http://52.52.8.87/api/v2/user/wallet-balance/', { headers: config } )
         .then(response => {
                vm.zapcash = response.data.data[0].cash 
                console.log(response.data.data[0].cash)
            })
         .catch((e) => {
                console.log(e)
              })
  },
  middleware: ['authlogin']
}
</script>

<style>
  .rectangle-15 { 
    height: 40px; 
    border: 1px solid #979797;  
    background-color: #000000;
    margin-bottom: 50px;
  }
  .rectangle-15 p{
    color: #ffffff;
    margin-left: 40%;
    font-size: 24px;
    vertical-align: middle;
  }

  .macc li a {
    border: 1px solid #979797;
  }
  .rectangle-3 {
    margin-top: 50px;
    height: 52px;
    background-color: #D8D8D8;
  }
  .rectangle-3 p {
    color: #000000; 
    margin-left: 40%;
    padding: 15px;
    font-family: Roboto;  
    font-size: 24px;  
    font-weight: 300; 
    vertical-align: sub;
    line-height: 15px;
  }



</style>