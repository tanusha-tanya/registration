<template>
  <div class="tabs">
    <ul class="tabs__list">
      <li class="tabs__item">
        <nuxt-link
          to="/login"
          class="tabs__link"
          active-class="tabs__link--active"
        >
          Вход
        </nuxt-link>
      </li>
      <li class="tabs__item">
        <nuxt-link
          to="/signup"
          class="tabs__link"
          active-class="tabs__link--active"
        >
          Регистрация
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RegistrationNav',
};
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.tabs__list {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;  
}
.tabs__item {
  flex-grow: 1;
  list-style: none;
}

.tabs__link {
  display: block;
  width: 100%;
  text-align: center;
  position: relative;
  padding: 15px 16px 13px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #757575;
  cursor: pointer;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }

  &::after {
    content: '';
    width: 100%;
    height: 2px;
    background-color: $border-color;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  &--active {
    color: $main-color;
    cursor: default;
    &:after {
      background-color: $main-color;
    }
  }
}
</style>
