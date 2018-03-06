import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// 导入账号管理相关页面
import Login from '../components/account/login/Login'

//导入商城相关页面
import Shop from '../components/shop/Shop'
import GoodsList from '../components/shop/goods/List.vue' //商品分类
import GoodsDetail from '../components/shop/goods/Detail.vue' //商品详情
import Shopcart from '../components/shop/shopcart/Shopcart.vue' //购物车
import OrderSite from '../components/shop/order/Site.vue' //地址
import OrderPay from '../components/shop/order/Pay.vue' //支付
import OrderComplete from '../components/shop/order/Complete.vue' //下单

Vue.use(Router)

let goods = [
    { name: "GoodsList", path: 'goods/list', component: GoodsList },
    { name: "GoodsDetail", path: 'goods/detail/:id', component: GoodsDetail },
];

let shopcart = [
    { name: "Shopcart", path: 'shopcart', component: Shopcart }
];

let order = [
    { name: "OrderSite", path: '/order/site/:ids', component: OrderSite },
    { name: "OrderPay", path: '/order/pay/:id', component: OrderPay },
    { name: "OrderComplete", path: '/order/complete', component: OrderComplete }
]

export default new Router({
    routes: [
        { name: 'Login', path: '/login', component: Login },
        { name: 'Shop', path: '/', component: Shop, children: [...goods, ...shopcart, ...order] }
    ]
})