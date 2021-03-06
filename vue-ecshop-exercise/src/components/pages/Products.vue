<template>
  <div>
    <loading v-model:active="isLoading"/>
    <div class="text-right">
      <button class="btn btn-primary mt-4" @click="openProductModal(true)">建立新產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th class="w-120px">分類</th>
          <th>產品名稱</th>
          <th class="w-120px">原價</th>
          <th class="w-120px">售價</th>
          <th class="w-100px">是否啟用</th>
          <th class="w-130px">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ currency(item.origin_price) }}</td>
          <td class="text-right">{{ currency(item.price) }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-danger">停用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm mr-2" @click="openProductModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @emitPage="getProducts"></Pagination>

    <!-- productModal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="productModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile()">
                </div>
                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled" v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="editProduct()">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- delProductModal -->
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="delProductModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="delProductModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct()">確認刪除</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Pagination from '../Pagination.vue';

import $ from "jquery";
import adminApiUrl from "../../apis/hexSchoolAdmin";
import userApiUrl from "../../apis/hexSchoolUser";

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      }
    };
  },
  components: {
    Pagination
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page) {
      this.isLoading = true;

      let self = this;
      const api = userApiUrl.getProductsUrl(page);
      this.$http.get(api).then((response) => {
        console.log(response.data);
        self.products = response.data.products;
        self.pagination = response.data.pagination;

        self.isLoading = false;
      });
    },
    editProduct() {
      console.log("create", this.tempProduct);
      let self = this;

      // create product
      let httpMethod = "post";
      let api = adminApiUrl.createProductUrl();
      
      if (!this.isNew) {
        // update product
        httpMethod = "put";
        api = adminApiUrl.updateProductUrl(this.tempProduct.id);
      }
      
      this.$http[httpMethod](api, { data: this.tempProduct }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          $("#productModal").modal("hide");
          self.getProducts();
        } else {
          $("#productModal").modal("hide");
          self.getProducts();
          this.eventBus.emit("message.push", `編輯失敗;danger`);
          console.log("編輯失敗");
        }
      });
    },
    deleteProduct() {
      let self = this;

      // delete product
      let httpMethod = "delete";
      let api = adminApiUrl.deleteProductUrl(this.tempProduct.id);
      
      this.$http[httpMethod](api, { data: this.tempProduct }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          self.getProducts();
        } else {
          $("#delProductModal").modal("hide");
          self.getProducts();
          this.eventBus.emit("message.push", `刪除失敗;danger`);
          console.log("刪除失敗");
        }
      });
    },
    uploadFile() {
      console.log(this);

      this.status.fileUploading = true;

      let self = this;
      const file = this.$refs.files.files[0];
      const formData = new FormData();
      // 將欄位加入formData
      formData.append("file-to-upload", file);
      const api = adminApiUrl.uploadImage();

      this.$http.post(api, formData, {
        // 修改資料類型
        Headers: {
          "Content-type": "multipart/form-data"
        }
      }).then((response) => {
        self.status.fileUploading = false;
        console.log(response.data);
        if (response.data.success) {
          // 將結果強制寫入Vue中，否則不會綁定
          // vue 3已經將$set移除
          // $set(要寫入的物件, 欄位名稱, 要寫入的資料)
          // self.$set(self.tempProduct, 'imageUrl', response.data.imageUrl);
          self.tempProduct.imageUrl = response.data.imageUrl;
        } else {
          this.eventBus.emit("message.push", `${response.data.message};danger`);
        }
      });
    },
    openProductModal(isNew, product) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, product);
        this.isNew = false;
      }

      $("#productModal").modal("show");
    },
    openDeleteModal(product) {
      this.tempProduct = product;

      $("#delProductModal").modal("show");
    }
  },
};
</script>

<style scoped>
.w-130px {
  width: 130px;
}
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