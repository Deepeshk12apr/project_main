<template>
  <v-app toolbar footer>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
    >
      <div v-if="updateUser">
        <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.native.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon light>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img :src="getUserImg" />
          </v-list-tile-avatar> 
          <v-list-tile-content> 
            <v-list-tile-title>{{getUser}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list>
        <v-list-tile 
          v-for="(item, i) in account"
          :key="i"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      </v-list> 
      <hr>  
      </div>

      <div v-else>
        <router-link to='/register'>
        <p>Login?Register</p>
        </router-link>
      </div>
   
      <v-list>
        <v-list-tile 
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <hr>
      <v-list>
        <v-list-tile 
          v-for="(item, i) in Category"
          :key="i"
          :to="item.to"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
 
    <v-toolbar fixed>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <router-link to='/search'>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
       <router-link to='/mycart'>
      <v-btn icon>
        <v-icon>add_shopping_cart</v-icon>
      </v-btn>
      </router-link>
    </v-toolbar>
    <main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </main>
    <v-footer :fixed="fixed">
      <span>&copy; 2017</span>
    </v-footer> 
  </v-app>
</template>

<script>

import axios from 'axios'
import sidebar from '.././components/sidebar'

  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        mini: false,
        isLogged: null,
        Category:null,
        account: [
          { icon: 'bubble_chart', title: 'Home', to: '/register', islogged: true },
          { icon: 'apps', title: 'My Account', to: 'account/myaccount' },
          { icon: 'bubble_chart', title: 'My Orders', to: '/search' },
          { icon: 'bubble_chart', title: 'Zap cash', to: '/myaccount'},
          { icon: 'bubble_chart', title: 'Refer n Earn', to: '/about' },
          { icon: 'bubble_chart', title: 'Customer Support', to: '/about' }
        ],
        items: [
          { icon: 'bubble_chart', title: 'Login/Sign-Up', to: '/register', islogged: true },
          { icon: 'apps', title: 'Discover', to: '/discover' },
          { icon: 'bubble_chart', title: 'Search', to: '/search' },
          { icon: 'bubble_chart', title: 'My Account', to: '/myaccount'},
          { icon: 'bubble_chart', title: 'About us', to: '/about' }
        ],
        miniVariant: false,
        title: 'Z'
      }
    },
    created(){
      //this.someValue = 'updated value'
      let vm =  this
      let av = null
      axios.get('http://52.52.8.87/api/v2/catalogue/category')
      .then((res) => {
            av = res.data.data[0].Category
            //console.log(av)
            vm.Category = av
          })
    },
    computed:{
      updateUser: function(){
        console.log("isLogged : " + this.$store.state.islogged)
        return this.$store.state.islogged
      },
      getUser: function(){
        console.log(this.$store.state)
        return this.$store.state.user
      },
      getUserImg: function(){
        console.log("fbimg : " + this.$store.state.fbimg)
        return this.$store.state.fbimg
      }
    },
    methods: {
      
    }
  }
</script>