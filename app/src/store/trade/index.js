import { requAddressInfo, requOderInfo } from '@/api'
const state = {
  userAddress: [],
  OrderInfo:{},
}
const mutations = {
  GETUSERADDRESS(state, userAddress) {
    state.userAddress = userAddress
  },
  GETORDERINFO(state, OrderInfo){
    state.OrderInfo=OrderInfo
  }
}
const actions = {
  //获取地址列表
  async getUserAddress({ commit }) {
    let result = await requAddressInfo()
    if (result.code == 200) {
      console.log(result)
      commit('GETUSERADDRESS', result.data)
    }
  },
  //获取订单列表
  async getOrderInfo({ commit }) {
    const result = await requOderInfo()
    if (result.code == 200) {
      console.log(result)
      commit('GETORDERINFO', result.data)
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}