<template>
  <div class="block-wrap">
    <div class="block-item">
      <div class="block-name">{{title}}</div>
      <div class="block-content">{{state}}</div>
      <a
        class="block-edit block-edit--small"
         v-if="isOpen===false && !isNotEditable"
         href=""
         :data-name=formName
         @click.prevent="isOpen=true" href="#"
      >
        <img src="@/assets/img/edit.svg" alt="account"/>
      </a>
      <a
        v-if="isOpen===true"
        class="block-cancel block-cancel--small"
        href="#"
        @click.prevent="isOpen=false"
      >Отменить</a>
      <a
        v-if="isOpen===false && !isNotEditable"
        class="block-edit block-edit--big"
        href=""
        :data-name=formName
        @click.prevent="isOpen=true"
      >Изменить</a>
      <a
        v-if="isOpen===true"
        class="block-edit block-edit--big"
        href="#"
        @click.prevent="isOpen=false"
      >Отменить</a>
    </div>
    <transition name="down">
      <ChangeForm
        v-if="isOpen"
        @cancel="onCancel"
        :formName=formName
        :cancelLnk="true"
        :mask="mask"
        :is-not-editable="isNotEditable"
        :type="type"
      />
    </transition>
  </div>
</template>
<script>
    import ChangeForm from '@/components/ChangeForm';
    import CitySelect from "./Form/CitySelect";
    export default {
        name: 'UserTab',
        components:{
            CitySelect,
            ChangeForm
        },
        props: {
            title: String,
            state: String,
            type: String,
            formName: String,
            opened: Boolean,
            mask: String,
            isNotEditable: Boolean,
        },
        methods:{
            editField: ($event)=>{
                $event
            },
            onCancel(data) {
                this.isOpen = data;
            },
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
                isOpen: this.opened,
            }
        },
    }
</script>
