import { requCategoryList,requGetBannerList,requGetFloorList } from "@/api"
//home小仓库
const state={
  //三级菜单的数据
  categoryList:[],
  //轮播图的数据
  bannerList:[],
  //楼层的数据
  floorList:[]
}
const mutations={
  CATEGORYLIST(state,categoryList){
    state.categoryList=categoryList
  },
  BANNERLIST(state,bannerList){
    state.bannerList=bannerList
  },
  FLOORLIST(state,floorList){
    state.floorList=floorList
  }
}
//派发action的地方，可以书写异步、自己的逻辑的地方
const actions={
  async categoryList({commit}){
    let result=await requCategoryList()
    if(result.code===200){
      commit('CATEGORYLIST',result.data)
    }
  },
  //获取首页轮播图的数据
  async getBannerList({commit}){
    let result= await requGetBannerList()
    if(result.code===200){
      commit('BANNERLIST',result.data)
    }
  },
  //获取floor数据
  async getFloorList({commit}){
    let result= await requGetFloorList()
    if(result.code==200){
      commit('FLOORLIST',result.data)
    }
  }
}
const getters={}
export default {
  state,
  mutations,
  actions,
  getters
}