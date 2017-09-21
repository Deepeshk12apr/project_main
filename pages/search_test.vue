<template>
  <main>
	<div @click="capture">
	  <p v-for="item in list">
      Line
	    <span v-text="item"></span>
	  </p>
	  <infinite-loading :on-infinite="onInfinite" ref="InfiniteLoading"></infinite-loading>
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
    onInfinite() {
      setTimeout(() => {
        const temp = [];
        for (let i = this.list.length + 1; i <= this.list.length + 2; i++) {
          temp.push(i);
        }
        this.list = this.list.concat(temp);
        this.$refs.InfiniteLoading.$emit('$InfiniteLoading:loaded');
      }, 1000);
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
    capture: function(e){
      console.log(e.srcElement)
        console.log(this.scrollPosition)
        let x =  e.srcElement.scrollPosition
        console.log("scrollTop" + x)
    }
  },
  components: {
    InfiniteLoading,
  },
 	middleware : ['infinitscroll']
}
</script>