<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#ffd700" text-color="black">
          <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
          <el-menu-item index="2"><router-link to="/order">订单管理</router-link></el-menu-item>
          <!-- 登录/注册按钮 -->
          <el-menu-item v-if="!loggedIn" index="3"><router-link to="/user">登录/注册</router-link></el-menu-item>

          <!-- 个人信息按钮 -->
          <el-menu-item v-if="loggedIn" index="4"><router-link to="/profile">个人信息</router-link></el-menu-item>
        </el-menu>
      </el-header>
      <el-main><router-view></router-view></el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>

<script>

export default {
  data() {
    return {
      activeIndex: '1',
      loggedIn: false, // 初始化登录状态为false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 登录成功后调用这个函数，将 loggedIn 设置为 true
    loginSuccess() {
      this.loggedIn = true;
    }
  }
}
</script>