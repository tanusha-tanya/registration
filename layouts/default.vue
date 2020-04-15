<template>
  <div id="app">
    <link rel="stylesheet" href="https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css">
    <Header />
    <div class="content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  },
  created () {
      let token = window.$cookies.get('token')
      if (token) {
          this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
  }
}
</script>


<style lang="scss">
@import '@/styles/variables.scss';
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

input,
button {
  font: inherit;
}

html {
  height: auto;
  min-height: 100vh;
}

body {
  height: auto;
  min-height: 100vh;
  color: $text-color;
  background-color: #fafafa;
  font-family: 'RobotoRegular', sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 100vh;
}
.container {
  min-width: $mobile;
  max-width: 500px;
  padding: 0 16px;
  box-sizing: border-box;
  margin: 0 auto;
  @media(min-width:$tablet){
    padding: 0 22px;
    max-width: 100%;
  }
  @media(min-width:$desktop){
    padding: 0 22px;
    max-width: 2000px;
  }
}
h1{
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.0015em;
  color: #1E1F23;
  font-family: 'RobotoBold', sans-serif;
  margin-top: 21px;
  @media(min-width:$tablet){
    font-size: 24px;
    line-height: 32px;
    letter-spacing: 0.25px;
    font-family: 'RobotoRegular', sans-serif;
    font-style: normal;
    font-weight: 500;
    margin-top: 30px;
  }
}
h2{
  font-weight: 700;
  font-family: 'RobotoBold', sans-serif;
  font-size: 14px;
  line-height: 20px;
  margin-top: 32px;
  @media(min-width:$tablet){
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.15px;
    margin-top: 36px;
  }
}

.content {
  flex: 1 0 auto;
  min-width: $mobile;
}
ul {
  list-style: none;
}
.white-page{
  background: #fff;
  padding: 5px 0;
}

</style>

