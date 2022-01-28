module.exports={
  //关闭eslint
  lintOnSave:false,
  //代理跨域
  devServer:{
    proxy:{
      //所有带api的请求都会到这(代理服务器)之后 再转发
      '/api':{
        //目标服务器的地址
        target:'http://39.98.123.211',

      }
    }
  }
}