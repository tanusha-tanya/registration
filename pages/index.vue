<template>
  <div id="knowledge-base" class="white-page">
    <div class="container">
      <div class="knowledge-base">
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
        this.$axios.post(process.env.baseUrl + '/content', {params: {expand:'body.export_view'}})
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
@import '@/styles/confluencesStyle.scss';
@import '@/styles/variables.scss';
.knowledge-base{
  @media(min-width:$tablet){
   width: calc(75% - 32px);
   margin: 0 auto;
 }
 @media(min-width:$desktop){
   width: calc(83% - 32px);
   margin: 0 auto;
 }
}
.updated{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 10px 0;
  @media(min-width:$tablet){
    justify-content: flex-start;
  }
  &-date{
    color: #616161;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.004em;
    font-family: 'RobotoRegular', sans-serif;
    @media(min-width:$tablet){
      font-size: 14px;
      line-height: 20px;
      margin-right: 15px;
    }
  }
  &-show{
    color: #5461DC;
    letter-spacing: 0.004em;
    font-size: 12px;
    line-height: 16px;
  }
}
.navigation{
  margin: 20px 0;
  @media(min-width:$tablet){
    margin: 39px 0;
  }
  &-title{
    font-weight: 500;
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #757575;
  }
  &-list{
    margin: 15px 0;
  }
  &-item{
    margin: 18px 0;
    padding-left: 24px;
    position: relative;
    &:before{
      content: '';
      display: block;
      width: 6px;
      height: 6px;
      background: #616161;
      border-radius: 50%;
      position: absolute;
      left: 9px;
      top: 9px;
    }
  }
  &-link{
    color: #5461DC;
    font-size: 12px;
    letter-spacing: 0.004em;
    @media(min-width:$tablet){
      font-size: 14px;
    }
  }
}
.information{
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.004em;
  color: #1E1F23;
  margin: 24px 0;
  @media(min-width:$tablet){
    font-size: 14px;
    line-height: 20px;
    margin-top: 56px;
  }
}
p{
  margin: 16px 0;
}
.changes{
  border-top: 1px solid #F5F5F5;
  margin: 24px 0;
  @media(min-width:$tablet){
    margin: 35px 0;
  }
  &-item{
    margin: 21px -8px;
    display: flex;
  }
  &-date{
    width: calc(25% - 16px);
    margin: 0 8px;
    font-size: 12px;
    letter-spacing: 0.004em;
    color: #616161;
    @media(min-width:$tablet){
      font-size: 14px;
      letter-spacing: normal;
    }
    @media(min-width:$desktop){
      width: calc(10% - 16px);
    }
  }
  &-info{
    width: calc(75% - 16px);
    margin: 0 8px;
    font-size: 12px;
    letter-spacing: 0.004em;
    color: #1E1F23;
    @media(min-width:$tablet){
      font-size: 14px;
      letter-spacing: normal;
    }
    @media(min-width:$desktop){
      width: calc(90% - 16px);
    }
  }
}

</style>
