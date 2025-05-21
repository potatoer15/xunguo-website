import request, { qianyu, sdk } from './request'

// 充值相关的 API 请求
const recharge = {
    /**
     * 获取商品列表
     * @returns {Promise}
     */
    getGoodsList() {
        return request.get(`${qianyu}/goods/lists`)
    },

    /**
     * 创建充值订单
     * @param {string|number} goodsId - 商品ID
     * @returns {Promise}
     */
    createRechargeOrder(goodsId) {
        return request.post(`${qianyu}/pay.order/create`, { goodsId })
    },

    /**
     * 获取支付页面
     * @param {string} outTradeNo - 订单号
     * @param {string} orderName - 订单名称
     * @param {number} money - 金额
     * @returns {Promise}
     */
    getOrderPage(outTradeNo, orderName, money) {
        const p = 'test'
        return request.post(`${sdk}/pay?package=${p}`, {
            outTradeNo,
            orderName,
            money
        })
    },

    /**
     * 查询订单
     * @param {string} orderId - 订单ID
     * @returns {Promise}
     */
    getOrder(orderId) {
        return request.get(`${qianyu}/pay.order/info`, { orderId })
    }
}

export default recharge 