<template>
  <div class="home">
    <!-- 搜索框 -->
    <van-sticky>
      <van-search v-model="searchValue" placeholder="商品搜索 共239万款好物" />
    </van-sticky>

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" width="100%">
      <van-swipe-item v-for="(item, index) in bannerList" :key="index">
        <img v-lazy="item.image_url" class="image" />
      </van-swipe-item>
    </van-swipe>

    <!-- 五个宫格 -->
    <van-grid column-num="5" :border="false">
      <van-grid-item
        v-for="(item, index) in channelList"
        :key="index"
        :icon="item.icon_url"
        :text="item.name"
      />
    </van-grid>

    <!-- 品牌制造商直供 -->
    <van-cell-group :border="false" class="cell-group">
      <van-cell title="品牌制造商直供" />
    </van-cell-group>
    <div class="brand">
      <van-grid :column-num="2">
        <van-grid-item v-for="(item, index) in brandList" :key="index">
          <van-image :src="item.new_pic_url" />
          <h5 class="title1">{{ item.name }}</h5>
          <p class="price1">{{ item.floor_price }}元起</p>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 新品首发 -->
    <van-cell-group :border="false" class="new-goods">
      <van-cell title="新品首发" />
    </van-cell-group>
    <div class="brand">
      <van-grid :column-num="2">
        <van-grid-item v-for="(item, index) in newGoodsList" :key="index">
          <van-image :src="item.list_pic_url" />
          <h5 class="title2">{{ item.name }}</h5>
          <p class="price2">￥{{ item.retail_price }}</p>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 人气推荐 -->
    <van-cell-group :border="false" class="cell-group">
      <van-cell title="人气推荐" />
    </van-cell-group>
    <div class="hot-goods">
      <van-card
        v-for="(item, index) in hotGoodsList"
        :key="index"
        :price="item.retail_price + '.00'"
        :desc="item.goods_brief"
        :title="item.name"
        :thumb="item.list_pic_url"
        class="van-hairline--top"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/assets/config/api";
// 图片懒加载需要单独导入
import Vue from "vue";
import { Lazyload } from "vant";

Vue.use(Lazyload);

export default {
  name: "Home",
  components: {},
  data() {
    return {
      searchValue: "",
      bannerList: [],
      channelList: [],
      brandList: [],
      newGoodsList: [],
      hotGoodsList: [],
    };
  },
  async created() {
    let res = await axios.get(api.IndexUrl);
    this.bannerList = res.data.data.banner;
    this.channelList = res.data.data.channel;
    this.brandList = res.data.data.brandList;
    this.newGoodsList = res.data.data.newGoodsList;
    this.hotGoodsList = res.data.data.hotGoodsList;
  },
};
</script>

<style scoped>
.image {
  width: 100%;
}
.cell-group {
  text-align: center;
  padding-top: 10px;
  border-top: 5px solid #eee;
}
.brand /deep/.van-grid-item__content {
  padding: 0;
}
.title1 {
  position: absolute;
  top: 20px;
  left: 10px;
  margin: 0;
}
.price1 {
  position: absolute;
  top: 45px;
  left: 10px;
  margin: 0;
  font-size: 12px;
  color: #646566;
}
.van-image {
  border: 1px solid #fff;
}
.new-goods {
  text-align: center;
  padding-top: 10px;
}
.title2 {
  margin: 0;
}
.price2 {
  margin-bottom: 5px;
  color: crimson;
  font-size: 13px;
}
.hot-goods .van-card {
  background-color: #fff;
}
.hot-goods .van-card__price {
  color: crimson;
}
.hot-goods .van-card__title {
  font-size: 14px;
}
</style>