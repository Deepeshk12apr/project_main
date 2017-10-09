<template>
<main class="sdm" v-scroll="onScroll">
<!-- <div>{{offsetTop}}</div><br> -->
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
<!--<div v-for="(item,i) in items">
    	<li>{{items[i]}}</li>
    </div> -->
    <v-btn dark @click.native="redirect(search)">Save</v-btn>
</main>
</template>
<script>

import axios from 'axios'
import { setfilters} from '../utils/filter'
import { alertfun} from '../utils/commonFunction'

	export default {
		data(){
			return {
				search:"",
				items: [],
				query:null,
				offsetTop:0
			}
		},
		methods : {
	 	   onScroll (e) {
	            console.log("onScrolltop called ")
	            this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
	          },
			searchM(){
				let vm =  this
				axios.get("http://52.52.8.87/api/v2/catalogue/autocomplete/?input_text='"+ vm.search +"'")
				.then((res) => {
			         //console.log(res.data.data[0].suggested_items)
			         vm.items = res.data.data[0].suggested_items
			      })
			},
			redirect(item){
				setfilters('{}')
				this.$store.commit('setfilter','{}')
				alertfun(item)
				this.$nuxt.$router.replace('/pdlist?search='+item)
				//this.searchM()
			}
		},
		middleware : ['authlogin']	}
</script>
<style>	
	.sdm{
		height: 200px;

	}
	ul{
		margin-top: -40px;
	}
</style>