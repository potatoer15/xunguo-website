// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {
    Modal,
    Form,
    Input,
    Button,
    FormModel,
    message,
    Tabs,
    Space,
    Checkbox
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App'
import router from './router'
import store from './store/store'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '../static/css/reset.css'//重置样式文件
import 'font-awesome/css/font-awesome.css'//字体图标样式
//css3样式库
import '../static/css/ec-css-animate.css'
import '../static/css/ec-css-hover.css'


// 全局注册 Modal 组件
Vue.use(Modal)
Vue.use(Form)
Vue.use(Input)
Vue.use(Button)
Vue.use(FormModel)
Vue.use(Tabs)
Vue.use(Space)
Vue.use(Checkbox)
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

// 挂载全局方法
Vue.prototype.$message = message


