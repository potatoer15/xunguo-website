// 引入 axios
import axios from 'axios'
import { getState } from '../store/store'

// API 基础路径
export const sdk = '//sdk.tobs.devx'
export const qianyu = '//api.tobs.devx/qianyu'

// 创建 axios 实例
const axiosInstance = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器
axiosInstance.interceptors.request.use(
    config => {
        const token = getState('token')
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
    response => {
        const res = response.data

        if (!res.status) {
            return Promise.reject(new Error(res.message || '请求失败'))
        }

        if ('nums' in res || 'pages' in res) {
            return res
        }

        return res.data
    },
    error => {
        return Promise.reject(error)
    }
)

/**
 * 统一请求方法
 * @param {string} url - 请求地址
 * @param {string} method - 请求方法，默认为 'get'
 * @param {object} params - 请求参数
 * @returns {Promise} 
 */
const request = function (url, method = 'get', params = {}) {
    const config = {
        url,
        method: method.toLowerCase()
    }

    if (config.method === 'get') {
        config.params = params
    } else {
        config.data = params
    }

    return axiosInstance(config)
}

// 添加便捷方法到 request 对象
request.get = (url, params) => request(url, 'get', params)
request.post = (url, params) => request(url, 'post', params)
request.put = (url, params) => request(url, 'put', params)
request.delete = (url, params) => request(url, 'delete', params)

export default request