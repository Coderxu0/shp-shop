const lazyLoad={
  install(Vue,options){
    const defaultSrc = options.default
    Vue.directive('gaga', {
      bind(el, binding) {
        el.setAttribute('data-src', binding.value)
        el.setAttribute('src', defaultSrc)
      },
      inserted(el) {
        lazyLoad.load(el)
        const handler=lazyLoad.debounce(lazyLoad.load)
        window.addEventListener('scroll',()=>{handler(el)})
      }
    })
  },
  load(el) {
    // const viewHeight = document.documentElement.clientHeight
    // const elTop = el.getBoundingClientRect().top
    // const elBtm = el.getBoundingClientRect().bottom
    // // 获取data-src属性
    // const realSrc = el.dataset.src
    // if (elTop < viewHeight && elBtm > 0) {

    //   //如果这个属性存在才会改变src属性
    //   if (realSrc) {
    //     el.src = realSrc
    //     //设置过这个属性后改清空这个属性
    //     el.removeAttribute('data-src')
    //   }
    // }
    let viewHeight = document.documentElement.clientHeight
    let scrollTop = document.documentElement.scrollTop
    let top =el.offsetTop
    const realSrc = el.dataset.src
    if (!realSrc) return
    if (top - scrollTop < (viewHeight-50)) {
      el.src = realSrc
      el.removeAttribute('data-src')
    }
  },


   debounce(fn, delay = 50) {
    //这里维护一个变量timer
    let timer = null
    return function() {
        if (timer) {
            //根据定时器id清空了定时器，但是timer变量存储的id值不变
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, delay)
    }
}
}
module.exports=lazyLoad
