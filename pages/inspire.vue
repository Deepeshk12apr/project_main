<template>
<main>
 <v-btn @click.native="pop">click for pop-up</v-btn> 
 <v-dialog v-model="brand_dialog"  lazy absolute >
    <v-card>
      <h2>Deepesh</h2>
    </v-card>
 </v-dialog> 
</main>
 
</template>

<style scoped>
.title
{
  margin: 50px 0;
}
</style>

<script>

import axios from 'axios'

  export default {
data () {
      return {
        tabs: ['tab-1', 'tab-2', 'tab-3'],
        active: null,
        brand_dialog: false,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    },
    methods: {
      pop(){
        this.brand_dialog = true
      },
      next () {
        console.log(this.active)
        this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length]
        console.log(this.active)
      }
    },
    middleware : ['authlogin','cart'],
     layout:['search']
  }
</script>