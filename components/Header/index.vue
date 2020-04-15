<template>
  <div>
    <header class="page-header"
      :class="{
          'page-header--auth': isAuthorized,
      }"> 
      <div class="header-container"
        :class="{
          'header-container--auth': isAuthorized,
        }">
        <div :class="isAuthorized?'header-left':'header-center'">
          <a class="hamburger" href="#" @click.prevent="openMenu = !openMenu" v-if="isAuthorized">
            <svg-icon name="burger" width="24" height="17" />
          </a>
          <Logo />
        </div>
        <div class="header-right" v-if="isAuthorized">
          <Menu/>
        </div>
      </div>
    </header>
    <div class="sidemenu sidemenu__big" v-if="isAuthorized">
        <nuxt-link to="/" class="sidemenu-link" exact>
          <svg-icon name="home" width="24" height="24" />
        </nuxt-link>
        <nuxt-link to="/api" class="sidemenu-link" exact>
          <svg-icon name="api" width="24" height="24" />
        </nuxt-link>
      </div>
    <transition name="fade">
      <div class="sidemenu sidemenu__little" v-if="openMenu && isAuthorized">
        <nuxt-link to="/" class="sidemenu-link" exact>
          <svg-icon name="home" width="24" height="24" />
        </nuxt-link>
        <nuxt-link to="/api" class="sidemenu-link" exact>
          <svg-icon name="api" width="24" height="24" />
        </nuxt-link>
      </div>
    </transition> 
  </div>
</template>

<script>
import Logo from '@/components/Header/Logo';
import Menu from '@/components/Header/Menu';

export default {
  name: 'Header',
  components: {
    Logo,
    Menu,
  },
  data(){
    return{
      openMenu: false,
    }
  },
  computed: {
    isAuthorized: function(){
      return this.$route.name === 'index' || this.$route.name === 'user' || this.$route.name === 'api' 
    }
  },
  methods:{
    closeMenuByClick(event){
      if (!event.target.classList.contains('menu') &&
        !event.target.closest('.menu') &&  !event.target.closest('.hamburger')){
        this.openMenu = false
      }
    },
    closeMenuByEscape(event){
      if(event.key === "Escape") {
        this.openMenu = false
      }
    },
    closeNoticeByClick(event){
      if (!event.target.classList.contains('notice') &&
        !event.target.closest('.notice') &&  !event.target.closest('.header-notice')){
        this.openNotice = false
      }
    },
    closeNoticeByEscape(event){
      if(event.key === "Escape") {
        this.openNotice = false
      }
    },
  },
  mounted(){
    document.body.addEventListener('click', this.closeMenuByClick, false);
    document.addEventListener('keydown', this.closeMenuByEscape, false);
    document.body.addEventListener('click', this.closeNoticeByClick, false);
    document.addEventListener('keydown', this.closeNoticeByEscape, false);
  }
};
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.page-header {
  background-color: $main-color;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 900;
  &--auth{
    background-color: #fff;
    @media(min-width: $tablet){
      background-color: $main-color;
    }
  }
}
.header-container{
  min-width: $mobile;
  display: flex;  
  justify-content: center;
  min-height: 56px;
  align-items: center;
  &--auth{
    justify-content: space-between;
    align-items: stretch;
  }
}
.header-right{
  align-self: center;  
}
.header-left{
  display: flex;
  align-items: center;
}
.hamburger{
   background-color: $main-color;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 56px;
   height: 100%;
   position: relative;
   z-index: 800;
   @media(min-width: $tablet){
     display: none;
     border-right: 1px solid rgba(250, 250, 250, 0.2);
   }   
}
.sidemenu{
  width:56px;
  background: #1E1F23;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  bottom:0;
  z-index:500;
  padding-top: 56px;
  &__big{
    display: none;
    @media(min-width:$tablet){
      display: block;
    }
  }
  &__little{
    @media(min-width:$tablet){
      display: none;
    }
  }
  &-link{
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background .3s;
    &:hover{
      background: #5461DC;
    }
    &.nuxt-link-active{
      background: #5461DC;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
