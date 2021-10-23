export default {
    loginUrl() {
        return `${process.env.VUE_APP_API_PATH}/admin/signin`;
    },
    logoutUrl() {
        return `${process.env.VUE_APP_API_PATH}/logout`;
    },
    createProductUrl() {
        return `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product`;
    },
    updateProductUrl(id) {
        return `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${id}`;
    },
    deleteProductUrl(id) {
        return `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${id}`;
    },
    uploadImage() {
        return `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/upload`;
    },
    getOrdersUrl(page = 1) {
        return `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/orders?page=${page}`;
    },
    getCouponsUrl(page = 1) {
        return `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupons?page=${page}`;
    },
    createCouponUrl() {
        return `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon`;
    },
    updateCouponUrl(id) {
        return `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${id}`;
    },
    deleteCouponUrl(id) {
        return `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${id}`;
    }
}