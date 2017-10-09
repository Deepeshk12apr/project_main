<template>
  <v-app toolbar footer>
    <main>
      <v-container fluid>
       <no-ssr> 
        <nuxt>
        </nuxt>
       </no-ssr>
      </v-container>
    </main>
    <v-footer :fixed="fixed">
      <span>&copy; 2017</span>
    </v-footer> 
  </v-app>
</template>

<script>
import NoSSR from 'vue-no-ssr'

  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Z'
      }
    },
    methods: {
      redirectto: function(){
        
      }  
    },
    components: {
        'no-ssr': NoSSR
    },

  }
</script>