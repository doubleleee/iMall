<template>
  <div class="detail">
    <!-- 导航栏 -->
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      fixed
      placeholder
    />

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in topImages" :key="index">
        <img v-lazy="item.img_url" />
      </van-swipe-item>
    </van-swipe>

    <!-- 商品详情 -->
    <div class="service">
      <span>三十天无忧退货</span>
      <span>48小时快速退款</span>
      <span>满88元免邮费</span>
    </div>

    <div class="info">
      <h3>{{ info.name }}</h3>
      <p class="desc">{{ info.goods_brief }}</p>
      <p class="price">￥{{ info.retail_price }}</p>
    </div>

    <van-cell title="请选择规格数量" is-link />

    <!-- 商品参数 -->
    <div class="params">
      <div class="title">商品参数</div>
      <div class="tr" v-for="(item, index) in attribute" :key="index">
        <span class="name">{{ item.name }}</span>
        <span class="value van-ellipsis">{{ item.value }}</span>
      </div>
    </div>

    <div class="pro-detail" v-html="info.goods_desc"></div>

    <!-- 底部导航栏 -->
    <van-goods-action>
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="$store.state.cartTotal.goodsCount"
        @click="cartClick"
      />
      <van-goods-action-icon icon="star-o" text="收藏" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addCart"
      />
      <van-goods-action-button type="danger" text="立即购买" @click="addCart" />
    </van-goods-action>

    <!-- 选择商品规格 -->
    <van-sku
      v-model="showSku"
      :sku="sku"
      :goods="goods"
      :show-soldout-sku="false"
      @sku-selected="skuSelected"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
import axios from "axios";
import api from "@/assets/config/api";
import Vue from "vue";
import { Lazyload } from "vant";

Vue.use(Lazyload);

let sku = {
  // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
  // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
  tree: [
    {
      k: "颜色", // skuKeyName：规格类目名称
      k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
      v: [
        {
          id: "1", // skuValueId：规格值 id
          name: "", // skuValueName：规格值名称
          imgUrl: "", // 规格类目图片，只有第一个规格类目可以定义图片
          previewImgUrl: "", // 用于预览显示的规格类目图片
        },
        {
          id: "1",
          name: "蓝色",
          imgUrl: "",
          previewImgUrl: "",
        },
      ],
      largeImageMode: true, //  是否展示大图模式
    },
  ],
  // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
  list: [
    {
      id: 2259, // skuId
      s1: "2", // 规格类目 k_s 为 s1 的对应规格值 id
      s2: "3", // 规格类目 k_s 为 s2 的对应规格值 id
      price: 100, // 价格（单位分）
      stock_num: 110, // 当前 sku 组合对应的库存
    },
    {
      id: 2259, // skuId
      s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
      s2: "4", // 规格类目 k_s 为 s2 的对应规格值 id
      price: 100, // 价格（单位分）
      stock_num: 200, // 当前 sku 组合对应的库存
    },
  ],
  price: "1.00", // 默认价格（单位元）
  stock_num: 227, // 商品总库存
};

let goods = {
  // 默认商品 sku 缩略图
  picture: "",
};

export default {
  name: "Detail",
  data() {
    return {
      id: null,
      data: {},
      topImages: [],
      info: {},
      attribute: [],
      showSku: false,
      sku: sku,
      goods: goods,
    };
  },

  created() {
    //   保存商品分类的id
    this.id = this.$route.params.id;

    this.getGoodsDetail();

    this.$store.dispatch("getCartList");
  },

  methods: {
    /**
     * 网络数据请求
     */

    // 请求商品详情
    async getGoodsDetail() {
      let res = await axios.get(api.GoodsDetail, { params: { id: this.id } });
      this.data = res.data.data;
      this.topImages = res.data.data.gallery;
      this.info = res.data.data.info;
      this.attribute = res.data.data.attribute;
      this.goods.picture = this.info.primary_pic_url;
      this.sku.price = this.info.retail_price + ".00";
      this.sku.stock_num = this.info.goods_number;
      let tree = [];
      res.data.data.specificationList.forEach((item) => {
        let arr = [];
        for (let k of item.valueList) {
          arr.push({
            id: k.id, // skuValueId：规格值 id
            name: k.value, // skuValueName：规格值名称
            imgUrl: k.pic_url, // 规格类目图片，只有第一个规格类目可以定义图片
            previewImgUrl: k.pic_url, // 用于预览显示的规格类目图片
          });
        }

        tree.push({
          k: item.name, // skuKeyName：规格类目名称
          k_s: "s" + item.specification_id, // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          v: arr,
          largeImageMode: true,
        });
      });
      this.sku.tree = tree;
      console.log(res);
    },

    /**
     * 监听切换商品规格改变商品价格事件
     */
    skuSelected({ selectedSku }) {
      let skuId = selectedSku["s1"] + "_" + selectedSku["s2"];
      this.data.productList.forEach((item1) => {
        if (item1.goods_specification_ids == skuId) {
          this.sku.list.forEach((item2, index) => {
            let skuNum = item2.s1 + "_" + item2.s2;
            if (skuNum == skuId) {
              this.sku.list[index].price = item1.retail_price * 100;
            }
          });
        }
      });
    },

    /**
     * 监听点击事件
     */

    // 返回上一页面
    onClickLeft() {
      this.$router.back();
    },

    // 点击购物车跳转到购物车界面
    cartClick() {
      this.$router.push("/cart");
    },

    // 点击底部导航栏加入购物车弹出商品规格
    addCart() {
      this.showSku = true;
    },

    // 提交到订单确定页
    onBuyClicked() {},

    // 加入购物车
    async onAddCartClicked(skuData) {
      // 获取选中的商品
      console.log(skuData);
      let chooseCon =
        skuData.selectedSkuComb["s1"] + "_" + skuData.selectedSkuComb["s2"];
      let resultPro = this.data.productList.filter((item) => {
        if (item.goods_specification_ids == chooseCon) {
          return true;
        } else {
          return false;
        }
      });
      console.log(resultPro);
      this.showSku = false;

      // 提交到后端的购物车API中
      let cartRes = await axios.post(api.CartAdd, {
        goodsId: resultPro[0].goods_id,
        number: skuData.selectedNum,
        productId: resultPro[0].id,
      });

      this.$store.commit("setCartList", cartRes.data.data.cartList);
      this.$store.commit("setCartTotal", cartRes.data.data.cartTotal);
    },
  },
};
</script>

<style scoped>
.detail /deep/.van-nav-bar__text,
.detail /deep/.van-nav-bar .van-icon {
  color: crimson;
}
img {
  width: 100%;
}
.service {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  line-height: 24px;
  color: #999;
  background-color: #ececec;
  margin-top: -5px;
}
.service span {
  position: relative;
}
.service span::before {
  content: "";
  display: block;
  position: absolute;
  left: -9px;
  top: 9px;
  width: 4px;
  height: 4px;
  border-radius: 3px;
  border: 1px solid crimson;
}
.info {
  text-align: center;
}
.info h3 {
  font-weight: 500;
  margin: 15px auto 6px;
}
.desc {
  color: #646566;
  margin: 0 auto 8px;
  font-size: 14px;
}
.price {
  color: crimson;
  margin: 10px auto 20px;
}
.params {
  box-sizing: border-box;
  padding: 10px;
  border-top: 5px solid #eee;
}
.title {
  margin-bottom: 10px;
}
.tr {
  display: flex;
  background-color: #eee;
  margin: 5px 0;
  line-height: 35px;
  border-radius: 5px;
}
.name {
  display: inline-block;
  width: 70px;
  margin-left: 7px;
  color: #999;
  font-size: 14px;
}
.value {
  width: 220px;
  font-size: 15px;
}
.pro-detail /deep/p {
  /* width: 100%; */
  margin: 0;
  font-size: 0;
}
.pro-detail /deep/img {
  width: 100%;
}
.detail /deep/.van-sku-row__row {
  box-sizing: border-box;
  width: 100%;
}
</style>
