<template>
  <div>
    <loading v-model:active="isLoading" />
    <div class="row mt-5">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.no">
        <div class="card border-0 shadow-sm">
          <div
            style="
              height: 150px;
              background-size: cover;
              background-position: center;
            "
            :style="{backgroundImage: `url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{item.origin_price}} 元</div>
              <del class="h6" v-if="item.price">原價 {{item.origin_price}} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{item.price}} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm">
              <i class="fas fa-search"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
              <i class="fas fa-cart-plus"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userApiUrl from "../../apis/hexSchoolUser";

export default {
  data() {
    return {
      products: [],
      isLoading: false,
    };
  },
  methods: {
    getProducts(page) {
      this.isLoading = true;

      let self = this;
      const api = userApiUrl.getProductsUrl(page);
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        self.products = response.data.products;
        self.pagination = response.data.pagination;

        self.isLoading = false;
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
