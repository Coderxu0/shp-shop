//在这个模块中对接口统一管理
import requests from '@/api/request'
import mockRequsets from '@/api/mockRequests'
// axios请求两种方式
// 1.axios.get('url') axios对象调用方法
// 2.axios({})axios函数写法

export const requCategoryList=()=>requests.get('/product/getBaseCategoryList')
export const requGetSearchIfo=(params)=>requests({url:'/list',method:'post',data:params})
export const requGetBannerList=()=>mockRequsets.get('/banner')
export const requGetFloorList=()=>mockRequsets.get('/floor')

// 获取产品详情
export const requGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'get'})

//将产品添加到购物车
export const requAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//获取购物车列表
export const requCartList=()=>requests({url:'/cart/cartList',method:'get'})

//删除购物车中的商品
export const requDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改商品选中状态
export const requUpdateCheckedById=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码
export const requGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册
export const requUserRegister=(data)=>requests({url:'/user/passport/register',data,method:'post'})

//登录接口
export const requLogin=(data)=>requests({url:'user/passport/login',data,method:'post'})

//获取用户信息【携带token】
export const requUserInfo=()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录
export const requLogOut=()=>requests({url:'/user/passport/logout',method:'get'})

//获取用户地址
export const requAddressInfo=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取商品清单
export const requOderInfo=()=>requests({url:'/order/auth/trade',method:'get'})

//提交订单
export const requSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取订单支付信息
export const requPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取支付订单转态
export const requPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取个人中心数据
export const requMyorderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})