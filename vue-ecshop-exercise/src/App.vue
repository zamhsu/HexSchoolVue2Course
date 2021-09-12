<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld
  },
  created() {
    const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products`
    this.$http.get(api).then((response) => {
        console.log(response.data)
      });
    console.log(process.env);
  },
}
</script>

<style lang="scss">
@import "./assets/all";
</style>
