import request, { sdk, qianyu } from './request'

const auth = {
    /**
     * 手机号登录
     * @param {string} phone - 手机号/邮箱
     * @param {string} smsCode - 验证码
     * @returns {Promise}
     */
    loginByPhone(phone, smsCode) {
        return request.post(`${sdk}/user.login/verify`, {
            username: phone,
            code: smsCode
        })
    },

    /**
     * 获取验证码
     * @param {string} phone - 手机号/邮箱
     * @param {string} [captcha] - 图形验证码
     * @param {string} [captcha_ext] - 验证码扩展信息
     * @returns {Promise}
     */
    smsCode(phone, captcha) {
        return request.post(`${sdk}/user.login/getCode`, {
            username: phone,
            extraCode: captcha
        })
    },

    /**
     * 退出登录
     * @param {string} token - 用户token
     * @returns {Promise}
     */
    logout(token) {
        return request.get(`${sdk}/user.login/out`, { token })
    },

    /**
     * 获取用户信息
     * @returns {Promise}
     */
    getUserInfo() {
        return request.get(`${sdk}/user/info`)
    },

    /**
     * 获取用户信息和优惠券
     * @returns {Promise}
     */
    getUserInfoAndCoupon() {
        // 注意：这里需要处理 baseURL 的情况，可以在 request.js 中添加配置支持
        return request.get(`${qianyu}/user/info`)
    },

    /**
     * 刷新token
     * @param {string} token - 用户token
     * @returns {Promise}
     */
    refreshToken(token) {
        return request.post(`${sdk}/user/refreshToken`, { token })
    }
}

export default auth 