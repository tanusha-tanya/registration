<template>
  <div id="api" class="white-page">
    <div class="container">
      <div class="api">
        <h1>{{title}}</h1>
        <div class="information" v-html="body">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import resolveError from "../helpers/resolveError";
  export default {
    middleware: ['auth'],
    data () {
        return {
          title: '',
          body: '',
        }
    },
    mounted() {
        this.$axios.post(process.env.baseUrl + '/doc', {params: {expand:'body.export_view'}})
            .then(response => {
                const responseData = response.data
                this.title = responseData.title
                this.body = responseData.body.export_view.value
            })
            .catch(function (e) {
                resolveError(e)
            })
    }
  }
</script>
<style lang="scss">
  @import '@/styles/variables.scss';
  .api{
    @media(min-width:$tablet){
    width: calc(75% - 32px);
    margin: 0 auto;
   }
    @media(min-width:$desktop){
    width: calc(83% - 32px);
    margin: 0 auto;
    }
  } 
</style>
