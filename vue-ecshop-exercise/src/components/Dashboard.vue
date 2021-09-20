<template>
  <div>
    <Navbar/>
    <div class="container-fluid">
      <div class="row">
        <Sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default({
    components:{
        Sidebar,
        Navbar
    },
    created() {
      // 取得JWT Token 並放到header的Authorization中
      const authToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('hexToken='))
        .split('=')[1];
      this.$http.defaults.headers.common['Authorization'] = authToken;
    },
})
</script>
