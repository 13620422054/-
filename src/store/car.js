import Vue from 'vue';
export default {

    // 定义状态,相当于data数据
    state: {
        cart: JSON.parse(localStorage.getItem('cart')) || {} //id为key 数量为val
    },

    // 相当于computed方法
    getters: {
        total(state) {
            return Object.values(state.cart).reduce((sum, v) => sum += v, 0);
        }
    },
    //定义修改状态的方法.这里的方法需要通过store.commit (方法名称,参数)
    mutations: {
        modify(state, data) {
            let { id, num } = data;
            // state.cart[id] = num;
            Vue.set(state.cart, id, num)
                // console.log(state.cart);
                // 每次状态变化后,把新的状态记录在本地storage里,设置后页面刷新数据也不会丢失
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        del(state, id) {
            Vue.delete(state.cart, id)

            localStorage.setItem('cart', JSON.stringify(state.cart))
        }
    }
}