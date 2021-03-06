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



let router = new Router({
    routes: [
        { name: 'Login', path: '/login', component: Login },
        { name: 'Shop', path: '/', component: Shop, children: [...goods, ...shopcart, ...order] }
    ]
});

// 网站白名单
let baidan = ['GoodsList', 'GoodsDetail', 'Shopcart'];


router.beforeEach((to, from, next) => {
    // 判断当前页在不在白名单中
    let isTrue = baidan.some(v => v == to.name);
    // 如果是白名单.不用登陆
    if (isTrue) {
        next();
        return;
    }

    // 现在是js文件,不是组件,不能直接使用this.$http.
    Vue.prototype.$http.get(Vue.prototype.$api.isLogin).then((res) => {
        // 让登录状态默认为未登录
        let islogin = false;

        if (res.data.code == "logined") {
            islogin = true;
        }
        // 如果是访问登录页面
        if (to.name == 'Login') {
            // 判断是否登录
            //如果登录了.自动跳转到后面页面
            if (islogin) {
                next({ name: 'goods/list' })
            } else {
                // 未登录,允许访问
                next();
            }
        }

        //如果访问登录页面以外的后台页面
        if (to.name != 'Login') {
            //判断是否访问
            if (!islogin) {
                //如果未登录
                next({ name: 'Login', query: { next: to.fullPath } })
            } else {
                next();
            }
        }
    })
});
export default router;