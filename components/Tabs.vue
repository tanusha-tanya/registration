<template>
  <div class="tabs">
    <ul class="tabs__list">
      <li class="tabs__item" v-for="item in items" :key="item.name">
        <button
          class="tabs__link"
          :class="{
            'tabs__link--active': item.active,
          }"
          @click="tabClick(item)"
        >
          {{ item.text }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    items: Array,
  },
  methods: {
    tabClick(item) {
      this.$emit('tabClick', item);
    },
  },
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
