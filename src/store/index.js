import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import api from "@/assets/config/api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartTotal: {
      checkedGoodsAmount: 0,
      checkedGoodsCount: 0,
      goodsAmount: 0,
      goodsCount: 0
    },
    cartList: []
  },

  mutations: {
    setCartList(state, cartList) {
      state.cartList = cartList
    },
    setCartTotal(state, cartTotal) {
      state.cartTotal = cartTotal
    }
  },

  actions: {
    async getCartList(context) {
      let cartRes = await axios.get(api.CartList);
      context.commit('setCartList', cartRes.data.data.cartList)
      context.commit('setCartTotal', cartRes.data.data.cartTotal)
    }
  },



  modules: {
  }
})
