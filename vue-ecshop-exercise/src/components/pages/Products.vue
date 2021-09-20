<template>
  <div>
    <div class="text-right">
      <button class="btn btn-primary mt-4">建立新產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th class="w-120px">分類</th>
          <th>產品名稱</th>
          <th class="w-120px">原價</th>
          <th class="w-120px">售價</th>
          <th class="w-100px">是否啟用</th>
          <th class="w-80px">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price }}</td>
          <td class="text-right">{{ item.price }}</td>
          <td>
            <span v-if="item.is_enable == 1" class="text-success">啟用</span>
            <span v-else class="text-danger">停用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      let self = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products`;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        self.products = response.data.products;
      });
    },
  },
};
</script>

<style scoped>
.w-120px {
  width: 120px;
}
.w-100px {
  width: 100px;
}
.w-80px {
  width: 80px;
}
</style>