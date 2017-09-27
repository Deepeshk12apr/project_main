module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    script: [
      { src: 'https://checkout.razorpay.com/v1/checkout.js' },
      { src: 'https://connect.facebook.net/en_US/sdk.js' },
      { src: 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.js'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
    modules: [
    // Simple usage
    '@nuxtjs/component-cache',
    
    // With options
    ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }],
  ],
   render: {
    bundleRenderer: {
      cache: require('lru-cache')({
        max: 1000,
        maxAge: 1000 * 60 * 15
      })
    }
  },
  //   scrollBehavior: function (to, from, savedPosition) {
  //     console.log("from congig" + savedPosition)
  //     console.log(savedPosition)
  //     return { x: 0, y: 500 }
  //   }
  // },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vuetify','vue-touch','vue-scroll','~/mixins/myMixin']
  },
  plugins: ['~plugins/vuetify.js','~plugins/event-hub.js',
            { src: '~/plugins/vue-touch', ssr: false },
            { src: '~/plugins/vue-scroll', ssr: false }],
  css: [
    { src: '~assets/style/app.styl', lang: 'styl' }
  ]

}
