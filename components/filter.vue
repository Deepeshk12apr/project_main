<template>
	<main>
		<p>{{getFilterdata}}</p>
	    <v-card >
            <v-toolbar dark  class="primary">
                <v-btn icon @click.native="dialog = false" dark>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click.native="applyfilter()">Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <hr>
            <div class="faded"><br>
                <h4>Brand</h4>
                <div class="maincategory" v-for="brand in filters.brand">
                    <v-checkbox :label="brand.key" v-model="brands" :value="brand.key"></v-checkbox>
                </div>
                <h4>Colors</h4>
                <!-- <p>{{filters}}</p> -->
                <div class="maincategory colorfilter" v-for="c in filters.color">
                <v-layout>
                <v-flex xs6 sm5 md4>
                    <v-checkbox :label="c.key" v-model="colors" :value="c.key"></v-checkbox>
                </v-flex>
                </v-layout>
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
            </div>
        </v-card>
	</main>
</template>

<script>
	export default {

		data() {
			return {
			dialog:false,	
			colors: [],
            brands: [],
            category: [],
			}
		},
		computed() {
			getFilterdata:function(){

			}
		},
		methods: {
			applyfilter : function(){
            console.log("applyfilter")
              let filters = { }

              if(this.brands){
                 if(this.brands.length)
                 filters["brand"] = [].concat(this.brands)
              }
              if(this.colors){
                if(this.colors.length)
                filters["color"] = [].concat(this.colors)
              }
              if(this.category){
                if(this.category.length)
                filters["category"] = [].concat(this.category)
              }
              
              this.$store.commit('setfilter',filters)
              let byfilter = true
              eventHub.$emit('emitfilter',byfilter)
              this.dialog = false

              setfilters(JSON.stringify(filters))

            },
            parentcat : function(data){
	          let v =  data.sub_category_count.buckets.map(function(obj){
	                return obj.key
	            }).join('","')
	          //console.log(v)
	          return v
	        },
		}

	}
</script>