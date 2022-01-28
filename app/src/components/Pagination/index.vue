<template>
  <!-- 分页器 -->
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li class="prev disabled">
          <button
            class="btn1"
            :disabled="pageNo === 1"
            @click="$emit('getPageNo', pageNo - 1)"
          >
            «上一页
          </button>
        </li>
        <li :class="{'active':pageNo===1}" v-show="startNumAndEndNum.start > 1" >
          <a  @click="$emit('getPageNo', 1)">1</a>
        </li>
        <li class="dotted" v-show="startNumAndEndNum.start > 2">
          <span>...</span>
        </li>
        <li
          v-for="(page, index) in startNumAndEndNum.end"
          :key="index"
          v-if="page >= startNumAndEndNum.start"
          :class="{'active':pageNo===page}"
        >
          <a @click="$emit('getPageNo', page)">{{ page }}</a>
        </li>

        <li class="dotted" v-show="startNumAndEndNum.end < totalPage - 1">
          <span>...</span>
        </li>
        <li v-show="startNumAndEndNum.end < totalPage" :class="{'active':pageNo===totalPage}">
          <a @click="$emit('getPageNo', totalPage)">{{ totalPage }}</a>
        </li>
        <li class="next">
          <button
            class="btn2"
            :disabled="pageNo === totalPage"
            @click="$emit('getPageNo', pageNo + 1)"
          >
            下一页»
          </button>
        </li>
      </ul>
      <div>
        <span>共{{ total }}条</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  //计算属性
  computed: {
    //总共有多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续页码其实数字和结束数字
    startNumAndEndNum() {
      //定义两个变量分别对应起始数字和结束数字
      let start = 0,
        end = 0;
      //可能出现总共的页数都小于连续页码数，比如:我们规定的连续页码数字为5，但是计算后一共3页
      //也就是说总页数都没有连续页码数多
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        //正常情况下  当前页要位于连续页码的中间
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        if (end > this.totalPage) {
          start = this.totalPage - this.continues + 1;
          end = this.totalPage;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style scoped lang="less">
.page {
  width: 733px;
  height: 66px;
  overflow: hidden;
  float: right;
  text-align: center;
  .sui-pagination {
    margin: 18px 0;

    ul {
      margin-left: 0;
      margin-bottom: 0;
      vertical-align: middle;
      width: 600px;
      float: left;

      li {
        line-height: 18px;
        display: inline-block;

        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -2px;
          font-size: 14px;
          padding: 8px 10px;
          color: #333;
        }

        &.active {
          a {
            background-color: #fff;
            color: #e1251b;
            border-color: #fff;
            cursor: default;
          }
        }

        &.prev {
          a {
            background-color: #fafafa;
          }
        }

        &.disabled {
          a {
            color: #999;
            cursor: default;
          }
        }

        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px 18px;
            color: #333;
          }
        }

        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }

    div {
      position: relative;
      color: #333;
      font-size: 14px;
      width: 241px;
      top: -31px;
      left: 500px;
    }
  }
  .btn1 {
    position: relative;
    width: 70px;
    background-color: #ffffff;
    height: 30px;
    top: -13px;
    left: -5px;
  }

  .btn2 {
    position: relative;
    width: 70px;
    background-color: #ffffff;
    height: 30px;
    top: -13px;
    left:5px;
  }
}
</style>