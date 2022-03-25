<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread  面包屑带有x的-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }} <i @click="removeKeyWord">x</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.slice(2) }}
              <i @click="removeTrademark">x</i>
            </li>
            <!-- 平台售卖属性值面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @TrademarkInfo="TrademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构 -->
              <ul class="sui-nav">
                <li :class="{ active: IsOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="IsOne"
                      class="iconfont"
                      :class="{ 'icon-todown': IsAsc, 'icon-arrowup': IsDesc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: IsTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="IsTwo"
                      class="iconfont"
                      :class="{ 'icon-todown': IsAsc, 'icon-arrowup': IsDesc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-gaga="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >
                      {{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        //三级分类id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        // 分类名字
        categoryName: "",
        //关键字
        keyword: "",
        //排序 初始状态综合|降序
        order: "1:desc",
        //分页器：当前第几页
        pageNo: 1,
        //每一个展示数据个数
        pageSize: 3,
        //平台售卖属性操作带的参数
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  beforeMount() {
    //object.assign ES6新增合并对象
    //在向服务器发送请求之前把参数整理好
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
    IsOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    IsTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    IsAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    IsDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  watch: {
    $route(newValue, oldValue) {
      //再次搜索改变路由信息 重新整合参数并向服务器发送数据
      //在首次挂载时searchParams中的数据都是被首次赋值，再后面又向服务器发送参数时，之前已经被赋值并可能产生冲突的的参数要清空
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      this.searchParams.categoryName = "";
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    removeCategoryName() {
      //全部结果显示的是我们点击三级分类的名字 在点击x后会清楚参数相关数据并再次发送请求
      // this.searchParams.categoryName = "";
      // this.searchParams.category1Id = "";
      // this.searchParams.category2Id = "";
      // this.searchParams.category3Id = "";
      // this.getData();
      //虽然把参数数据中的属性删除了，并再此项服务器发送了数据，但是此时地址栏的路径还是原来的路径，这里可以采用重新路由跳转来改变路径
      //如果地址栏中有params参数 重新跳转时还要携带params参数，因为上面删除的对应的是query参数信息
      if (Object.keys(this.$route.params).length) {
        this.$router.push({ name: "search", params: this.$route.params });
      } else {
        this.$router.push({ name: "search" });
      }
    },
    removeKeyWord() {
      //全部结果显示的是我们点击三级分类的名字 在点击x后会清楚参数相关数据并再次发送请求
      this.searchParams.keyword = "";
      this.getData();
      if (Object.keys(this.$route.query).length) {
        this.$router.push({ name: "search", query: this.$route.query });
      } else {
        this.$router.push({ name: "search" });
      }
      //通知兄弟组件header去清空keywords=>双向绑定输入框中的文字会被清空
      this.$bus.$emit("clear");
    },
    //自定义事件处理函数  子组件点击品牌后触发该自定义事件
    TrademarkInfo(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    removeTrademark() {
      this.searchParams.trademark = "";
      this.getData();
    },
    attrInfo(attr, attrValue) {
      // [属性Id:属性值:属性名]
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //
      //属性在往数组中添加之前要判断是否已经被添加过了
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props);
      }
      this.getData();
    },
    removeAttr(index) {
      //整理searchParam  将其中的props数组删除指定元素
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    changeOrder(flag) {
      //传进来的flag用于判断当前点击的是综合1还是价格2
      let originOrder = this.searchParams.order;
      //获取当前order的状态
      let originFlag = originOrder.split(":")[0];
      let originSort = originOrder.split(":")[1];
      let newOrder = "";
      //如果点击的就是当前高亮，就是当前order的状态
      if (flag === originFlag) {
        // flag不变 升序或者降序取反
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        // 否则当前点击的就不是高亮，点击的是另一个 默认为降序
        newOrder = `${flag}:desc`;
      }
      this.searchParams.order = newOrder;
      this.getData();
    },
    getPageNo(PageNo) {
      this.searchParams.pageNo = PageNo;
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>