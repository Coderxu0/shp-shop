<template>
  <div class="tb-promo" ref="box" >
    <a href="#" class="left" ref="left">&lt;</a>
    <a href="#" class="right" ref="right">&gt;</a>
    <ul class="tu" ref="ul">
      <li v-for="carousel in List" :key="carousel.id">
        <a href=""><img :src="carousel.imgUrl" alt="" ref="img"/></a>
      </li>
    </ul>
    <ol class="promo-nav" ref="ol"></ol>
  </div>
</template>

<script>
export default {
  name: "carou",
  props: ["List"],
  data() {
    return {};
  },
  watch: {
    List() {
      this.$nextTick(() => {
        let box = this.$refs.box;
        let left = this.$refs.left;
        let right = this.$refs.right;
        let ol = this.$refs.ol;
        let ul = this.$refs.ul;
        var boxWidth = box.offsetWidth;
        let num = 0;
        let circle = 0;
        box.addEventListener("mouseenter", function () {
          left.style.display = "block";
          right.style.display = "block";
          //停止自动播放
          clearInterval(timer);
        });
        box.addEventListener("mouseleave", function () {
          left.style.display = "none";
          right.style.display = "none";
          //继续自动播放
          timer = setInterval(function () {
            //手动调用点击事件
            right.click();
          }, 2000);
        });

        for (var i = 0; i < ul.children.length; i++) {
          var li = document.createElement("li");
          li.setAttribute("index", i);
          ol.appendChild(li);
          li.addEventListener("click", function () {
            for (var i = 0; i < ol.children.length; i++) {
              ol.children[i].className = "";
            }
            this.className = "current";
            var x = this.getAttribute("index") * boxWidth;
            Animate(ul, -x);
            num = circle = this.getAttribute("index");
          });
        }

        // this.$nextTick(() => {
          // console.log(ol.children);
          ol.children[0].className = "current";
          // 在最后多添加一张图片
          ul.appendChild(ul.children[0].cloneNode(true));
        // });
        var flag = true;
        right.addEventListener("click", function () {
          if (flag) {
            //关闭节流阀
            flag = false;
            if (num == ul.children.length - 1) {
              ul.style.left = 0 + "px";
              num = 0;
            }
            num++;
            Animate(ul, -num * boxWidth, function () {
              //函数调用之后再打开节流阀
              flag = true;
            });
          }
          circle++;
          if (circle == ol.children.length) {
            circle = 0;
          }
          circlechange();
        });
        left.addEventListener("click", function () {
          if (flag) {
            flag = false;
            if (num == 0) {
              num = ul.children.length - 1;
              ul.style.left = -num * boxWidth + "px";
            }
            num--;
            Animate(ul, -num * boxWidth,()=>{flag = true;});
            
          }
          circle--;
          if (circle < 0) {
            circle = ol.children.length - 1;
          }
          circlechange();
        });
        function circlechange() {
          for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = "";
          }
          ol.children[circle].className = "current";
        }
        //自动播放
        var timer = setInterval(function () {
          //手动调用点击事件
          right.click();
        }, 2000);
        //obj为调用动画的对象，target为移动目标距离，callback为回调函数
        function Animate(obj, target, callback) {
          //清楚原来定时器，保留当前定时器，防止同时多次调用函数开启多个定时器
          clearInterval(obj.timer);
          obj.timer = setInterval(function () {
            if (obj.offsetLeft == target) {
              clearInterval(obj.timer);
              //调回函数callback要写到定时器结束之后
              if (callback) {
                callback();
              }
            }
            //缓动动画 步长公式：(目标位置-当前位置)/10
            var step = (target - obj.offsetLeft) / 10;
            //正向走对step使用向上取整函数Math.ceil()
            //反向走对step使用向下取整函数Math.floor()
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            obj.style.left = obj.offsetLeft + step + "px";
          }, 15);
        }
      });
    },
  },
  methods: {},
};
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}

li {
  list-style: none;
}

.tb-promo {
  width:723px;
  height: 100%;
  position: relative;
  /* margin: 100px auto; */
  overflow: hidden;
}

.left {
  position: absolute;
  width: 20px;
  height: 30px;
  left: 0px;
  top: 50%;
  margin-top: -15px;
  background-color: rgb(0, 0, 0, 0.3);
  line-height: 30px;
  color: white;
  text-align: center;
  text-decoration: none;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  display: none;
  z-index: 1;
}

.right {
  position: absolute;
  width: 20px;
  height: 30px;
  right: 0px;
  top: 50%;
  margin-top: -15px;
  background-color: rgb(0, 0, 0, 0.3);
  line-height: 30px;
  color: white;
  text-align: center;
  text-decoration: none;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  display: none;
  z-index: 1;
}

.tb-promo .promo-nav {
  position: absolute;
  bottom: 0px;
  left: 50%;
  margin-left: -35px;
}

.tb-promo .promo-nav li {
  float: left;
  background-color: rgb(255, 255, 255, 0.9);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: 3px;
}

.tu {
  width: 600%;
  position: absolute;
}

.tu li {
  float: left;
}

.tb-promo .promo-nav .current {
  background-color: cyan;
  display: block;
}
</style>