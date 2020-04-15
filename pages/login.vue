<template>
  <div class="login">
    <RegistrationNav />
    <form action="#" class="login__form" @submit.prevent="submitHandler">
      <div class="input-item__input-wrapper">
        <label
            for="email"
                class="input-item__label input-item__label--reqired"
              >
              Логин
        </label>
        <input
          class="input-item__input"
          id="email"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required)||
                    ($v.email.$dirty && !$v.email.email)}"
        />
          <div class="form-error" v-if="$v.email.$dirty && !$v.email.required">
              Заполните поле
          </div>
          <div class="form-error" v-if="$v.email.$dirty && !$v.email.email">
            Введите корректное значение
          </div>
        </div>
      <div class="input-item__input-wrapper">
        <div class="input-item__header">
          <label
            for="password"
                class="input-item__label input-item__label--reqired"
              >
              Пароль
          </label>
          <nuxt-link to="/restore-password" class="input-item__link">
            Забыли пароль?
          </nuxt-link>
        </div>
      <input
        class="input-item__input"
        id="password"
        label="Пароль"
        :type="changeToText?'text':'password'"
        v-model.trim="password"
        :class="{invalid: ($v.password.$dirty && !$v.password.required) ||
            ($v.password.$dirty && !$v.password.minLength)}"
      />
      <button
        class="input-item__show-password"
        type="button"
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
      <div class="form-error" v-if="$v.password.$dirty && !$v.password.required">
         Заполните поле
       </div>
      <div class="form-error" v-if="$v.password.$dirty && !$v.password.minLength">
         Слишком короткий пароль
      </div>
      </div>
      <div class="login__submit-wrapper">
        <div class="form-error" v-if="this.errorMessage.length>0">{{errorMessage}}</div>
        <Button :text="'Войти'" class="login__submit" />
      </div>
    </form>
  </div>
</template>

<script>
import RegistrationNav from '@/components/RegistrationNav';
import InputItem from '@/components/Form/InputItem';
import Button from '@/components/Button';
import {required, email, minLength} from 'vuelidate/lib/validators';

export default {
  name: 'LoginPage',
  components: {
    RegistrationNav,
    InputItem,
    Button
  },
  validations:{
    email:{required, email},
    password:{required, minLength},
  },
  methods: {
    togglePassword() {
      this.changeToText = !this.changeToText;
    },
    submitHandler() {
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const sendData = {
        "email": this.email,
        "password": this.password,
        "rememberme": false
      }
      this.$axios.post(process.env.baseUrl  + '/auth/login', sendData).then(function (response) {
        auth(response);
      })
      .catch((error) => {
        this.errorMessage = 'Неверные данные'
      });
      let auth = (data) =>{
        if(data.status == 200){
          let token = JSON.parse(data.request.response).data.access_token;
          this.$store.dispatch('login', {token})
          this.$router.push('/')
        }
        else{
          console.log('Неверные данные')
        }
      }
    }
  },
  data(){
    return{
      email: null,
      password: null,
      type: 'password',
      changeToText: false,
      errorMessage: '',
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.login {
  margin: 48px auto;
  width: calc(100% - 16px);
  max-height: calc(100% - 96px);
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: auto;

  @media (min-width: $tablet) {
    margin: 80px auto;
    max-height: calc(100% - 160px);
    width: 560px;
  }
}
.login__form {
  padding: 16px 16px 32px;

  @media (min-width: $tablet) {
    padding: 16px 96px 32px;
  }
}
.login__submit-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  position: relative;
}
.login__submit {
  min-width: 206px;
}
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
  margin: 15px 0;
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
  top: 45px;
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
