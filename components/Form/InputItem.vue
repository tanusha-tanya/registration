<template>
  <div class="input-item">
    <div class="input-item__header">
      <label
        :for="id"
        class="input-item__label"
        :class="{
          'input-item__label--reqired': isRequired,
        }"
      >
        {{ label }}
      </label>
      <router-link v-if="!!link" :to="link.href" class="input-item__link">
        {{ link.text }}
      </router-link>
    </div>
    <div class="input-item__input-wrapper">
      <input
        :id="id"
        :type="getInputType()"
        class="input-item__input"
        :class="{
          'input-item__input--password': type === 'password',
        }"
        required="isRequired"        
      />
      <button
        class="input-item__show-password"
        type="button"
        v-if="type === 'password'"
        @click.prevent="togglePassword"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6C15.79 6 19.17 8.13 20.82 11.5C20.23 12.72 19.4 13.77 18.41 14.62L19.82 16.03C21.21 14.8 22.31 13.26 23 11.5C21.27 7.11 17 4 12 4C10.73 4 9.51 4.2 8.36 4.57L10.01 6.22C10.66 6.09 11.32 6 12 6ZM10.93 7.14L13 9.21C13.57 9.46 14.03 9.92 14.28 10.49L16.35 12.56C16.43 12.22 16.49 11.86 16.49 11.49C16.5 9.01 14.48 7 12 7C11.63 7 11.28 7.05 10.93 7.14ZM2.01 3.87L4.69 6.55C3.06 7.83 1.77 9.53 1 11.5C2.73 15.89 7 19 12 19C13.52 19 14.98 18.71 16.32 18.18L19.74 21.6L21.15 20.19L3.42 2.45L2.01 3.87ZM9.51 11.37L12.12 13.98C12.08 13.99 12.04 14 12 14C10.62 14 9.5 12.88 9.5 11.5C9.5 11.45 9.51 11.42 9.51 11.37ZM6.11 7.97L7.86 9.72C7.63 10.27 7.5 10.87 7.5 11.5C7.5 13.98 9.52 16 12 16C12.63 16 13.23 15.87 13.77 15.64L14.75 16.62C13.87 16.86 12.95 17 12 17C8.21 17 4.83 14.87 3.18 11.5C3.88 10.07 4.9 8.89 6.11 7.97Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputItem',
  props: {
    id: String,
    type: {
      type: String,
      default: 'text',
    },
    label: String,
    isRequired: Boolean,
    link: Object,
  },
  data: () => ({
    changeToText: false,
  }),
  methods: {
    togglePassword() {
      this.changeToText = !this.changeToText;
    },
    getInputType() {
      return this.type !== 'password'
        ? this.type
        : !this.changeToText
        ? this.type
        : 'text';
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.input-item {
  margin: 16px 0;
}
.input-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 5px;
}
.input-item__label {
  color: #616161;
  font-size: 12px;
  line-height: 16px;

  &--reqired {
    &::after {
      content: '*';
      color: #ff0000;
    }
  }
}
.input-item__input-wrapper {
  position: relative;
}
.input-item__input {
  display: block;
  width: 100%;
  font-size: 14px;
  line-height: 18px;
  background: #fafafa;
  border: 2px solid $border-color;
  border-radius: 4px;
  padding: 13px;

  &--password {
    padding-right: 40px;
  }

  &:focus {
    outline: none;
    background-color: #ffffff;
  }
}
.input-item__show-password {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #616161;

  &:focus {
    outline: none;
  }

  svg {
    display: block;
  }
}
.input-item__link {
  font-size: 12px;
  line-height: 16px;
  color: $main-color;
}
</style>
