<template>
  <div class="registration">
    <RegistrationNav/>
    <form action="#" class="registration__form" @submit.prevent="submitHandler">
      <FormInput
        label="ИНН организации"
        form_name="itn"
        :value="fields.itn"
        @getData="getInputData"
        type="text"
        :is_required="true"
        :has_error="!!($v.fields.itn.$anyError || errorMsg.itn)"
        :error_message="itn"
        :error_class="$v.fields.itn.$anyError || errorMsg.itn ? 'invalid' : ''"
      />
      <FormInput
        label="Название организации"
        form_name="company_name"
        :is_required="true"
        :value="fields.company_name"
        @getData="getInputData"
        type="text"
        :has_error="!!($v.fields.company_name.$anyError || errorMsg.company_name)"
        :error_message="company_name"
        :error_class="!!($v.fields.company_name.$anyError || errorMsg.company_name) ? 'invalid' : ''"
      />
      <FormInput
        label="E-mail"
        form_name="email"
        :is_required="true"
        :value="fields.email"
        @getData="getInputData"
        type="text"
        :has_error="!!($v.fields.email.$anyError || errorMsg.email)"
        :error_message="email"
        :error_class="!!($v.fields.email.$anyError || errorMsg.email) ? 'invalid' : ''"
      />
      <FormInput
        label="Пароль"
        form_name="password"
        :is_required="true"
        :value="fields.password"
        @getData="getInputData"
        type="password"
        :has_error="!!($v.fields.password.$anyError || errorMsg.password)"
        :error_message="password"
        :error_class="!!($v.fields.password.$anyError || errorMsg.password) ? 'invalid' : ''"
      />
      <FormInput
        label="ФИО контактного лица"
        form_name="accountable_full_name"
        :is_required="true"
        :value="fields.accountable_full_name"
        @getData="getInputData"
        type="text"
        :has_error="!!($v.fields.accountable_full_name.$anyError)"
        :error_message="accountable_full_name"
        :error_class="!!($v.fields.accountable_full_name.$anyError) ? 'invalid' : ''"
      />
      <FormInput
        label="Телефон"
        form_name="phone"
        :value="fields.phone"
        @getData="getInputData"
        mask="+7 (###) ###-##-##"
        type="text"
        :is_required="true"
        :has_error="!!($v.fields.phone.$anyError)"
        :error_message="phone"
        :error_class="!!($v.fields.phone.$anyError) ? 'invalid' : ''"
      />
      <FormInput
        label="Веб-сайт"
        form_name="website"
        :value="fields.website"
        @getData="getInputData"
        type="text"
        placeholder="http://site.ru"
        :is_required="true"
        :has_error="!!($v.fields.website.$anyError || errorMsg.website)"
        :error_message="website"
        :error_class="!!($v.fields.website.$anyError || errorMsg.website )  ? 'invalid' : ''"
      />
      <div v-model="fields.city_id" class="input-item__input-wrapper">
        <label for="city" class="input-item__label input-item__label--reqired">
          Город
        </label>
        <ChangeCity @selectedCity="onSetValue"/>
        <div class="form-error" v-if="cityIsValid === false">
          Выберите город
        </div>
      </div>
      <div class="registration__submit-wrapper">
        <Button :text="'Зарегистрироваться'" class="registration__submit"/>
      </div>
    </form>
    <transition name="bounce">
      <Myalert v-if="success"
               :title="'ПОЗДРАВЛЯЕМ'"
               :content="`<p>Вы зарегистрированы на портале. Ваш логин:</p> <nuxt-link to='/'>${fields.email}</nuxt-link>`"
               @close="closeAlert"
      >
      </Myalert>
    </transition>
    <transition name="bounce">
      <Myalert v-if="errorKey"
               :title="'Ошибка'"
               :content="`<p>Срок вашего приглашения истёк</p>`"
               @close="closeError"
      >
      </Myalert>
    </transition>
  </div>
</template>

<script>
  import RegistrationNav from '@/components/RegistrationNav';
  import CitySelect from '@/components/Form/CitySelect';
  import ChangeCity from "@/components/Form/ChangeCity";
  import Button from '@/components/Button';
  import Myalert from '@/components/Myalert';
  import {required, email, minLength} from 'vuelidate/lib/validators';
  import resolveError from "../helpers/resolveError";
  import {checkINN, checkUrl} from "../helpers/validation";
  import FormInput from "../components/Form/FormInput";
  import {USER_ERROR_MESSAGES} from "../data/messages/validationMessages";
  import {sanitize_number} from "../helpers/general";
  //Кастомное правило для vuelidate
  const validItn = (value) => checkINN(value)
  const validUrl = (value) => checkUrl(value)
  export default {
    name: 'RegistrationPage',
    components: {
      FormInput,
      RegistrationNav,
      CitySelect,
      Button,
      Myalert,
      ChangeCity
    },
    data() {
      return {
        success: false,
        cityIsValid:true,
        errorKey: false,
        errorMsg: [],
        fields: {
          itn: null,
          company_name: null,
          accountable_full_name: null,
          email: null,
          password: null,
          password_confirmation: null,
          phone: null,
          website: null,
          office_address: null,
          city: null,
          city_id: null,
        }
      }
    },
    computed: {
      invitation() {
        return window.location.search.split('?invitation_key=')[1]
      },
      itn() {
        let result = ''
        if (this.$v.fields.itn.$dirty && !this.$v.fields.itn.required) {
          result = USER_ERROR_MESSAGES.itn.required
        } else if (this.$v.fields.itn.$dirty && !this.$v.fields.itn.validItn) {
          result = USER_ERROR_MESSAGES.itn.itn
        } else {
          result = this.errorMsg.itn ? this.errorMsg.itn[0] : ''
        }
        return result
      },
      company_name() {
        let result = ''
        if (this.$v.fields.company_name.$dirty && !this.$v.fields.company_name.required) {
          result = USER_ERROR_MESSAGES.company_name.required
        } else {
          result = this.errorMsg.company_name ? this.errorMsg.company_name[0] : ''
        }
        return result
      },
      email() {
        let result = ''
        if (this.$v.fields.email.$dirty && !this.$v.fields.email.required) {
          result = USER_ERROR_MESSAGES.email.required
        } else if (this.$v.fields.email.$dirty && !this.$v.fields.email.email) {
          result = USER_ERROR_MESSAGES.email.email
        } else {
          result = this.errorMsg.email ? this.errorMsg.email[0] : ''
        }
        return result
      },
      password() {
        let result = ''
        if (this.$v.fields.password.$dirty && !this.$v.fields.password.required) {
          result = USER_ERROR_MESSAGES.password.required
        } else if (this.$v.fields.password.$dirty && !this.$v.fields.password.minLength) {
          result = USER_ERROR_MESSAGES.password.minLength
        } else {
          result = this.errorMsg.password ? this.errorMsg.password[0] : ''
        }
        return result
      },
      accountable_full_name() {
        let result = ''
        if (this.$v.fields.accountable_full_name.$dirty && !this.$v.fields.accountable_full_name.required) {
          result = USER_ERROR_MESSAGES.accountable_full_name.required
        } else {
          result = this.errorMsg.accountable_full_name ? this.errorMsg.accountable_full_name[0] : ''
        }
        return result
      },
      phone() {
        let result = ''
        if (this.$v.fields.phone.$dirty && !this.$v.fields.phone.required) {
          result = USER_ERROR_MESSAGES.phone.required
        } else {
          result = this.errorMsg.phone ? this.errorMsg.phone[0] : ''
        }
        return result
      },
      website() {
        let result = ''
        if (this.$v.fields.website.$dirty && !this.$v.fields.website.required) {
          result = USER_ERROR_MESSAGES.website.website
        } else if (this.$v.fields.website.$dirty && !this.$v.fields.website.validUrl) {
          result = USER_ERROR_MESSAGES.website.website
        } else {
          result = this.errorMsg.website ? this.errorMsg.website[0] : ''
        }
        return result
      },
    },
    validations: {
      fields: {
        itn: {required, validItn},
        company_name: {required},
        email: {required, email},
        password: {required, minLength: minLength(8)},
        accountable_full_name: {required},
        phone: {required},
        website: {required, validUrl}
      }
    },
    methods: {
      submitHandler() {
        let apiUrl = '/auth/signup'
        if (this.$v.$invalid) {
          if (this.fields.city_id === null) {
            this.cityIsValid = false
          }
          this.$v.$touch()
          return
        }
        this.fields.password_confirmation = this.fields.password
        if (this.fields.phone) {
          this.fields.phone = sanitize_number(this.fields.phone)
        }
        if (this.fields.itn) {
          this.fields.itn = sanitize_number(this.fields.itn)
        }
        const sendData = {}
        for (let key in this.fields) {
          if (this.fields[key] !== null) {
            sendData[key] = this.fields[key]
          }
        }
        if (this.invitation) {
          apiUrl = `/auth/signup/${this.invitation}`
        }

        this.$axios.post(process.env.baseUrl + apiUrl, sendData).then(function (response) {
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
          if (data.status === 200) {
            let token = JSON.parse(data.request.response).data.access_token;
            this.$store.dispatch('login', {token})
            return this.success = true
          }
        }
      },
      closeAlert() {
        this.$router.push('/')
      },
      onSetValue(data) {
        if (data) {
          if ('id' in data) {
            this.cityIsValid = true
            this.fields.city_id = data.id
          }
        } else {
          this.fields.city_id = null
          this.cityIsValid = false
        }
      },
      closeError() {
        this.$router.push('/signup')
        this.errorKey = false
      },
      getParams(data) {
        let invitationData = data.data.data
        this.fields = {...this.fields, ...invitationData}
      },
      getInputData(data) {
        this.fields[data['name']] = data.data
      }
    },
    mounted() {
      if (this.invitation) {
        this.$axios.get(process.env.baseUrl + '/auth/signup/' + this.invitation).then((response) => {
          this.getParams(response);
        }).catch((e) => {
          this.errorKey = true
        })
      }
    }
  };
</script>

<style lang="scss">
  @import '@/styles/variables.scss';

  .registration {
    margin: 48px auto;
    width: calc(100% - 16px);
    max-height: calc(100% - 96px);
    background: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    @media (min-width: $tablet) {
      margin: 80px auto;
      max-height: calc(100% - 160px);
      width: 560px;
    }
  }

  .registration__form {
    padding: 16px 16px 32px;

    @media (min-width: $tablet) {
      padding: 16px 96px 32px;
    }
  }

  .registration__submit-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }

  .registration__submit {
    min-width: 206px;
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
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    top: 100%;
    color: red;
    max-width: 100%;
    display: block;
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

  .autocompleet {
    width: 100%;
    position: absolute;
    max-height: 200px;
    overflow: auto;
    margin-bottom: 30px;

    ul {
      box-sizing: border-box;
    }

    li {
      padding: 10px;
      background: #EAEAEA;
      transition: background .3s;

      &:hover {
        background: #FFF;
      }
    }
  }
</style>
