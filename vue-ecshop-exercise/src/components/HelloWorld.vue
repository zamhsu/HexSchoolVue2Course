<template>
  <div class="hello">
    <a href="#" @click.prevent="signout()">登出</a>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  methods: {
    signout() {
      let self = this;
      const api = `${process.env.VUE_APP_API_PATH}/logout`;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          self.$router.push("/login");
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
