<template>
  <div>
    <loading v-model:active="isLoading" />
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買項目</th>
          <th>應付金額</th>
          <th>付款狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in orders" :key="index">
          <td>{{ date(item.create_at) }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li
                v-for="(product, productIndex) in item.products"
                :key="productIndex"
              >
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>{{ currency(item.total) }}</td>
          <td>
              <span v-if="item.is_paid" class="text-success">已付款</span>
              <span v-else class="text-danger">尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @emitPage="getOrders"></Pagination>
  </div>
</template>

<script>
import adminApiUrl from "../../apis/hexSchoolAdmin";
import Pagination from '../Pagination.vue';

export default {
  components: { Pagination },
  data() {
    return {
      orders: {},
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;

      let self = this;
      const api = adminApiUrl.getOrdersUrl(page);
      this.$http.get(api).then((response) => {
        console.log(response.data);
        self.orders = response.data.orders;
        self.pagination = response.data.pagination;

        self.isLoading = false;

        console.log("Orders", self.orders);
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
