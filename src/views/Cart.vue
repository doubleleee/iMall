<template>
  <div class="cart">
    <!-- 导航栏 -->
    <van-nav-bar title="购物车">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <!-- 列表 -->
    <div class="list">
      <div class="list-item" v-for="(item, index) in cartList" :key="index">
        <van-checkbox
          v-model="item.checked"
          checked-color="crimson"
          icon-size="18px"
          @change="checkEvent($event, item)"
        >
          <van-image width="80" height="80" :src="item.list_pic_url" />
          <div class="info">
            <div class="title">{{ item.goods_name }}</div>
            <div class="desc">{{ item.goods_specifition_name_value }}</div>
            <div class="price">￥{{ item.retail_price }}</div>
          </div>
          <div class="count">×{{ item.number }}</div>
        </van-checkbox>
      </div>
    </div>

    <!-- 全选提交订单 -->
    <van-submit-bar
      :price="cartTotal.checkedGoodsAmount * 100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/assets/config/api";
import { mapState } from "vuex";
let mapStateObj = mapState(["cartList", "cartTotal"]);

export default {
  name: "Cart",
  data() {
    return {
      //   cartList: [],
      //   cartTotal: {},
    };
  },

  created() {
    //   this.cartList = this.$store.state.cartList;
    //   this.cartTotal = this.$store.state.cartTotal;
    this.$store.dispatch("getCartList");
    //   console.log(this.cartTotal);
  },

  computed: {
    ...mapStateObj,

    checkedAll: {
      set() {},
      get() {
        if (this.cartTotal.checkedGoodsCount == this.cartTotal.goodsCount) {
          return true;
        } else {
          return false;
        }
      },
    },
  },

  methods: {
    onSubmit() {},

    async checkEvent(event, item) {
      // event == 0 ? 1 : 0;
      let res = await axios.post(api.CartChecked, {
        productIds: item.product_id,
        isChecked: Number(event),
      });

      this.$store.commit("setCartList", res.data.data.cartList);
      this.$store.commit("setCartTotal", res.data.data.cartTotal);
      console.log(res.data.data);
    },
  },
};
</script>

<style scoped>
.van-icon {
  color: crimson;
}
.list-item {
  margin-bottom: 10px;
  background-color: #fafafa;
}
.list-item /deep/.van-checkbox {
  position: relative;
  height: 100px;
}
.list-item /deep/.van-checkbox__label {
  display: flex;
  justify-content: space-between;
  margin-left: 4px;
}
.list-item /deep/.van-checkbox__icon {
  margin-left: 10px;
}
.title {
  font-size: 14px;
}
.desc {
  font-size: 13px;
  margin: 5px 0;
  color: #999;
}
.info {
  margin-left: 5px;
  margin-top: 8px;
}
.count {
  position: absolute;
  top: 30px;
  right: 10px;
  font-size: 14px;
}
.price {
  color: crimson;
  margin-top: 10px;
}
.van-submit-bar {
  bottom: 50px;
}
.van-submit-bar__button {
  width: 86px;
}
.van-submit-bar__price--integer {
  font-size: 18px;
}
</style>
