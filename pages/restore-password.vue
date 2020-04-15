<template>
    <div class="login">
        <div class="title">
            <h1>Восстановить пароль</h1>
        </div>
        <div class="description">
            Введите электронную почту, указанную при регистрации. На неё придёт код для восстановления пароля.
        </div>
        <form action="#" class="login__form" @submit.prevent="submitHandler">
        <div class="input-item__input-wrapper">
            <label
              for="email"
              class="input-item__label input-item__label--reqired"
            >
              E-mail
           </label>
            <input
                class="input-item__input"
                type="'text'" 
                v-model="email"
                id="email"
                :class="{invalid: ($v.email.$dirty && !$v.email.required) ||
                ($v.email.$dirty && !$v.email.email)}"                  
            />
            <transition name="opacity">
              <div class="form-error" v-if="$v.email.$dirty && !$v.email.required">
                заполните поле
              </div>
            </transition>
            <transition name="opacity">
              <div class="form-error" v-if="$v.email.$dirty && !$v.email.email && $v.email.required">
                Введите корректное значение
              </div> 
             </transition>
        </div>
        <div class="restore-password-wrapper">
            <nuxt-link class="restore-cancel" to="/login">Отменить</nuxt-link>
            <Button :text="'Получить код'" class="restore-password" />
        </div>
        </form>
        <transition name="bounce">
          <Myalert v-if="success"
              :title="'Код отправлен'"
              :content="`<p>На указанную электронную почту отправлен код для восстановления пароля.</p>`"
              @close="closeAlert"                
          >            
          </Myalert>
        </transition>
        <transition name="bounce">
          <Myalert v-if="errormsg"
              :title="'Ошибка'"
              :content="`<p>На электронную почту <a href='mailto: ${email}'>${email}</a> учетная запись не зарегистрирована.</p><p>Укажите правильный адрес и повторите попытку.</p>`"
              @close="stayHere"                
          >            
          </Myalert>
        </transition>
    </div>    
</template>
<script>
import InputItem from '@/components/Form/InputItem';    
import Button from '@/components/Button';
import Myalert from '@/components/Myalert';
import {required, email} from 'vuelidate/lib/validators'

export default {
    name: 'restore-password',
    components:{
        InputItem,
        Button,
        Myalert
    },
    validations:{
      email:{required, email},
    },
    data(){
        return{
          success: false,
          email: '',  
          errormsg: false                     
        }
    },
    methods:{      
      submitHandler(){
        if(this.$v.$invalid){
          this.$v.$touch()            
          return
        } 
         // return this.success = true
        const sendData = {'email': this.email}
        this.$axios.post(process.env.baseUrl  + '/auth/sendresetlink', sendData).then(function (response) {
          signin(response);
        }).catch((error) => {          
          return this.errormsg = true 
        });      
        let signin = (data) =>{
          if(data.status == 200){                   
            return this.success = true      
          }
        }  
      }, 
      closeAlert(){
        this.$router.push('/login')
      },
      stayHere(){
        this.errormsg = false
        this.email = ''  
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
  h1{
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
}
.login__submit {
  min-width: 206px;
}
.title{
    padding-bottom: 15px;
    border-bottom: 1px solid #F2F2F2;        
}
.description{
    color: #616161;
    text-align: center;
    margin: 13px;
    margin-bottom: 0;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.004em;  
}
.restore-password{
    letter-spacing: 0.004em;
    font-size: 12px;
    line-height: 16px;
    text-transform: none;
    padding: 12px 28px;
    &-wrapper{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.restore-cancel{
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
  &.invalid{
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
  .form-error{
    font-size: 12px;
    position: absolute;
    bottom: -15px;
    color: red;
  }
</style>