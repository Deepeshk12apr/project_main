import Vue from 'vue'
import VueTouch from 'vue-touch'

//Vue.use(VueTouch, {name: 'v-touch'})

console.log("Vue touch : "+process.BROWSER_BUILD)

// if (process.BROWSER_BUILD) { 
  Vue.use(VueTouch, {name: 'v-touch'})
// }