<template>
	<main>
	{{filters}}
			<hr><br>
			<h6>Brand</h6>
		<!-- <v-radio v-for="brand in filters.brand" v-bind:label="`${brand.key}`" v-model="colors" :value="brand.key">
      	</v-radio> -->
      	{{brands}}
      	<div v-for="brand in filters.brand">
      	<!-- <v-checkbox  value="brand.key" v-model="brands" light>{{brand.key}}</v-checkbox>	 -->
      	<v-checkbox :label="brand.key" v-model="brands" :value="brand.key"></v-checkbox>
      	</div>
		<hr>
		<h6>Category</h6>
		<div v-for="cat in filters.category">
			<!-- <span>{{cat.key}}</span> -->									
			<v-checkbox :label="cat.key" v-model="category" :value= "`${parentcat(cat)}`"></v-checkbox>
			<!-- <li  v-for="c in cat.sub_category_count.buckets">
				{{c.key}} ({{c.doc_count}})
			</li> -->
			<div class="subCat" v-for="c in cat.sub_category_count.buckets">
				<v-checkbox :label="c.key" v-model="category" :value="c.key"></v-checkbox>	
			</div>
		</div>
		<h6>Color</h6>
		<div v-for="k in filters.color">
			<li>
				{{k.key}}({{k.doc_count}})
			</li>
		</div>
		<h6>Price</h6>
		<div v-for="(k,i) in filters.listing_price">
			<li>
				{{i}}({{k.doc_count}})
			</li>
		</div>
		<h6>Discount</h6>
		<div v-for="(d,i) in filters.discount">
			<li>
				{{i}}({{d.doc_count}})
			</li>
		</div>
	</main>
</template>
<script>
import axios from 'axios'
	export default {
		      asyncData ({store,params }, callback) {
        let config = { Authorization : store.getters.getToken.toString() } 
      axios.get('http://52.52.8.87/api/v2/catalogue/filters/?shop=HighStreet', { headers: config } )
      .then((res) => {
          //console.log(res.data)
          callback(null, { filters: res.data.data[0] })
      })
    },
    data(){
	    return {
	    	colors:null,
	    	brands:[],
	    	category:[]
	    }	
	},
	computed: {
		setfilters : function(){
			let vm = this
			let brand = {"brand":[vm.brand]}
			console.log(brand)
			//let str = '&applied_filter={"brand":[""],"category":["Dresses"]}'
			//vm.$store.commit('setfilters',)
		}
	},
	methods :{
		parentcat : function(data){
		let v =  data.sub_category_count.buckets.map(function(obj){
					return obj.key
			}).join('","')
		//console.log(v)
		return v
		},
		
	},
    middleware : ['infinitscroll','authlogin']
	}
</script>
<style>
	.subCat .checkbox{
		margin-left: 25px;
	}
</style>