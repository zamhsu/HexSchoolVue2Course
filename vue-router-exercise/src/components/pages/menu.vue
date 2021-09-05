<template>
  <div class="hello my-3">
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/page/">卡片 1</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/page/child2">卡片 2</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/page/child/foobar">卡片 3</router-link>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link" @click.prevent="routerPush()">到卡片2</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link" @click.prevent="routerBack()">回到上一頁</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link" @click.prevent="routerForward()">下一頁</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link" @click.prevent="routerGo()">當前頁面上或下幾頁</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link" @click.prevent="routerReplace()">刪除當前頁面紀錄跳到卡片3</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    routerPush() {
      // 到指定路徑
      this.$router.push('/page/child2');
    },
    routerBack() {
      // 上一頁
      this.$router.back();
    },
    routerForward() {
      // 下一頁
      this.$router.forward();
    },
    routerGo() {
      // 當前頁面上或下幾頁
      // -1同back
      // 1同forward
      this.$router.go(-2);
    },
    routerReplace() {
      // 將當前頁面替換為指定路徑，且替換前的頁面不會被記錄
      this.$router.replace('/page/child/foobar');
    }
  }
};
</script>
