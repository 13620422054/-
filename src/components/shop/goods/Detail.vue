<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link :to="{name : 'GoodsList'}">首页</router-link>
                <router-link to="">商品详情</router-link>

            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in top.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1>{{top.goodsinfo.title}}</h1>
                                <p class="subtitle">{{top.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{top.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{top.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥{{top.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number :min="0" size="mini" v-model="num"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{top.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy" onclick="cartAdd(this,'/',1,'/shopping.html');">立即购买</button>
                                                <button class="add" @click="addCart">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <el-tabs type="border-card">
                                <el-tab-pane label="商品介绍">
                                    <div v-html="top.goodsinfo.content"></div>
                                </el-tab-pane>
                                <el-tab-pane label="商品评论">
                                    <!-- 评论 - 抽取为公共组件, 需要一个id来获取默认的评论列表以及发表评论 -->
                                   <comment :id='id'></comment>
                                </el-tab-pane>
                               
                            </el-tabs>

                        </div>

                    </div>
                    <!-- 侧边栏 - 推荐商品列表, 抽取为公共组件 -->
                    <app-aside :list ="top.hotgoodslist"></app-aside>
                   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppAside from "./subcom/CommonAside.vue";
import "@/lib/imgzoom/css/magnifier.css";
import "@/lib/imgzoom/js/magnifier.js";
import $ from "jquery";
import Comment from './subcom/CommonComment.vue';
  
export default {
  components: {
    AppAside,
    Comment 
  },
  data() {
    return {
      id: this.$route.params.id,
      num: 0,
      top: {
        goodsinfo: {},
        imglist: [],
        hotgoodslist: []
      }
    };
  },
  methods: {
    getTop() {
      this.$http.get(this.$api.goodsDetail + this.id).then(res => {
        if (res.data.status == 0) {
          this.top = res.data.message;
        }
      });
    },
    addCart(){
        let newNum =this.num +(this.$store.state.cart[this.id] ||0)
        this.$store.commit('modify',{id:this.id , num:newNum})
        
        this.num = 0;
    }
  },
  created() {
    this.getTop();
    // console.log(this.top.toplist);
  },
//   mounted() {
      
//   },
  watch: {
      $route(){
          this.id = this.$route.params.id;
          this.getTop();
      },
      top(){
             var magnifierConfig = {
      magnifier: "#magnifier1", //最外层的大容器
      width: 360, //承载容器宽
      height: 360, //承载容器高
      moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
      zoom: 5 //缩放比例
    };

    setTimeout(function() {
      var _magnifier = $().imgzoon(magnifierConfig);
    }, 500);
      }
  }
};
</script>

<style scoped>

</style>