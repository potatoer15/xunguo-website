<template>
  <article class="about" id="step1">
    <!--海报-->
    <section class="banner container-fluid">
      <img src="../../../static/img/about-bg.jpg" alt="">
      <div class="title">
        <p class="p1">COMPANY</p>
        <p class="p2">把你的梦想带入生活</p>
      </div>
    </section>
    <!--列表介绍-->
    <section class="info-list">
      <div class="container-fluid">
        <div class="item  bx">
          <div class="font">
            <div>
              <div class="title">公司的愿景 </div>
              <p>公司致力于游戏精细化推广、拓展和运营，为玩家提供更多元化的游戏体验。 </p>
              <p>打造对标一线品牌的优秀精品手游，为玩家打造一个专业健康的手游联运平台。凭借丰富的经验快速崛起，成立至今一直是多家知名互联网渠道的优质合作伙伴。</p>
            </div>
          </div>
          <div class="img">
            <img src="../../../static/img/about-list1.png" alt="">
          </div>
        </div>
      </div>
      <div class="container-fluid" style="background:#fff;">
        <div class="item  bx">
          <div class="img">
            <img src="../../../static/img/about-list2.png" alt="">
          </div>
          <div class="font">
            <div>
              <div class="title">公司的战略 </div>
              <p>孵化更多现象级IP，致力于服务更广大的用户。 </p>
              <p>打造更有效、更有力的游戏服务平台。</p>
              <p>展望出海，实行业务全球化！</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="item  bx">
          <div class="font">
            <div>
              <div class="title">公司的经营理念 </div>
              <p>我们以用户为中心，以产品为核心。 </p>
              <p>秉承“用户第一，产品至上”的发行宗旨！</p>
              <p>我们追求与合作伙伴双赢，与员工共同成长！</p>
            </div>
          </div>
          <div class="img">
            <img src="../../../static/img/about-list3.png" alt="">
          </div>
        </div>
      </div>
    </section>
  </article>

</template>

<script>
export default {
  name: 'join-us',
  data() {
    return {
      activeIndex: 0,
      invite: {
        first_card: {
          sketch: [],
          particulars: []
        }
      },
      map: null
    }
  },
  mounted() {
    // 初始化地图
    this.initMap()
  },
  methods: {
    initMap() {
      // 创建地图实例
      this.map = new AMap.Map('container', {
        zoom: 15,
        center: [113.330014, 23.138132] // 广州天河区坐标
      })

      // 添加标记点
      const marker = new AMap.Marker({
        position: [113.330014, 23.138132],
        title: '公司位置'
      })

      this.map.add(marker)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.about {
  max-width: 1920px;
  margin: 0 auto;

  .orange {
    color: #ff9d01;
  }

  // 海报
  .banner {
    padding: 0;
    position: relative;
    background-color: #2b292a;

    img {
      display: block;
      margin: 0 auto;
      max-width: 1920px;
    }

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

  // 详情列表
  .info-list {
    &>.container-fluid {
      background-color: #f6f6f6;
    }

    .item {
      display: flex;
      -webkit-display: flex;
      -moz-display: flex;
      -o-display: flex;
      box-sizing: border-box;
      min-height: 600px;
      align-items: center;

      .font {
        height: 100%;
        padding: 25px;
        color: #6d6d6d;

        .title {
          font-size: 20px;
          padding-bottom: 22px;
          color: #474747;
          font-weight: 700;

          &:after {
            display: block;
            content: '';
            height: 3px;
            width: 70px;
            background-color: #ff9c26;
            margin-top: 12px;
          }

        }

      }

      .img {
        padding: 5%;
        padding-left: 0;
      }

      &>div {
        flex: 1;
      }

      // 适配ipad
      @media screen and (min-width:500px) and (max-width:992px) {
        min-height: 300px;
      }

      // 适配手机
      @media screen and (max-width:500px) {
        min-height: 400px;
        flex-wrap: wrap;

        &>div {
          flex-basis: 100%;
          width: 100%;
        }

        .img {
          padding: 0 12% 5%;
        }

        .font {
          padding: 5%;
          font-size: 12px;

          .title {
            font-size: 17px;
          }
        }
      }
    }
  }

  // 办公环境
  .office {
    .title {
      margin: 0 auto;
      text-align: center;
      max-width: 414px;
      font-size: 20px;
      font-weight: 700;
      height: 110px;
      line-height: 110px;
      // padding-bottom:22px;
      color: #474747;

      &:after {
        margin: 0 auto;
        display: block;
        content: '';
        height: 3px;
        width: 70px;
        background-color: #ff9c26;
        margin-top: -28px;
      }

    }

    .photo {
      margin-bottom: 20px;
    }
  }

  .address {
    background-color: #fff;
    position: relative;

    .map {
      height: 510px;
      width: 100%;

      #container {
        width: 100%;
        height: 100%;
      }

      .address-info {
        text-align: left;
        z-index: 9999;
        overflow: hidden;

        .txt-box {
          max-width: 370px;
          height: 315px;
          background-color: #ffffff;
          margin-top: 50px;
          padding: 44px;

          // padding-top:28px;
          h2 {
            font-size: 22px;
            height: 60px;
            line-height: 60px;
            margin-bottom: 14px;

            &:after {
              content: '';
              display: block;
              height: 3px;
              width: 50px;
              background-color: #ff9b25;
            }
          }

          p {
            font-size: 13px;
            height: 30px;
            line-height: 30px;
            color: #989898;

            i.email {
              margin-right: 2px;
            }

            i {
              color: #ff9b25;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
