<template>
  <div class="category-list">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      fixed
      placeholder
    />

    <!-- 标签页 -->
    <van-tabs v-model="active" @click="tabClick" sticky>
      <van-tab
        v-for="(item, index) in brotherCategory"
        :key="index"
        :title="item.name"
      >
        <div class="desc">{{ item.front_name }}</div>

        <!-- 商品列表 -->
        <van-grid :border="false" :column-num="2">
          <van-grid-item
            v-for="(item1, index1) in goodsList"
            :key="index1"
            :to="'/detail/' + item1.id"
          >
            <img :src="item1.list_pic_url" />
            <div class="title van-ellipsis">{{ item1.name }}</div>
            <p>￥{{ item1.retail_price }}</p>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/assets/config/api";

export default {
  name: "categoryList",
  data() {
    return {
      id: null,
      title: "",
      brotherCategory: [],
      active: 0,
      goodsList: [],
    };
  },

  created() {
    //   保存商品分类的id
    this.id = this.$route.params.id;

    this.getGoodsCategory();
  },

  methods: {
    /**
     * 网络数据请求
     */

    //   请求商品列表
    async getGoodsCategory() {
      let res = await axios.get(api.GoodsCategory, { params: { id: this.id } });
      this.title = res.data.data.parentCategory.name;
      this.brotherCategory = res.data.data.brotherCategory;
      //   遍历商品列表，点击跳转页面，标签停留在点击分类页面时的小分类列表
      for (let i = 0; i < this.brotherCategory.length; i++) {
        const currentCategory = res.data.data.currentCategory;
        if (this.brotherCategory[i].id == currentCategory.id) {
          this.active = i;
        }
      }

      // 在刚创建页面时渲染当前选中的分类标签的列表
      this.tabClick(this.active);
    },

    // 请求详细商品列表
    async getGoodsList(id, page) {
      let size = 20;
      let res = await axios.get(api.GoodsList, {
        params: { categoryId: id, page, size },
      });
      this.goodsList = res.data.data.data;
    },

    /**
     * 监听点击事件
     */

    // 返回上一页面
    onClickLeft() {
      this.$router.back();
    },

    // 监听标签点击
    tabClick(index) {
      let iid = this.brotherCategory[index].id;
      let page = 1;
      this.getGoodsList(iid, page);
    },
  },
};
</script>

<style scoped>
.category-list /deep/.van-nav-bar__text,
.category-list /deep/.van-icon {
  color: crimson;
}
.desc {
  text-align: center;
  padding-top: 15px;
  font-size: 14px;
  color: #646566;
}
.category-list /deep/.van-grid-item {
  width: 50%;
}
.category-list /deep/.van-grid-item__content {
  padding: 0 8px;
}
img {
  width: 100%;
}
.title {
  font-size: 14px;
  width: 100%;
  overflow: hidden;
  text-align: center;
}
p {
  margin: 5px 0;
  color: crimson;
  font-size: 13px;
}
</style>
