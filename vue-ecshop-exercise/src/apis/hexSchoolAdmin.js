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
    }
}