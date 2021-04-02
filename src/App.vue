<template>
  <div class="app">
    <router-view />

    <van-tabbar
      route
      active-color="crimson"
      v-if="$route.meta.showTab"
      placeholder
    >
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/special" icon="description">
        专题
      </van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="apps-o">
        分类
      </van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o">
        购物车
      </van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  components: {},
};
</script>

<style scoped>
</style>

