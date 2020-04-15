<template>
    <div class="user">
        <div class="container">
            <h1>Управление аккаунтом</h1>
            <div class="user-block">
                <div class="block-header">
                    <div class="block-title">Общая информация</div>
                </div>
                <user-tab form-name="itn" title="ИНН организации" :is-not-editable="true" :mask="masks.inn" :opened="false" :state="itn"/>
                <user-tab form-name="company_name" :is-not-editable="true" title="Название организации" :opened="false" :state="company_name"/>
                <user-tab form-name="email" title="Email" :opened="false" :state="email"/>
                <user-tab form-name="password" title="Пароль" type="password" :opened="false" :state="last_password_changed_date"/>
            </div>
            <div class="user-block">
                <div class="block-header">
                     <div class="block-title">Контактные данные</div>
                </div>
                <user-tab form-name="accountable_full_name" title="ФИО" :opened="false" :state="accountableFullName"/>
                <user-tab form-name="phone" title="Телефон"  :mask="masks.phone" :opened="false" :state="phone"/>
                <user-tab form-name="website" title="Веб-сайт" :opened="false" :state="website"/>
                <user-tab form-name="city" title="Город" type="city" :opened="false" :state="city"/>
            </div>
        </div>
    </div>
</template>
<script>
import ChangeForm from "../components/ChangeForm";
import UserTab from "../components/UserTab";
import resolveError from "../helpers/resolveError";

export default {
    name: 'User',
    middleware: ['auth'],
    components:{
        ChangeForm,
        UserTab
    },
    computed: {
        itn() { return this.$store.state.user.user.itn },
        company_name() { return this.$store.state.user.user.company_name },
        email() { return this.$store.state.user.user.email},
        phone() { if (this.$store.state.user.user.phone) return this.$store.state.user.user.phone.replace(/\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}/g, '$1')},
        website() { return this.$store.state.user.user.website},
        city() { return this.$store.state.user.user.city ? this.$store.state.user.user.city.name : ''},
        accountableFullName() { return this.$store.state.user.user.accountable_full_name},
        last_password_changed_date () {
            let result = ''
            let date = this.$store.state.user.user.last_password_changed_date
            if(date) {
                date = new Date(date)
                let formattedDate = date.toLocaleDateString()
                result = formattedDate
            } else {
              console.log('empty date')
            }
            return 'Обновлен ' + result
        }
    },
    methods:{
        editField: ($event)=>{
            $event
        },
        onCancel(data) {
            this.edit.inn = data;
        }
    },
    data(){
        return {
            userInfo: [],
            edit:{
                inn: false,
                accountable_full_name: false,
                email: false,
                login: false,
                password: false,
                name: false,
                phone: false,
                site:false,
                city:false,
            },
            masks:{
                inn: 'inn',
                phone: 'phone'
            }
        }
    },
    async mounted(){
        this.$axios.get(process.env.baseUrl + '/lk/info')
            .then(response => {
                const responseData = response.data.data
                this.$store.dispatch('user/addUser', responseData)
            })
            .catch(function (e) {
                resolveError(e)
            })
    }
  }
</script>
<style lang="scss">
    @import '@/styles/variables.scss';
    .user{
        @media(min-width:$desktop){
            margin: 0 auto;
            max-width: 83%;
        }
    }
    .user-block{
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        background: #FFFFFF;
        margin: 8px 0 16px 0;
        @media(min-width:$tablet){
            margin: 15px 0;
            max-width: 744px;
        }
    }
    .block{
        &-header{
            padding: 12px 16px;
            background: #FAFAFA;
            border-bottom: 1px solid #F5F5F5;
        }
        &-title{
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            font-family: 'Roboto', sans-serif;
            margin-top: 6px;
            @media(min-width:$tablet){
                font-size: 16px;
                line-height: 24px;
                letter-spacing: 0.0015em;
            }
        }
        &-item{
            padding: 14px 0;
            margin: 0 16px;
            border-bottom:1px solid #F2F2F2;
            font-size: 12px;
            letter-spacing: 0.004em;
            position: relative;
            padding-right: 30px;
            @media(min-width:$tablet){
                display: flex;
                font-size: 14px;
                padding: 22px 0;
            }
        }
        &-name{
            color: #6F6F6F;
            @media(min-width:$tablet){
                width: 25%;
                margin-right: 16px;
            }
        }
        &-content{
            color: #1E1F23;
            margin-top: 7px;
            @media(min-width:$tablet){
                width: calc(75% - 12%);
                margin-top: 0px;
            }
        }
        &-edit{
            &--small{
                width: 24px;
                height: 24px;
                position: absolute;
                right: 0;
                bottom: 4px;
                @media(min-width:$tablet){
                    display: none
                }
            }
            &--big{
               display: none;
               @media(min-width:$tablet){
                    display: block;
                    font-size: 12px;
                    letter-spacing: 0.004em;
                    color: #5461DC;
                    background: none;
                    right: 0;
                    position: absolute;
                }
            }
        }
      &-cancel{
        &--small{
          width: 24px;
          height: 24px;
          position: absolute;
          right: 10%;
          top: 24px;
          @media(min-width:$tablet){
            display: none
          }
        }
      }
    }
    .down-enter-active {
    animation: down-in .3s;
    }
    .bounce-leave-active {
        animation: down-in .3s reverse;
    }
    @keyframes down-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
