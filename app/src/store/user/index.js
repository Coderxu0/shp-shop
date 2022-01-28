import {requGetCode,requUserRegister,requLogin,requUserInfo,requLogOut}from '@/api'
import{getToken,setToken,removeToken} from'@/utils/token'
const state={
  code:'',
  token:getToken(),
  userInfo:{}
}
const mutations={
  GETCODE(state,code){
    state.code=code
  },
  // USERLOGIN(state,token){
  //   state.token=token
  // },
  GETUSERINFO(state,userInfo){
    state.userInfo=userInfo
  },
  LOGOUT(state){
    state.userInfo={}
    state.token=null
    removeToken()
  }
}
const actions={
  //获取验证码
  async getCode({commit},phone){
    const result=await requGetCode(phone)
    if(result.code==200){
      commit('GETCODE',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  //用户注册
  async userRegister({commit},user){
    return await requUserRegister(user)
  },
  //用户登录
  async userLogin({commit},userInfo){
    let result=await requLogin(userInfo)
    if(result.code==200){
      // commit('USERLOGIN',result.data.token)
      setToken(result.data.token)
      return 'ok'
    }
  },
  //获取用户信息
  async getUserInfo({commit}){
    //调用该方法无需传参，服务器会判断是否携带了token，携带了才会返回数据
    let result=await requUserInfo()
    //如果token过期就会请求失败
    if(result.code==200){
      commit('GETUSERINFO',result.data)
      return 'ok'
    }
  },
  //退出登录
  async logout({commit}){
    //只是向服务器发一次请求，清楚token
    let result=await requLogOut()
    if(result.code==200){
      commit('LOGOUT')
      return 'ok'
    }
  }
}
const getters={}

export default{
  state,
  mutations,
  actions,
  getters
}