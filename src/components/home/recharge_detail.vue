<template>
    <div class="recharge-detail">
        <!--海报-->
        <section class="banner container-fluid">
            <img src="../../../static/img/game-bg.jpg" alt="">
            <div class="title">
                <p class="p1">Games</p>
                <p class="p2">做最出色的遊戲</p>
            </div>
        </section>
        <div class="recharge-container">
            <div class="recharge-content">
                <div class="thank-you-message">
                    选择商品
                </div>

                <div class="recharge-options">
                    <div class="recharge-goods" v-for="goods in goodsList" :key="goods.id">
                        <div class="product-info">
                            <img :src="goods.image || defaultImage" :alt="goods.name" class="product-image">
                            <div class="product-name">{{ goods.name }}</div>
                            <div class="price">¥ {{ goods.price }}</div>
                            <button class="recharge-button" @click="handleRecharge(goods)">
                                购买
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 支付弹窗 -->
            <a-modal v-model:visible="isModalVisible" title="支付订单" @cancel="handleCancel" width="700px" :footer="false"
                :header="false">

                <div class="order-info">
                    <div class="order-header">
                        <div class="order-no">订单编号 #{{ currentOrder.orderId }}</div>
                        <div class="countdown">订单支付倒计时：{{ countdown }}</div>
                    </div>
                    <div class="order-details">
                        <div class="detail-item">
                            <span>订单金额</span>
                            <span>¥ {{ currentOrder.money }} 元</span>
                        </div>
                        <div class="detail-item">
                            <span>购买点数</span>
                            <span class="points-value">
                                {{ currentOrder.coupon }}
                            </span>
                        </div>
                    </div>
                    <div class="payment-frame">
                        <iframe :src="paymentUrl" frameborder="0" width="100%" height="500px"></iframe>
                    </div>
                </div>
            </a-modal>
        </div>
        <LoginModal :visible.sync="loginVisible" @login-success="handleLoginSuccess" />
    </div>
</template>

<script>
import rechargeApi from '@/api/recharge'
import LoginModal from '../common/LoginModal.vue'
import { getState } from '../../store/store' // 引入 Vuex 状态管理
import auth from '@/api/auth'

export default {
    name: 'RechargeDetail',
    components: {
        LoginModal
    },
    data() {
        return {
            gameId: '',
            goodsList: [],
            isModalVisible: false,
            currentOrder: {
                orderId: '',
                money: 0,
                coupon: 0
            },
            countdown: '',
            paymentUrl: '',
            timer: null,
            defaultImage: '../../../static/img/goods_image.png',
            countdownTimer: null,
            loginVisible: false, // 登录弹窗的可见性
        }
    },
    async created() {
        try {
            this.gameId = this.$route.params.gameId
            await this.fetchGoodsList()
        } catch (error) {
            console.error('初始化数据失败:', error)
            this.$message.error('获取数据失败，请稍后重试')
        }
    },
    methods: {
        // 获取商品列表
        async fetchGoodsList() {
            try {
                // this.goodsList = await rechargeApi.getGoodsList()
                this.goodsList = [
                    {
                        "goodsId": "1",
                        "name": "¥18",
                        "details": "AI 算力点150(约可生成5分钟的视频翻译内容);同一任务下执行次数没有限制;自定义字幕编辑;高速GPU算力池;算力点有效期1年;享受媒体库超大存储空间",
                        "price": "0.01",
                        "coupon": "150",
                        "status": "1"
                    },
                    {
                        "goodsId": "2",
                        "name": "¥68",
                        "details": "AI 算力点600(约可生成20分钟的视频翻译内容);同一任务下执行次数没有限制;自定义字幕编辑;高速GPU算力池;算力点有效期1年;享受媒体库超大存储空间",
                        "price": "68.00",
                        "coupon": "600",
                        "status": "1"
                    },
                    {
                        "goodsId": "3",
                        "name": "¥128",
                        "details": "AI 算力点1200(约可生成40分钟的视频翻译内容);同一任务下执行次数没有限制;自定义字幕编辑;高速GPU算力池;算力点有效期1年;享受媒体库超大存储空间",
                        "price": "128.00",
                        "coupon": "1200",
                        "status": "1"
                    },
                    {
                        "goodsId": "4",
                        "name": "¥328",
                        "details": "AI 算力点3300(约可生成110分钟的视频翻译内容);同一任务下执行次数没有限制;自定义字幕编辑;高速GPU算力池;算力点有效期1年;享受媒体库超大存储空间",
                        "price": "328.00",
                        "coupon": "3300",
                        "status": "1"
                    },
                    {
                        "goodsId": "5",
                        "name": "¥648",
                        "details": "AI 算力点8000(约可生成260分钟的视频翻译内容);同一任务下执行次数没有限制;自定义字幕编辑;高速GPU算力池;算力点有效期1年;享受媒体库超大存储空间",
                        "price": "648.00",
                        "coupon": "8000",
                        "status": "1"
                    }
                ]
            } catch (error) {
                console.error('获取商品列表失败:', error)
                throw error
            }
        },


        // 处理充值请求
        async handleRecharge(goods) {
            if (!getState('userInfo.nickName')) { // 检查用户是否登录
                this.loginVisible = true; // 显示登录弹窗
                return;
            }
            try {
                const order = await rechargeApi.createRechargeOrder(goods.goodsId)
                const orderPage = await rechargeApi.getOrderPage(
                    order.orderNo,
                    order.name,
                    order.money
                )
                this.currentOrder = order
                this.calculateCountdown(order.expireTime)
                this.isModalVisible = true
                this.paymentUrl = orderPage

                // 开始轮询订单状态
                this.startPollingOrderStatus(order.orderId, order.expireTime)
            } catch (error) {
                console.error('创建订单失败:', error)
                this.$message.error('创建订单失败，请稍后重试')
            }
        },

        calculateCountdown(expireTime) {
            // 清除可能存在的旧计时器
            if (this.countdownTimer) {
                clearInterval(this.countdownTimer)
            }

            const updateCountdown = () => {
                // 将时间戳转换为毫秒
                const end = parseInt(expireTime) * 1000
                const now = new Date().getTime()
                const diff = end - now

                if (diff <= 0) {
                    this.countdown = '已过期'
                    if (this.countdownTimer) {
                        clearInterval(this.countdownTimer)
                    }
                    return
                }

                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((diff % (1000 * 60)) / 1000)
                this.countdown = `${minutes}分${seconds}秒`
            }

            // 立即执行一次
            updateCountdown()
            // 设置定时器，每秒更新倒计时
            this.countdownTimer = setInterval(updateCountdown, 1000)
        },

        // 轮询订单状态
        async startPollingOrderStatus(orderId, expireTime) {
            const endTime = parseInt(expireTime) * 1000
            const interval = 5000 // 每5秒查询一次

            this.timer = setInterval(async () => {
                try {
                    // 检查是否已过期
                    if (Date.now() >= endTime) {
                        this.stopPolling()
                        if (this.isModalVisible) {
                            this.$message.error('支付超时，请重新下单')
                            this.isModalVisible = false
                        }
                        return
                    }

                    const orderInfo = await rechargeApi.getOrder(orderId)

                    // 假设后端返回的订单状态 confirmStatus === '1' 表示支付成功
                    if (orderInfo.confirmStatus === '1') {
                        this.stopPolling()
                        this.$message.success('支付成功')
                        this.isModalVisible = false
                        // 这里可以添加刷新用户余额等操作
                        const userinfoAndCoupon = await auth.getUserInfoAndCoupon()

                        // 4. 存储用户信息
                        this.$store.commit('setUserInfo', {
                            ...getState('userInfo'),
                            coupon: userinfoAndCoupon.coupon
                        })
                    }
                } catch (error) {
                    console.error('查询订单状态失败:', error)
                }
            }, interval)
        },

        // 停止轮询
        stopPolling() {
            if (this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }
            if (this.countdownTimer) {
                clearInterval(this.countdownTimer)
                this.countdownTimer = null
            }
        },

        handleCancel() {
            this.isModalVisible = false
            this.stopPolling()
            this.$message.error('取消支付')
        },

        handleLoginSuccess() {
            this.loginVisible = false; // 登录成功后关闭弹窗
            this.fetchGoodsList(); // 重新获取商品列表
        },
    },
    beforeDestroy() {
        this.stopPolling()
    }
}
</script>

<style scoped lang="less">
.recharge-detail {
    min-height: 100vh;

    // 海报
    .banner {
        margin: 0 auto;
        max-width: 1920px;
        padding: 0;
        position: relative;

        .title {
            position: absolute;
            text-align: center;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 38px;

            .p2 {
                font-size: 24px;
            }

            @media screen and (max-width:767px) {
                font-size: 4vw;

                .p2 {
                    font-size: 3vw;
                }
            }
        }
    }

    .recharge-container {
        padding: 20px;
        margin: 0 auto;

        .recharge-content {
            background: #fff;
            border-radius: 12px;
            padding: 30px;

            .thank-you-message {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 30px;
            }

            .recharge-options {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                gap: 20px;

                .recharge-goods {
                    position: relative;
                    border: 1px solid #e8e8e8;
                    border-radius: 8px;
                    padding: 15px;
                    text-align: center;
                    transition: all 0.3s;

                    &:hover {
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    }

                    .tag {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        background: #ff9800;
                        color: white;
                        padding: 2px 8px;
                        border-radius: 4px;
                        font-size: 12px;
                    }

                    .product-image {
                        width: 80px;
                        height: 80px;
                        margin-bottom: 10px;
                    }

                    .product-name {
                        font-size: 16px;
                        margin-bottom: 5px;
                    }

                    .product-extra {
                        color: #666;
                        font-size: 14px;
                        margin-bottom: 10px;
                    }

                    .price {
                        font-size: 20px;
                        font-weight: bold;
                        color: #f85415;
                        margin-bottom: 15px;
                    }

                    .recharge-button {
                        width: 100%;
                        padding: 8px;
                        background: #00b4ce;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;

                        &:hover {
                            background: #02a6c0;
                        }
                    }
                }
            }
        }
    }
}

.order-info {
    .order-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e8e8e8;
    }

    .detail-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;

        .points-value {
            color: #f85415;
            font-weight: bold;
        }
    }
}

/* Modal 样式 */
/deep/ .ant-modal-content {
    border-radius: 8px;
}

/deep/ .ant-modal-header {
    border-radius: 8px 8px 0 0;
}

/deep/ .ant-modal-body {
    padding: 24px;
}
</style>