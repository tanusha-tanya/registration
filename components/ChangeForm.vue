<template>
  <div>
    <form action="#" class="change__form" @submit.prevent="" v-if="type == 'password'">
      <div class="input-item__input-wrapper">
        <label
          for="old_password"
          class="input-item__label input-item__label--reqired"
        >
          Старый пароль
        </label>
        <input
          class="input-item__input"
          id="old_password"
          type="password"
          v-model.trim="old_password"
        />
      </div>
      <div class="input-item__input-wrapper">
        <label
          for="password"
          class="input-item__label input-item__label--reqired"
        >
          Пароль
        </label>
        <input
          class="input-item__input"
          id="password"
          type="password"
          v-model.trim="password"
        />
      </div>
      <div class="change-description"> Введите 8 символов</div>
      <div class="input-item__input-wrapper">
        <label
          for="password"
          class="input-item__label input-item__label--reqired"
        >
          Повторите пароль
        </label>
        <input
          class="input-item__input"
          id="password_confirmation"
          type="password"
          v-model.trim="password_confirmation"
        />
      </div>
      <div class="form-error" v-if="hasErrors">
        <span v-if="errors[formName] !== undefined">{{errors[formName][0]}}</span>
        <span v-if="errors['old_password'] !== undefined">{{errors['old_password'][0]}}</span>
      </div>
      <div class="change__submit-wrapper">
        <Button @buttonClick="editUser" :text="'Изменить пароль'" class="change__submit"/>
      </div>
    </form>
    <ChangeCity @selectedCity="editUser" v-else-if="type == 'city'"/>
    <form action="#" class="change__form" @submit.prevent="" v-else>
      <div class="input-item__input-wrapper">
        <input v-if="!mask"
               class="input-item__input"
               :id="formName"
               :disabled=is_disabled
               v-model="currentInput"
               type="text"
        />
        <the-mask :mask="currentMask" v-else
                  class="input-item__input"
                  :id="formName"
                  :disabled=is_disabled
                  v-model="currentInput"
                  type="text"
                  :masked="true"
        />
        <div class="form-error" v-if="hasErrors">
          <span v-if="errors[formName] !== undefined">{{errors[formName][0]}}</span>
        </div>
        <Button @buttonClick="editUser" :text="'Сохранить'"/>
      </div>
    </form>
    <transition name="bounce">
      <Myalert
        v-if="success"
        :title="'Пароль изменён'"
        :content="`<p>Ваш пароль успешно изменён<p/>`"
        @close="closeAlert"
      >
      </Myalert>
    </transition>
  </div>
</template>

<script>
    import Button from '@/components/Button';
    import Myalert from '@/components/Myalert';
    import {TheMask} from 'vue-the-mask'
    import masks from "../config/masks";
    import resolveError from "../helpers/resolveError";
    import CitySelect from "./Form/CitySelect";
    import ChangeCity from "./Form/ChangeCity";
    import {checkEmail, checkINN} from "../helpers/validation";
    import {USER_ERROR_MESSAGES} from "../data/messages/validationMessages";
    import {sanitize_number} from "../helpers/general";
    const validItn = (value) => checkINN(value)
    export default {
        name: 'ChangeForm',
        props: ['cancelLnk', 'formName', 'mask', 'type', 'isNotEditable'],
        data() {
            return {
                password: '',
                password_confirmation: '',
                old_password: '',
                success: false,
                hasErrors: false,
                errors: [],
                currentInput: '',
            }
        },
        components: {
            ChangeCity,
            CitySelect,
            Button,
            Myalert,
            TheMask,
        },
        computed: {
            currentMask() {
                return masks[this.mask]
            },
            is_disabled() {
              return !!this.isNotEditable
            }
        },
        methods: {
            cancel() {
                this.$emit('cancel', false)
            },
            closeAlert() {
                this.success = false
                this.cancel()
            },
            editUser(city) {
                if (this.validateForm(this.formName)) {
                    let payload = {}
                    const oldData = this.$store.state.user.user
                    switch (this.formName) {
                        case "password":
                            payload.old_password = this.old_password
                            payload.password = this.password
                            payload.password_confirmation = this.password_confirmation
                            break
                        case "itn":
                            payload.itn = this.currentInput.replace(/\s+/g, '')
                            break
                        case "phone":
                            let trimmedPhone = sanitize_number(this.currentInput)
                            payload.phone = trimmedPhone
                            break
                        case 'city':
                            payload.city = city
                            payload.city_id = city.id
                        default:
                            payload[this.formName] = this.currentInput
                            break
                    }
                    const app = this
                    app.$store.dispatch('user/addUser', payload)
                    let sendData = this.$store.state.user.user
                    app.$axios.post(process.env.baseUrl + '/lk/info', sendData)
                        .then(function (response) {
                            const responseData = response.data.data
                            app.$store.dispatch('user/updateUser', responseData)
                            app.cancel()
                        })
                        .catch(error => {
                            let errors = resolveError(error)
                            this.hasErrors = true
                            if (typeof errors === 'object') {
                                payload = oldData
                                this.$store.dispatch('user/updateUser', payload)
                                this.showErrors(errors)
                            }
                        })
                }
            },
            showErrors(errors) {
                this.hasErrors = true
                this.errors = errors
            },
            validateForm(formName) {
                let errors = []
                let result = false
                switch (formName) {
                    case 'itn':
                        if (checkINN(this.currentInput)) {
                            result = true
                        } else {
                            errors['itn'] = [USER_ERROR_MESSAGES.itn.itn]
                            this.showErrors(errors)
                        }
                        break
                    case 'email':
                        if (checkEmail(this.currentInput)) {
                            result = true
                        } else {
                            errors['email'] = [USER_ERROR_MESSAGES.email.email]
                            this.showErrors(errors)
                        }
                        break
                    case 'password':
                        if(this.password) {
                           result = true
                        } else {
                            errors['password'] = [USER_ERROR_MESSAGES.password.required]
                            this.showErrors(errors)
                        }
                        break
                    default:
                        result = true
                        break
                }
                return result
            },
        },
    }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  .change__form {
    padding-bottom: 16px;
  }

  .form-error {
    font-size: 12px;
    position: absolute;
    bottom: -15px;
    color: red;
  }

  .change {
    &__submit {
      width: 100%;
      max-width: 277px;
      position: relative;
      margin: 0 auto;
      display: block;
      letter-spacing: 0.004em;
      font-size: 12px;
      line-height: 16px;
      text-transform: none;
      @media(min-width: $tablet) {
        max-width: 168px;
        margin-left: 192px;
      }
    }

    &__form {
      @media(min-width: $tablet) {
        width: 100%;
        position: relative;
        .input-item {
          display: flex;

          &__header {
            width: 192px;
          }

          &__input {
            width: 280px;
          }
        }
        background: #FAFAFA;
        padding: 12px 16px;
      }
    }

    &-description {
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.004em;
      margin-left: 16px;
      @media(min-width: $tablet) {
        margin-left: 0;
      }
    }
  }

  .cancel {
    display: none;
    @media(min-width: $tablet) {
      position: absolute;
      top: 20px;
      right: 16px;
      color: #5461DC;
      font-size: 12px;
      line-height: 16px;
      display: block;
      z-index: 300;
    }
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
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
    width: 27%;

    &--reqired {
      &::after {
        content: '*';
        color: #ff0000;
      }
    }
  }

  .input-item__input-wrapper {
    position: relative;
    padding: 16px;
    @media(min-width: $tablet) {
      display: flex;
      padding: 16px 0;
      align-items: center;
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

  .button {
    margin: 16px 0;

    &.change__submit {
      position: relative;
      display: block;
      margin: 0 auto;
    }

    @media(min-width: $tablet) {
      position: absolute;
      right: 0;
      margin: 0;
      &.change__submit {
        position: relative;
        margin-left: 27%;
      }
    }
  }
</style>
