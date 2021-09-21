<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, index) in messages"
      :key="index"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        @click="removeMessage(index)"
        aria-lable="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlertMessage",
  data() {
    return {
      messages: [],
    };
  },
  created() {
    let self = this;

    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    // mitt 只能帶一個參數，將使用';'組合message和status
    this.eventBus.on("message.push", (messageArray) => {
      let paras = messageArray.split(";");
      let message = paras[0];
      let status = "warning";
      if (paras.length === 2) {
        status = paras[1];
      }
      
      self.updateMessage(message, status);
    });

    console.log(this.eventBus);
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      // 移除訊息
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      let self = this;
      // 5秒後自動移除
      setTimeout(() => {
        self.messages.forEach((element, index) => {
          if (element.timestamp === timestamp) {
            self.messages.splice(index, 1);
          }
        });
      }, 5000);
    },
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>