
import {requGetSearchIfo} from '@/api'
const state={
  searchList:[]
}
const mutations={
  GETSEARCHLIST(state,searchList){
    state.searchList=searchList
  }
}
const actions={
  //获取search模块数据
  async getSearchList({commit},params){
    const result =await requGetSearchIfo(params={})
    if(result.code===200){
      commit('GETSEARCHLIST',result.data)
    }
  }
}
//计算属性
//项目当中getters主要的作用是：简化仓库中的数据
//可以把我们将来在组件当中需要用的数据简化一下(将来在组建中用数据就方便多了)
const getters={
  //当前形参state，当前仓库中的state，并非大厂库中的satate(组建中函数形式拿到的state是大仓库中的state)
  goodsList(state){
    return state.searchList.goodsList||[]
  },
  trademarkList(state){
    return state.searchList.trademarkList||[]
  },
  attrsList(state){
    return state.searchList.attrsList||[]
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}