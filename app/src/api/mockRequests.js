//对于axios二次封装
import axios from 'axios'
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
//start：进度条开始 done: 进度条结束


//1.利用axios对象的方法create，去创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const requests=axios.create({
  //基础路径，发送请求的时候路径会出现api
  baseURL:"/mock",
  //请求超时时间
  timeout:5000
})

//请求拦截器:在请求发出之前，请求拦截器可以检测到，可以在请求发出去之前做一些事
requests.interceptors.request.use((config)=>{
  //config:配置对象，对象里面有一个属性很重要，header请求头
  nprogress.start()
  return config
})

requests.interceptors.response.use((res)=>{
  //成功的回调函数：服务器响应数据回来以后，响应lan'jie'qi可以检测到，可以做一些事情
  nprogress.done()
  return res.data
},(err)=>{
  //响应失败的回调函数
  return Promise.reject(new Error('faile'))
})
export default requests