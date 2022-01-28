import {requAddOrUpdateShopCart, requGoodsInfo, } from '@/api'
import {getUUID} from '@/utils'
const state={
  goodInfo:{},
  //游客临时身份
  uuid_token:getUUID()
}
const mutations={
  GETGOODINFO(state,goodInfo){
    state.goodInfo=goodInfo
  }
}
const actions={
  async getGoodInfo({commit},skuid){
    let result=await requGoodsInfo(skuid)
    if(result.code===200){
      commit('GETGOODINFO',result.data)
    }
  },
  async AddOrUpdateShopCart({commit},{skuId,skuNum}){
    //想服务器发送请求添加购物车，添加成功服务器返回code200
    const result=await requAddOrUpdateShopCart(skuId,skuNum)
      return result
   }
}
const getters={
  //路径导航简化
  categoryView(state){
    return state.goodInfo.categoryView||{}
  },
  //简化产品信息
  skuInfo(state){
    return state.goodInfo.skuInfo||{}
  },
  //产品售卖属性的简化
  spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList||[]
  }
}
export default{
  state,
  mutations,
  actions,
  getters
}