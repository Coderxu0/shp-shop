import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

//三级联动 注册全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)

//轮播图 注册全局组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name,Carousel)

//分页器 注册全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)

//引入mock模块
import '@/mock/mockServer.js'
//引入swiper样式
import 'swiper/css/swiper.css'

//引入requests所有方法挂载到原型上
import *as API from '@/api'

//引入element ui
import {MessageBox} from 'element-ui'

//注册
Vue.prototype.$msgbox=MessageBox
Vue.prototype.$alert=MessageBox.alert

import atm from '@/assets/images/lazy.jpg'
// 引入 vue-lazyload
import VueLazyload from 'vue-lazyload'
// 注册
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:atm
})

//引入 vee-validate 插件 验证表单
import VeeValidate from 'vee-validate'
//中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'
//注册
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN',{
  messages:{
    ...zh_CN.messages,
    is:(field)=>`${field}必须与密码相同`
  },
  attributes:{
    //需要校验的字段
    phone:'手机号',
    code:'验证码',
    password:'密码',
    password1:'确认密码',
    agree:'协议'
  }
})
//自定义校验规则
VeeValidate.Validator.extend('agree',{
  validate:(value)=>{
    return value
  },
  getMessage:(field)=>field+'必须同意'
})
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },

  //注册路由
  //组件实例上会有$route和$router
  router,
  //注册仓库
  //组件实例上或有$store
  store
}).$mount('#app')

console.log(''||undefined)