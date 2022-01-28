import {v4 as uuidv4} from 'uuid'
export function throttling(fn,delay){
  let Do=true
  return function(){
    if(Do){
      Do=false
      setTimeout(()=>{Do=true},delay)
      return fn.apply(this,arguments)
    }
  }
}
//返回uuid  生成一个随机字符串，且每次执行不发生变化，游客身份持久储存
export function getUUID(){
  let uuid_token=localStorage.getItem('UUIDTOKEN')
  if(!uuid_token){
    uuid_token=uuidv4()
    localStorage.setItem('UUIDTOKEN',uuid_token)
  }
  return uuid_token
}