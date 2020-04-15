<template>
  <div class="menu">    
    <svg-icon name="account" width="24" height="24" class="menu-opener" @click="openMenu=!openMenu"/>
    <div class="menu__title" v-if="companyName || itn">
      {{ companyName }}
      <span>инн: {{itn}}</span>
    </div>
    <transition name="bounce">
      <ul class="menu__items" v-if="openMenu == true">
          <li class="menu__list" v-if="$nuxt.$route.name != 'user'">
              <nuxt-link to="/user" class="menu__link" >Личные данные</nuxt-link>
          </li>
          <li class="menu__list">
              <a href="#" class="menu__link" @click.prevent="logout()">Выйти</a>
          </li>
      </ul>
    </transition>
    </div>
</template>

<script>
import resolveError from "../../helpers/resolveError";
export default {
  name: 'Menu',
  data(){
      return {
        openMenu: false,
      }
  },
  computed: {
    companyName() { return this.$store.state.user.user.company_name },
    itn() { return this.$store.state.user.user.itn }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    closeMenuByClick(event){
      if (!event.target.classList.contains('menu') &&
        !event.target.closest('.menu')){
        this.openMenu = false
      }
    },
    closeMenuByEscape(event){
      if(event.key === "Escape") {
        this.openMenu = false
      }
    }
  },
  mounted(){
    this.$axios.get(process.env.baseUrl + '/lk/info')
        .then(response => {
            const responseData = response.data.data
            this.$store.dispatch('user/addUser', responseData)
        })
        .catch(function (e) {
            resolveError(e)
        })
    document.body.addEventListener('click', this.closeMenuByClick, false);
    document.addEventListener('keydown', this.closeMenuByEscape, false);
  },
  destroyed(){
    document.removeEventListener('keydown', this.closeMenuByEscape, false);
    document.body.removeEventListener('click', this.closeMenuByClick, false);
  }
};
</script>
<style lang="scss">
@import '@/styles/variables.scss';
.menu {
  display: flex;
  padding: 15px;
  color: $header-color;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
  @media(min-width: $tablet){
    height: 100%;
    border-left: 1px solid rgba(250, 250, 250, 0.2);
  }
  @media(min-width: $desktop){
    padding-right: 37px;
    padding-right: 35px; 
  }
  &__items{
    position: absolute;
    right: 15px;
    top: 16px;
    width: 280px;
    padding-left: 16px;
    background: #ffffff;
    box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.2), 0px 3px 16px rgba(0, 0, 0, 0.12), 0px 9px 12px rgba(0, 0, 0, 0.14);
    border-radius: 4px;
    @media(min-width: $desktop){
      right: 37px;
    }
  }
  &__list{
      border-bottom: 1px solid #F2F2F2;
      padding: 14px 0;
    &:last-of-type{
        border-bottom: 0;
    }
  }
  &__link{
    font-size: 14px;
    display: block;
    padding: 10px 0;
    color: #1E1F23;
  }
  &__title {
    display: none;
    @media(min-width: 1000px){
      display: block;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: normal;
      margin-left: 7px;
      margin-right: 16px;
    }
    span {
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.7px;
      display: block;
    }
  }
  &-opener{
    cursor: pointer;
    fill: #6F6F6F;
    color: #6F6F6F;
    svg{
      fill: #6F6F6F;
      color: #6F6F6F;
    }
    @media(min-width: $tablet){
      right: 37px;
      fill: #fff;
      color: #fff;
      svg{
        fill: #fff;
        color: #fff;
      }
    }
  }
  .bounce-enter-active {
    animation: bounce-in .3s;
  }
    .bounce-leave-active {
      animation: bounce-in .3s reverse;
  }
  @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
}
</style>
