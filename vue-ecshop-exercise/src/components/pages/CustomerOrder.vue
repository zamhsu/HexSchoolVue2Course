<template>
  <div>
    <loading v-model:active="isLoading" />

    <!-- product list -->
    <div class="row mt-5">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="
              height: 150px;
              background-size: cover;
              background-position: center;
            "
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{
              item.category
            }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">
                {{ item.origin_price }} 元
              </div>
              <del class="h6" v-if="item.price"
                >原價 {{ item.origin_price }} 元</del
              >
              <div class="h5" v-if="item.price">
                現在只要 {{ item.price }} 元
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.addingToCart === item.id"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <!-- cart list -->
    <div class="my-5 row justify-content-center">
      <div class="col-md-6">
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteCartItem(item.id)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
              <td class="align-middle">
                {{ item.qty }}/{{ item.product.unit }}
              </td>
              <td class="align-middle">
                {{ item.product.price }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
        <div>
          <div class="input-group mb-3 input-group-sm">
            <input
              type="text"
              class="form-control"
              v-model="couponCode"
              placeholder="請輸入優惠碼"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="useCouponCode()"
              >
                套用優惠碼
              </button>
            </div>
          </div>
          <div class="text-danger" v-if="couponCodeErrorMessage">
            {{ couponCodeErrorMessage }}
          </div>
        </div>
        <div class="my-5 row justify-content-center">
          <Form class="col-md-6" @submit="addToOrder">
            <div class="form-group">
              <label for="useremail">Email</label>
              <!-- <Field type="email" name="email" class="form-control" id="useremail"
                rules="required|email"
                v-model="orderForm.user.email" placeholder="請輸入 Email" /> -->
              <Field
                type="email"
                name="email"
                rules="required|email"
                v-model="orderForm.user.email"
                v-slot="{ field, errorMessage, meta }"
              >
                <input
                  v-bind="field"
                  class="form-control"
                  id="useremail"
                  :class="{
                    'is-invalid': !!errorMessage,
                    'is-valid': meta.valid,
                  }"
                  placeholder="請輸入 Email"
                />
              </Field>
              <span class="text-danger">
                <ErrorMessage name="email" />
              </span>
            </div>

            <div class="form-group">
              <label for="username">收件人姓名</label>
              <Field
                type="text"
                name="name"
                rules="required"
                v-model="orderForm.user.name"
                v-slot="{ field, errorMessage, meta }"
              >
                <input
                  v-bind="field"
                  class="form-control"
                  id="username"
                  :class="{
                    'is-invalid': !!errorMessage,
                    'is-valid': meta.valid,
                  }"
                  placeholder="請輸入姓名"
                />
              </Field>
              <span class="text-danger">
                <ErrorMessage name="name" />
              </span>
            </div>

            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <Field
                type="tel"
                name="tel"
                rules="required"
                v-model="orderForm.user.tel"
                v-slot="{ field, errorMessage, meta }"
              >
                <input
                  v-bind="field"
                  class="form-control"
                  id="usertel"
                  :class="{
                    'is-invalid': !!errorMessage,
                    'is-valid': meta.valid,
                  }"
                  placeholder="請輸入電話"
                />
              </Field>
              <span class="text-danger">
                <ErrorMessage name="tel" />
              </span>
            </div>

            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <Field
                type="text"
                name="address"
                rules="required"
                v-model="orderForm.user.address"
                v-slot="{ field, errorMessage, meta }"
              >
                <input
                  v-bind="field"
                  class="form-control"
                  id="useraddress"
                  :class="{
                    'is-invalid': !!errorMessage,
                    'is-valid': meta.valid,
                  }"
                  placeholder="請輸入地址"
                />
              </Field>
              <span class="text-danger">
                <ErrorMessage name="address" />
              </span>
            </div>

            <div class="form-group">
              <label for="comment">留言</label>
              <textarea
                name=""
                id="comment"
                class="form-control"
                cols="30"
                rows="10"
                v-model="orderForm.message"
              ></textarea>
            </div>
            <div class="text-right">
              <button class="btn btn-danger">送出訂單</button>
            </div>
          </Form>
        </div>
      </div>
    </div>

    <!-- product modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ product.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="" />
            <blockquote class="blockquote mt-3">
              <p class="mb-0 allow-break">{{ product.content }}</p>
              <footer class="blockquote-footer text-right allow-break">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">
                {{ product.origin_price }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price }} 元</del
              >
              <div class="h4" v-if="product.price">
                現在只要 {{ product.price }} 元
              </div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(product.id, product.num)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="product.id === status.addingToCart"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

import userApiUrl from "../../apis/hexSchoolUser";

// vee-validate 設定欄位名稱
configure({
  generateMessage: localize({
    zh_TW: {
      names: {
        email: "Email",
        name: "收件人姓名",
        tel: "收件人電話",
        address: "收件人地址",
      },
    },
  }),
});

export default {
  data() {
    return {
      products: [],
      product: {},
      cart: {},
      couponCode: "",
      couponCodeErrorMessage: "",
      orderForm: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      status: {
        loadingItem: "",
        addingToCart: "",
      },
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
    getProduct(id) {
      this.status.loadingItem = id;

      let self = this;
      const api = userApiUrl.getSingleProductUrl(id);
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        self.product = response.data.product;
        self.product.num = 1; // 設定num預設1，否則數量下拉選單會是null
        $("#productModal").modal("show");
        self.status.loadingItem = "";
      });
    },
    getCart() {
      this.isLoading = true;

      let self = this;
      const api = userApiUrl.getCartUrl();
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        this.cart = response.data.data;
        self.isLoading = false;
      });
    },
    addToCart(id, quantity = 1) {
      this.status.addingToCart = id;

      let self = this;
      const api = userApiUrl.addToCartUrl();
      const cart = {
        product_id: id,
        qty: quantity,
      };
      this.$http.post(api, { data: cart }).then(() => {
        // console.log(response.data);
        self.status.addingToCart = "";
        this.getCart();
        $("#productModal").modal("hide");
      });
    },
    useCouponCode() {
      this.isLoading = true;

      let self = this;
      const api = userApiUrl.useCouponCode();
      const couponCode = {
        code: this.couponCode,
      };
      this.$http.post(api, { data: couponCode }).then((response) => {
        // console.log(response.data);
        if (!response.data.success) {
          this.couponCodeErrorMessage = response.data.message;
        }

        this.getCart();
        self.isLoading = false;
      });
    },
    deleteCartItem(id) {
      this.isLoading = true;

      let self = this;
      const api = userApiUrl.deleteCartItemUrl(id);
      this.$http.delete(api).then((response) => {
        console.log(response.data);
        this.getCart();
        self.isLoading = false;
      });
    },
    addToOrder(values) {
      console.log(values);
      this.isLoading = true;

      let self = this;
      const api = userApiUrl.addToOrder();
      this.$http.post(api, { data: self.orderForm }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          self.$route.push(`/customer_checkout/${response.data.orderId}`)
        }
        //this.getCart();
        self.isLoading = false;
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>

<style scoped>
.allow-break {
  white-space: pre-line;
}
</style>