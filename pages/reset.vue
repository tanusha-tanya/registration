<template>
  <div class="login">
    <div class="title">
      <h1>Сбросить пароль</h1>
    </div>
    <form action="#" class="login__form" @submit.prevent="submitHandler">
      <div class="input-item__input-wrapper">
        <label for="password" class="input-item__label input-item__label--reqired">
          Новый пароль
        </label>
        <input
          class="input-item__input"
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) ||
                                ($v.password.$dirty && !$v.password.minLength) || errorMsg.password}"
          @input="errorMsg.password=null"
        />
        <div class="form-error" v-if="$v.password.$dirty && !$v.password.minLength">
          Слишком короткий пароль
        </div>
        <div class="form-error" v-if="$v.password.$dirty && !$v.password.required">
          Заполните поле
        </div>
        <div class="form-error" v-if="errorMsg.password">
          {{errorMsg.password[0]}}
        </div>
      </div>
      <div class="description"> Введите 8 символов</div>
      <div class="input-item__input-wrapper">
        <label for="password" class="input-item__label input-item__label--reqired">
          Повторите пароль
        </label>
        <input
          class="input-item__input"
          id="repeatpassword"
          type="password"
          v-model.trim="password_confirmation"
          :class="{invalid: ($v.password_confirmation.$dirty && !$v.password_confirmation.required) ||
                         ($v.password_confirmation.$dirty && !$v.password_confirmation.minLength) || errorMsg.password_confirmation }"
          @input="errorMsg.password_confirmation=null"
        />
        <div class="form-error" v-if="$v.password_confirmation.$dirty && !$v.password_confirmation.minLength">
          Слишком короткий пароль
        </div>
        <div class="form-error" v-if="$v.password_confirmation.$dirty && !$v.password_confirmation.required">
          Заполните поле
        </div>
        <div class="form-error" v-if="errorMsg.password_confirmation">
          {{errorMsg.password[0]}}
        </div>
      </div>
      <div class="login__submit-wrapper">
        <div class="form-error" v-if="errorMsg.token">Ваши ссылка устарела</div>
        <Button :text="'Изменить пароль'" class="login__submit"/>
      </div>
    </form>
    <transition name="bounce">
      <Myalert v-if="success"
               :title="'Пароль изменён'"
               :content="`<p>Ваш пароль успешно изменён</p>`"
               @close="closeAlert"
      >
      </Myalert>
    </transition>
  </div>
</template>
<script>
    import Button from '@/components/Button';
    import {required, minLength} from 'vuelidate/lib/validators';
    import Myalert from '@/components/Myalert';
    import resolveError from "../helpers/resolveError";

    export default {
        name: 'reset',
        components: {
            Button,
            Myalert
        },
        data() {
            return {
                password: null,
                password_confirmation: null,
                token: null,
                email: null,
                success: false,
                errorMsg: []
            }
        },
        validations: {
            password: {required, minLength: minLength(8)},
            password_confirmation: {required, minLength: minLength(8)}
        },
        created() {
            try {
                let urlParams = window.location.search.split('&');
                this.token = urlParams[0].split('?token=')[1]
                this.email = urlParams[1].split('email=')[1].replace("%40", "@")
            } catch {
                this.$router.push('/')
            }
        },
        methods: {
            submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                const sendData = {
                    "email": this.email,
                    "token": this.token,
                    "password": this.password,
                    "password_confirmation": this.password_confirmation
                }
                this.$axios.post(process.env.baseUrl + '/auth/resetpassword', sendData).then(function (response) {
                    signin(response);
                })
                    .catch(error => {
                        let errors = resolveError(error)
                        if (typeof errors === 'object') {
                            for (let key in errors) {
                                this.errorMsg = errors
                            }
                        }
                    })
                let signin = (data) => {
                    if (data.status == 200) {
                        return this.success = true
                    }
                }
            },
            closeAlert() {
                this.$router.push('/login')
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

    h1 {
      text-align: center;
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

  .title {
    padding-bottom: 15px;
    border-bottom: 1px solid #F2F2F2;
  }

  .description {
    color: #616161;
    text-align: center;
    margin: 13px;
    margin-bottom: 0;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.004em;
  }

  .restore-password {
    letter-spacing: 0.004em;
    font-size: 12px;
    line-height: 16px;
    text-transform: none;
    padding: 12px 28px;

    &-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .restore-cancel {
    color: #5461DC;
    letter-spacing: 0.004em;
    font-size: 12px;
    line-height: 16px;
    padding: 12px 16px;
  }

  .input-item__input-wrapper {
    position: relative;
    margin: 15px 0;
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

  .input-item__input {
    display: block;
    width: 100%;
    font-size: 14px;
    line-height: 18px;
    background: #fafafa;
    border: 2px solid $border-color;
    border-radius: 4px;
    padding: 13px;
    transition: border-color .3s;

    &--password {
      padding-right: 40px;
    }

    &.invalid {
      border-color: red;
    }

    &:focus {
      outline: none;
      background-color: #ffffff;
    }
  }

  .opacity-enter-active {
    animation: opacity-in .3s;
  }

  .opacity-leave-active {
    animation: opacity-in .3s reverse;
  }

  @keyframes opacity-in {
    0% {
      transform: translateX(-20px);
      opacity: 0;
    }
    50% {
      transform: translateX(-10px);
      opacity: 0.3;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .form-error {
    font-size: 12px;
    position: absolute;
    bottom: -15px;
    color: red;
  }
</style>
