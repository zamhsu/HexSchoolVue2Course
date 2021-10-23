<template>
  <div>
    <loading v-model:active="isLoading" />

    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openCouponModal(true)">
        新增
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <td>優惠碼</td>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in coupons" :key="index">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-goup">
              <button
                class="btn btn-outline-primary btn-sm mr-2"
                @click="openCouponModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openDeleteModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @emitPage="getCoupons"></Pagination>

    <!-- coupon Modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="couponModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="couponModalLabel">編輯</h5>
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
            <div class="form-group">
              <label for="title">名稱</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="tempCoupon.title"
                placeholder="請輸入標題"
              />
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="coupon_code"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼"
              />
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input
                type="date"
                class="form-control"
                id="due_date"
                v-model="due_date"
              />
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                id="price"
                v-model="tempCoupon.percent"
                placeholder="請輸入折扣百分比"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateCoupon()"
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- delProductModal -->
    <div
      class="modal fade"
      id="deleteCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteCouponModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="deleteCouponModalLabel">
              <span>刪除產品</span>
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
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong>
            (刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteCoupon()"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import adminApiUrl from "../../apis/hexSchoolAdmin";
import Pagination from "../Pagination.vue";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      coupons: {},
      pagination: {},
      tempCoupon: {},
      due_date: "",
      isNew: false,
      isLoading: false,
    };
  },
  watch: {
    due_date() {
      this.tempCoupon.due_date = this.due_date.toTimestamp();
      console.log("toTimestamp", this.due_date.toTimestamp());
    },
  },
  methods: {
    openCouponModal(isNew, coupon) {
      this.isNew = isNew;

      if (this.isNew) {
        this.tempCoupon = {};
      } else {
        this.tempCoupon = Object.assign({}, coupon);
        const dateTime = new Date(this.tempCoupon.due_date * 1000)
          .toISOString()
          .split("T");
        this.due_date = dateTime[0];
      }

      $("#couponModal").modal("show");
    },
    openDeleteModal(coupon) {
      this.tempCoupon = Object.assign({}, coupon);

      $("#deleteCouponModal").modal("show");
    },
    getCoupons(page = 1) {
      this.isLoading = true;

      let self = this;
      const api = adminApiUrl.getCouponsUrl(page);
      this.$http.get(api).then((response) => {
        console.log(response.data);
        self.coupons = response.data.coupons;
        self.pagination = response.data.pagination;

        self.isLoading = false;

        console.log("Coupons", self.coupons);
      });
    },
    updateCoupon() {
      this.isLoading = true;

      if (this.isNew) {
        const api = adminApiUrl.createCouponUrl();
        this.$http.post(api, { data: this.tempCoupon }).then((response) => {
          console.log("create", response.data);
          $("#couponModal").modal("hide");
          this.getCoupons();

          this.isLoading = false;
        });
      } else {
        const api = adminApiUrl.updateCouponUrl(this.tempCoupon.id);
        this.$http.put(api, { data: this.tempCoupon }).then((response) => {
          console.log("update", response.data);
          $("#couponModal").modal("hide");
          this.getCoupons();

          this.isLoading = false;
        });
      }
    },
    deleteCoupon() {
      this.isLoading = true;

      const api = adminApiUrl.deleteCouponUrl(this.tempCoupon.id);
      this.$http.delete(api).then((response) => {
        console.log("delete", response.data);
        $("#deleteCouponModal").modal("hide");
        this.getCoupons();

        this.isLoading = false;
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
