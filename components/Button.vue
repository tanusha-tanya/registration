<template>
  <button class="button" :class="customClass" @click="() => this.$emit('buttonClick')">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: String,
    customClass: String,
  },
};
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.button {
  background-color: $main-color;
  border: none;
  color: #ffffff;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  padding: 12px 16px;
  border-radius: 200px;
  cursor: pointer; 
}

</style>
