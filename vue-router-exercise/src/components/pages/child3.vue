<template>
  <div>
    <h5>可在網址上輸入/foobar或其他seed取得個人資料</h5>
    <a href="https://randomuser.me/">參考網址:randomuser.me</a>
    <div v-if="userInfo">
      <img :src="userInfo.picture.large" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">
          {{ userInfo.name.first }} {{ userInfo.name.last }} (Card 3)
        </h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: {
          first: "",
          last: "",
        },
        picture: {
          large: null,
        },
      },
    };
  },
  created() {
    // 取得動態路由的參數
    // 問題：直接輸入後面參數後按enter會不更新，再按重新整理後才會更新
    // 原因：https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96
    console.log(this.$route.params.id);
    const id = this.$route.params.id;
    this.getData(id);
  },
  watch: {
    $route(to) {
      this.getData(to.params.id);
    }
  },
  methods: {
    getData(id) {
      this.$http
        .get(`https://randomuser.me/api/?seed=${id}`)
        .then((response) => {
          this.userInfo = response.data.results[0];
          console.log(this.userInfo);
        });
    },
  },
};
</script>
