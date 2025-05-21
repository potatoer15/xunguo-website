import Vue from 'vue';
import Vuex from 'vuex';
//导入语言包
import lang from '../assets/language_package'
Vue.use(Vuex);

/**
 * 根据路径获取对象中的值
 * @param {Object} obj - 要获取值的对象
 * @param {string} path - 点号分隔的路径，如 'user.info.name'
 * @returns {*} 获取到的值
 */
export const getValueByPath = (obj, path) => {
    if (!obj || !path) return undefined
    return path.split('.').reduce((value, key) => {
        return value && value[key]
    }, obj)
}
// 从本地存储获取状态
const getLocalState = (key) => {
    try {
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) : undefined
    } catch (e) {
        console.error(`读取${key}失败:`, e)
        return undefined
    }
}
const pack = {}
for (let k1 in lang) {
    pack[k1] = {};
    console.log(k1);
    console.log(lang[k1]);
    for (let k2 in lang[k1]) {
        pack[k1][k2] = lang[k1][k2][0];
    }
}
console.log(pack);

// 保存状态到本地存储
const saveState = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        console.error(`保存${key}失败:`, e)
    }
}

const state = {
    modalLogin: false,
    langPack: pack,
    token: getLocalState('token'),
    userInfo: getLocalState('userInfo')
}

const mutations = {
    setModalLogin(state, value) {
        state.modalLogin = value;
    },
    setToken(state, token) {
        state.token = token;
        saveState('token', token);
    },
    setUserInfo(state, info) {
        state.userInfo = info;
        saveState('userInfo', info);
    },
    clearUserInfo(state) {
        state.userInfo = null;
        localStorage.removeItem('userInfo');
    }
}

const store = new Vuex.Store({
    state,
    mutations
});

// 导出获取状态的工具函数
export const getState = (path) => {
    const storeValue = getValueByPath(store.state, path)
    return storeValue !== undefined ? storeValue : getLocalState(path)
}

export default store;

