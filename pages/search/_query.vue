<template>
<!-- <p>{{product}}</p> -->
<!-- 	<no-ssr>
       <product-list-mob></product-list-mob>
    </no-ssr> -->
</template>
<script>
import axios from 'axios'
import NoSSR from 'vue-no-ssr'
import ProductListMob from '../../components/product-list-mob.vue'

export default {
	data(){
		return{
			query:null
		}
	},
components: { 
      productListMob : ProductListMob,
      'no-ssr': NoSSR },
	asyncData ({ params, error },callback) {


		console.log(params.query)
		let cc  = '"'+params.query+'"'
		let url = `http://52.52.8.87/api/v2/catalogue/elastic-products/?size=2&from_doc=0&applied_filter=`
		let query = '{"query":['+cc+']}'

		console.log(url + query)

	    return axios.get(url + query)
	    .then((res) => {
	        console.log(res.data.data[0].products)
	        callback(null, { 
	          product: res.data.data[0].products ,
	          description: res.data.data[0]

	        })
	      })
	  },
}	
</script>