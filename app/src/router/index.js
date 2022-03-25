import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
//使用路由插件
Vue.use(VueRouter)


let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//VueRouter是一个类，一个构造函数
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

//引入路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Details from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'

//路由懒加载，将不同的路由组件分割成代码块，在路由被访问时才加载
const Home=()=>import('@/pages/Home')
const Search=()=>import('@/pages/Search')
const Login=()=>import('@/pages/Login')
const Register=()=>import('@/pages/Register')
const Detail=()=>import('@/pages/Detail')
const AddCartSuccess=()=>import('@/pages/AddCartSuccess')
const ShopCart=()=>import('@/pages/ShopCart')
const Trade=()=>import('@/pages/Trade')
const Pay=()=>import('@/pages/Pay')
const PaySuccess=()=>import('@/pages/PaySuccess')
const Center=()=>import('@/pages/Center')
const Faile=()=>import('@/pages/Fail')


//引入二级路由
import groupOrder from '@/pages/Center/groupOrder'
import myOrder from '@/pages/Center/myOrder'

//配置路由
let router = new VueRouter({
  routes: [
    {
      name:'not-found',
      path:'*',
      redirect:'/home'
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      meta: { "show": true }
    },
    {
      name: 'search',
      path: '/search/:keyword?',
      component: Search,
      meta: { "show": true }
    },
    {
      name:'NoGoods',
      path:'/NoGoods',
      component:Faile,
      meta:{'show':true},
      beforeEnter:(to,from,next)=>{
        if(from.path.includes('search')){
          next()
        }else{
          next(false)
        }
      }
    },
    {
      path: '/login',
      component: Login,
      meta: { "show": false }
    },
    {
      path: '/register',
      component: Register,
      meta: { "show": false }
    },
    {
      path: '/detail/:skuid',
      component: Detail,
      meta: { "show": false }
    },
    {
      name: 'addcartsuccess',
      path: '/addcartsuccess',
      component: AddCartSuccess,
      meta: { "show": true }
    },
    {
      name: 'shopcart',
      path: '/shopcart',
      component: ShopCart,
      meta: { "show": true }
    },
    {
      path: '/trade',
      component: Trade,
      meta: { "show": true },
      beforeEnter:(to,from,next)=>{
        if(from.path=='/shopcart'){
          next()
        }else{
          next(false)
        }
      }
    },
    {
      path: '/pay',
      component: Pay,
      meta: { "show": true },
      beforeEnter:(to,from,next)=>{
        if(from.path=='/trade'){
          next()
        }else{
          next(false)
        }
      }
    },
    {
      path: '/paysuccess',
      component: PaySuccess,
      meta: { "show": true }
    },
    {
      path: '/center',
      component: Center,
      meta: { "show": true },
      children:[
        { //二级路由不用带/  如果带了就要写全了
          path:'myorder',
          component:myOrder
        },
        { //二级路由不用带/  如果带了就要写全了
          path:'grouporder',
          component:groupOrder
        },
        {
          path:'/center',
          redirect:'/center/myorder'
        }
      ]
    },
    // 重定向
    {
      path: '/',
      redirect: '/home'
    }
  ],
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    //y:0代表滚动条在最上方
    return { y: 0 }
  }
})
//全局守卫
router.beforeEach(async (to, from, next) => {
  //to:获取要跳转到那个路由的信息
  //from:获取到从那个路由来的信息
  //next：放行 写法有很多
  //next()放行   next(path)放行到指定路由  next(false)中断导航 返回from
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  //用户登录了
  if (token) {
    console.log(to.path)
    //用户登陆了 不可以去login
    if (to.path == '/login') {
      next('/home')
    } else {
      //登录，没有去login
      //如果没有用户信息 派发action获取用户信息
      if (!name) {
        let result = await store.dispatch('getUserInfo')
        //身份过期  token失效 获取不到用户信息
        if (result !== 'ok') {
          //清除token
          alert('用户身份过期，请重新登陆')
          await store.dispatch('logout')
          next('/login')
        }else{
          //身份没有过期 
          next()
        }
      } else {
        //有用户信息 放行
        next()
      }
    }
  } else {
    //用户未登录  不可以 交易相关(trade) 支付相关(pay,paysuccess) 用户中心(center)
    let toPath=to.path
    if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
      //记录用户想去的页面的路由信息，一起跳转到登录界面，登陆成功后直接跳转到指定组件
      next('/login?redirect='+toPath)
    }else{
      next()
    }

  }
})

export default router