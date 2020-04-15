<template>
  <div>
    <multiselect
      class="custom_multiselect"
      ref="citySelect"
      v-model="value"
      :options="options"
      :searchable="true"
      :close-on-select="true"
      :show-labels="false"
      placeholder="Выберите местоположение"
      label="name"
      track-by="name"
      @input="emitSelectChange"
    />
  </div>
</template>

<script>
    import Multiselect from 'vue-multiselect'
    import resolveError from "../../helpers/resolveError";

    export default {
        components: {
            Multiselect
        },
        data () {
            return {
                value: '',
                options: []
            }
        },
        mounted () {
            let app = this
            this.$axios.$get(process.env.baseUrl + '/cities')
                .then(function (response) {
                    const responseData = response.data
                    app.options = responseData
                })
                .catch(error => {
                    resolveError(error)
                })
        },
        methods: {
            emitSelectChange(data) {
                this.$emit('selectedCity', data)
            }
        },
        beforeDestroy()
        {
            this.$refs.citySelect.deactivate();
        },
    }
</script>
<style>
 .custom_multiselect .multiselect__option--highlight{
   background: #5461DC;
 }
</style>
