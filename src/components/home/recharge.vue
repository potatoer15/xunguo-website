<template>
    <div class="game-list">
        <!--海报-->
        <section class="banner container-fluid">
            <img src="../../../static/img/game-bg.jpg" alt="">
            <div class="title">
                <p class="p1">Games</p>
                <p class="p2">做最出色的遊戲</p>
            </div>
        </section>
        <!--游戏列表-->
        <section class="list container">
            <div class="row">
                <div class="col-xs-6 col-sm-5 col-md-4" v-for="(v, i) in initData" :key="i">
                    <div class="game-card">
                        <div class="game-image">
                            <img :src="v.imgURL" alt="" class="ec-bounce-in-l">
                        </div>
                        <div class="game-title">
                            {{ v.name[langIndex] }}
                        </div>
                        <div class="recharge-btn">
                            <router-link :to="{ name: 'rechargeDetail', params: { gameId: v.gameKey } }"
                                class="btn">充值</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { games } from '../../assets/game_data'
export default {
    data() {
        return {
            initData: [],
            langIndex: '0', //语言类型index
        }
    },
    mounted() {
        setTimeout(function () {
            document.querySelectorAll(".latest-info img").forEach(v => {
                v.classList.remove('ec-bounce-in-l');
            })
        }, 1100)
    },
    created() {
        for (let key in games) {
            this.initData.push(games[key]); //获取游戏数据列表
        }
    },
    watch: {
        '$store.state.langPack': function () {
            this.langIndex = '0'
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.game-list {
    max-width: 1920px;
    min-height: 100vh;
    margin: 0 auto;

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

    // 游戏列表
    .list {
        padding: 40px 0;

        .game-card {
            background: #fff;
            border-radius: 12px;
            padding: 20px;
            margin-top: 20px;
            margin-bottom: 80px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-5px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }

            .game-image {
                position: relative;
                top: -50px;
                margin-bottom: 15px;

                img {
                    width: 120px;
                    height: 120px;
                    border-radius: 16px;
                }
            }

            .game-title {
                position: relative;
                top: -50px;
                font-size: 20px;
                color: #333;
                font-weight: 500;
            }

            .recharge-btn {
                .btn {
                    display: inline-block;
                    background: #00bcd4;
                    color: #fff;
                    padding: 8px 30px;
                    border-radius: 20px;
                    text-decoration: none;
                    transition: background 0.3s;

                    &:hover {
                        background: #00acc1;
                    }
                }
            }
        }

        @media screen and (max-width: 767px) {
            padding: 20px 0;

            .game-card {
                padding: 15px;
                margin-bottom: 20px;

                .game-image img {
                    width: 60px;
                    height: 60px;
                }

                .game-title {
                    font-size: 14px;
                    margin-bottom: 12px;
                }

                .recharge-btn .btn {
                    padding: 6px 20px;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>