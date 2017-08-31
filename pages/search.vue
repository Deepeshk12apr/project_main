<template>
  <main>
	<div>
	  <p v-for="item in list">
	    <span v-text="item.title"></span>
	  </p>
	  <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
	</div>
  </main>
</template>

<script>
import InfiniteLoading from '../components/InfiniteLoading.vue'
import axios from 'axios'

export default {
	  data() {
    return {
      list: [],
      from_doc:0
    };
  },
  methods: {
    // onInfinite() {
    //   setTimeout(() => {
    //     const temp = [];
    //     for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
    //       temp.push(i);
    //     }
    //     this.list = this.list.concat(temp);
    //     this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
    //   }, 1000);
    // },
    onInfinite() {
      //let config = { Authorization : store.getters.getToken.toString() } 
      let vm =  this
      let config = { Authorization : this.$store.state.token} 
      let fd  = this.$store.state.from_doc
      let url = 'http://52.52.8.87/api/v2/catalogue/elastic-products/?shop=HighStreet&from_doc=' + fd + '&size=5'
      axios.get(url, { headers: config } )
      .then((res) => {
          //callback(null, { products: res.data.data[0].products })
          	vm.list = vm.list.concat(res.data.data[0].products)
          	vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          	fd = fd + 20
          	this.$store.commit('setFromDoc',fd)
      })
    },
  },
  components: {
    InfiniteLoading,
  },
 	middleware : ['infinitscroll']
}
</script>