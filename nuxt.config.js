import {getServerUrl} from "./helpers/serverUrl"

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Partner',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/katren.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'white' },
  /*
  ** Global CSS
  */
  css:[
    '@/styles/fonts.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/vuelidate'},
    {src: '~/plugins/vue-the-mask'},
    {src: '~/plugins/lodash'},
    {src: '~plugins/cookies'}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  env: {
    baseUrl: getServerUrl(process.env.NODE_ENV)
  },
}
