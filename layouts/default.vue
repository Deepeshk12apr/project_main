<template>
  <v-app toolbar footer @scroll="handleScroll">
    <v-navigation-drawer class="hidden-md-and-up"
       temporary
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
    >
      <template v-if="updateUser">
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
      </template>

        <template v-else>
          <router-link to='/register'>
          <p>Login?Register</p>
          </router-link>
        </template>
     
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
          <v-card>
          <v-list>
          <v-list-group v-for="item in Category" :value="item.model" v-bind:key="item[0].name">
            <v-list-tile slot="item" @click="">
              <v-list-tile-content>
                <v-list-tile-title>{{item[0].name }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.children" v-bind:key="subItem.name" @click="">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          </v-list>
        </v-card>
    </v-navigation-drawer>
 
    <v-toolbar fixed>
      <v-toolbar-side-icon  @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
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

    <div class="web_margin hidden-sm-and-down"></div>
    <v-toolbar fixed class="hidden-sm-and-down web_toolbar1">
      <span>Help</span>
      <span>Track Order</span>
      <span> Sign Up</span>
      <span> Login</span>
    </v-toolbar>
    <v-toolbar fixed class="hidden-sm-and-down web_toolbar2" extended>
    <template class="web_comp" >
      <v-text-field
              name="search"
              label="search website"
              class="input-group--focused search_input"
              append-icon="search"
              value= ""
              single-line
            ></v-text-field><br>
    <v-spacer></v-spacer>
      <v-btn icon class="fav_btn">
        <v-icon>favorite</v-icon>
        <span>Favorite</span>
      </v-btn>
       <router-link to='/mycart'>
      <v-btn class="cart_btn" icon>
        <v-icon>add_shopping_cart</v-icon>
        <span>cart</span>
      </v-btn>
      </router-link>      
    </template>   

    <v-menu :nudge-width="100" slot="extension">
     <v-toolbar-title slot="activator">
         <span>Categories</span>
         <v-icon>arrow_drop_down</v-icon>
      </v-toolbar-title>
      <v-list class="cat_list">
          <v-list-tile v-for="item in Category" :key="item" @click="">
          <v-list-tile-title v-text="item[0].name"></v-list-tile-title>
        </v-list-tile>
      </v-list>    
    </v-menu>
    <v-menu :nudge-width="100" slot="extension" class="shop_list">
     <v-toolbar-title slot="activator">
         <span>Shops</span>
         <v-icon>arrow_drop_down</v-icon>
      </v-toolbar-title>
      <v-list>
          <v-list-tile v-for="item in Category" :key="item" @click="">
          <v-list-tile-title v-text="item[0].name"></v-list-tile-title>
        </v-list-tile>
      </v-list>    
    </v-menu>
    <div v-for="item in items" slot="extension">
       <router-link :to="item.to">
        <v-toolbar-title class="text-md-center">{{item.title}}</v-toolbar-title>
        </router-link>
    </div>  
     <!--  <div v-for="item in Category">
        <v-toolbar-title class="text-md-center">{{item[0].name}}</v-toolbar-title>
      </div>    -->   
    </v-toolbar>


    <main>
      <v-container class="container" fluid>
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
        hide:false,
        show: true,
        isLogged: null,
        Category:null,
        account: [
          { icon: 'bubble_chart', title: 'Home', to: '/register', islogged: true },
          { icon: 'apps', title: 'My Account', to: '/account/myaccount' },
          { icon: 'bubble_chart', title: 'My Orders', to: '/search' },
          { icon: 'bubble_chart', title: 'Zap cash', to: '/myaccount'},
          { icon: 'bubble_chart', title: 'Refer n Earn', to: '/about' },
          { icon: 'bubble_chart', title: 'Customer Support', to: '/about' }
        ],
        items: [
          // { icon: 'bubble_chart', title: 'Login/Sign-Up', to: '/register', islogged: true },
          { icon: 'apps', title: 'Discover', to: '/discover' },
          { icon: 'bubble_chart', title: 'productlist', to: '/productlist' },
          { icon: 'bubble_chart', title: 'My Account', to: '/account/myaccount'},
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
            av = res.data.data[0].category
            //console.log(av)
            let parents = {}
            av.map(function(obj){
              if(obj.parent.length > 0){
                //console.log(obj.parent[0].name)
                if(!parents[obj.parent[0].id])
                parents[obj.parent[0].id] = obj.parent
                parents[obj.parent[0].id]['model'] = false
                parents[obj.parent[0].id]['children'] =  av.filter(function(cobj){
                    if(cobj.parent.length > 0 && cobj.parent[0].id == obj.parent[0].id ){
                        return cobj

                    }
                })
              }
            })
            vm.Category = parents
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
        // console.log("fbimg : " + this.$store.state.fbimg)
        return this.$store.state.fbimg
      }
    },
    methods: {
       expand: function(item){
        console.log(item.model)
        return item.model = !item.model
     },
        handleScroll: function(e) {
          var currentScrollPosition = e.srcElement.scrollTop;
          if (currentScrollPosition > this.scrollPosition) {
              console.log("Scrolling down" + this.scrollPosition );
          } else if (currentScrollPosition < this.scrollPosition){
            console.log("Scrolling up");
          }
          this.scrollPosition = currentScrollPosition;
    }, 
    }
  }
</script>

<style>   
 body,
 html {
     height: 100%;
     /*overflow-y: hidden;*/
 }
 li {
     list-style-type: none;
 }
 .toolbar a {
     text-decoration: none;
     color: black;
 }
 .btn__content {
     display: grid !important;
 }
 .cart_btn {
     margin-left: 40px;
 }
 .search_input {
     margin-left: 30% !important;
 }
 .toolbar__extension {
     justify-content: center;
     margin: 10px 0px 0px 0px;
 }
 .web_margin,
 .web_comp {
     margin-top: 8%;
 }
 .web_toolbar2 {
     margin-top: 3.25%;
 }
 .web_toolbar1 {
     background-color: #f3f3f3;
 }
 .web_toolbar1 span {
     padding: 0px 20px 0px 20px;
 }
 .web_toolbar1 .toolbar__content {
     justify-content: flex-end;
 }
 .toolbar.web_toolbar2 {
     box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.2)
 }
 .web_toolbar1 {
     box-shadow: none;
 }
 .toolbar.web_toolbar1 {
     background-color: #808080;
 }
 .menu__content {
     position: fixed;
 }
</style>
