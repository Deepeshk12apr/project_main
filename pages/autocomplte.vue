<template>
<main>
 searching for {{search}}
   <v-text-field
      name="input-1-3"
      label="search...."
      single-line
      append-icon="search"
      v-model="search"
      v-on:keyup.native="searchM()"
    ></v-text-field>
    <v-list dark  >
          <v-list-tile  v-for="item in items" v-bind:key="item.title">
            <v-list-tile-content @click.stop="redirect(item)" >
              <v-list-tile-title v-text="item"></v-list-tile-title>
            </v-list-tile-content>
          <hr>
          </v-list-tile>
    </v-list>
<!--     <div v-for="(item,i) in items">
    	<li>{{items[i]}}</li>
    </div> -->
    <v-btn dark @click.native="redirect('/')">Save</v-btn>
</main>
</template>
<script>

import axios from 'axios'
import Router from 'vue-router'

	export default {
		data(){
			return {
				search:"",
				items: [],
				query:null,
			}
		},
		methods : {
			searchM(){
				let vm =  this
				axios.get("http://52.52.8.87/api/v2/catalogue/autocomplete/?input_text='"+ vm.search +"'")
				.then((res) => {
			         //console.log(res.data.data[0].suggested_items)
			         vm.items = res.data.data[0].suggested_items
			      })
			},
			redirect(item){
				this.$nuxt.$router.replace('/search/'+item)

			}
		},
		middleware : ['authlogin']	}
</script>
<style>	
	ul{
		margin-top: -40px;
	}
</style>