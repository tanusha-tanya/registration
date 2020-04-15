<template>
  <nuxt-link class="logo" to="/">
    <svg-icon name="logo" width="130" height="20" class="logo__img logo__img--big"/>
    <svg-icon name="logo_small" width="30" height="30" class="logo__img logo__img--small"/>
  </nuxt-link >
</template>

<script>
export default {
  name: 'Logo',
};
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.logo {  
 min-width: 55px;
 display: flex;
 align-content: center;
 justify-content: center;
 box-sizing: border-box; 
 @media(min-width:$tablet){
  min-width: 186px;
 }
}
.logo__img {
    &--big {
      display: none;
      @media (min-width: $tablet) {
        display: block;
        margin-left: 15px;
      }
    }
    &--small {
      display: block;
      @media (min-width: $tablet) {
        display: none;
      }
    }
  }
  .header-container--auth{
    .logo {   
      display: none;
      @media(min-width: $tablet){
        display: block;
      }
    }
  }
</style>
