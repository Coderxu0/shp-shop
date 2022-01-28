import {requCartList,requDeleteCartById,requUpdateCheckedById}from '@/api'
const state={
  cartList:[]
}
const mutations={
  GETCARTLIST(state,cartList){
    state.cartList=cartList
  }
}
const actions={
  //获取购物车列表
  async getCartList({commit}){
    let result=await requCartList()
    if(result.code==200){
      commit('GETCARTLIST',result.data)
    }
  },
  async deleteCartByid({commit},skuId){
    return await requDeleteCartById(skuId)
  },
  //修改一个商品的选中状态
  async updateCheckedByid({commit},{skuId,isChecked}){
    return await requUpdateCheckedById(skuId,isChecked)
  },
  //删除全部勾选产品
  async deleteAllCheckedCart({dispatch,getters}){
    //
    const PromiseAll=[]
    getters.cartList.cartInfoList.forEach(item=>{
      let promise=item.isChecked==1?dispatch('deleteCartByid',item.skuId):''
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  },
  //修改全部商品的选中状态
  async updateAllchecked({dispatch,getters},isChecked){
    let PromiseAll=[]
    getters.cartList.cartInfoList.forEach(item=>{
      let promise=dispatch('updateCheckedByid',{skuId:item.skuId,isChecked})
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  }


}
const getters={
  cartList(state){
    return state.cartList[0]||{}
  },

}
export default {
  state,
  mutations,
  actions,
  getters
}