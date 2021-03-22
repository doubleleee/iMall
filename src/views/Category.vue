<template>
  <div class="category">
    <!-- 搜索框 -->
    <van-sticky>
      <van-search v-model="searchValue" placeholder="商品搜索 共239万款好物" />
    </van-sticky>

    <!-- 分类列表 -->
    <van-tree-select
      :items="items"
      :main-active-index.sync="activeIndex"
      height="100%"
      @click-nav="clickRight"
    >
      <template slot="content">
        <img :src="bannerImage" alt="" />
        <van-grid :column-num="3">
          <van-grid-item
            v-for="(item, index) in subCategoryList"
            :key="index"
            :icon="item.wap_banner_url"
            :text="item.name"
          />
        </van-grid>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/assets/config/api";

export default {
  name: "Category",
  data() {
    return {
      searchValue: "",
      items: [],
      activeIndex: 0,
      subCategoryList: [],
      bannerImage: "",
    };
  },

  created() {
    this.getCatalogList();
  },

  methods: {
    /**
     * 网络请求事件
     */

    // 请求分类目录
    async getCatalogList() {
      let res = await axios.get(api.CatalogList);
      res.data.data.categoryList.forEach((item) => {
        item.text = item.name;
        this.items.push(item);
      });
      this.clickRight(0);
      console.log(res);
    },

    // 请求当前目录分类数据
    async getCatalogCurrent(id) {
      let res = await axios.get(api.CatalogCurrent, { params: { id } });
      this.subCategoryList = res.data.data.currentCategory.subCategoryList;
    },

    /**
     * 监听点击事件
     */
    clickRight(index) {
      this.activeIndex = index;
      let id = this.items[index].id;
      this.getCatalogCurrent(id);
      this.bannerImage = this.items[this.activeIndex].banner_url;
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
</style>
