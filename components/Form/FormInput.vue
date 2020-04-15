<template>
  <div class="input-item__input-wrapper">
    <label
      :for="form_name"
      class="input-item__label"
      :class="{'input-item__label--reqired': is_required}"
    >
      {{label}}
    </label>
    <input
      v-if="!mask"
      :class="input_class"
      :id="form_name"
      v-model.trim="value"
      :type="type"
      @input="emitData"
      :placeholder="placeholder"
    />
    <the-mask
      v-else
      :mask="mask"
      :class="input_class"
      :id="form_name"
      v-model.trim="value"
      :type="type"
      :masked="true"
      @input="emitData"
    />
    <div class="form-error" v-if="has_error">
      {{error_message}}
    </div>
  </div>
</template>
<script>
    export default {
        name: 'FormInput',
        props: ['label', 'form_name', 'mask', 'type','value', 'error_class','has_error','error_message','is_required','placeholder'],
        data() {
            return {
                input_value: ''
            }
        },
        //toDo поправить вывод класса
        computed: {
            input_class() {
                let inputClass = 'input-item__input'
                if (this.error_class) {
                    inputClass = inputClass + ' ' + this.error_class
                }
                return inputClass
            }
        },
        methods: {
            emitData () {
                let formData = {
                    name: this.form_name,
                    //особенности пакета маски
                    mask: !!this.mask,
                    data: this.value
                }
                this.$emit('getData', formData);
            }
        }
    }
</script>
