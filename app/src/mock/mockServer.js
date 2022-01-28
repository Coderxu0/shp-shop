//这里会拦截ajax请求
import Mock from 'mockjs'
//引入的json数据，这些模块并没有对外暴露
//webpack默认对外暴露的：图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'

//mock数据
Mock.mock('/mock/banner',{code:200,data:banner})//模拟首页大的轮播图数据
Mock.mock('/mock/floor',{code:200,data:floor})//模拟首页大的轮播图数据
