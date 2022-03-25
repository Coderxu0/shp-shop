<template>
          <!--banner轮播-->
        <div class="swiper-container" ref="cur">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(carousel) in List"
              :key="carousel.id"
            >
              <img :src="carousel.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name:'Carousel',
  props:['List'],
  watch:{
    //监听bannerList数据变化---由空数组变成。。。
    List: {
      immediate:true,
      handler(newVale, oldValue) {
        //swiper实例使用的前提是一定要有一个完整的dom结构
        //当前函数执行仅仅只是监听到了bannerList获取到了数据，但是无法保证v-for渲染完毕
        this.$nextTick(() => {
          var mySwiper = new Swiper(
            this.$refs.cur,
            {
              autoplay: {
                disableOnInteraction: false,
              },
              //分页器
              pagination: {
                el: ".swiper-pagination",
                clickable: true,
              },
              //前进后退按钮
              navigation: {
                nextE1: ".swiper-button-next",
                prevE1: ".swiper-button-prev",
              },
            }
          );
        });
      },
    },
  },
}
</script>

<style>

</style>