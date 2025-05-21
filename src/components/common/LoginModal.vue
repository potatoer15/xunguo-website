<template>
  <a-modal :visible="visible" @cancel="handleCancel" :confirmLoading="loading" :footer="null" width="680px">
    <div class="login-window">
      <div class="login-ad">
        <img alt="logo" src="../../../static/img/logo280.png" style="width: 128px; height: 128px;margin-top: 28px" />
      </div>
      <div class="login-form">
        <a-tabs>
          <a-tab-pane key="1" tab="账号登录">
            <a-form :model="loginForm" name="basic" :wrapper-col="{ span: 15 }" autocomplete="off">
              <a-form-item :help="ValidatePhoneNumberMsg">
                <a-input v-model="loginForm.phoneNumber" placeholder="请输入手机号/邮箱" id="myPhoneInput" size="large"
                  @change="handlePhoneChange">
                </a-input>
              </a-form-item>

              <a-form-item>
                <a-space>
                  <a-input v-model="loginForm.smsCode" id="myCodeInput" placeholder="请输入验证码" @change="handleCodeChange"
                    allowClear size="large">
                  </a-input>
                  <a-button @click="getCode" :disabled="isCodeButtonDisabled" :loading="codeLoading">
                    {{ btnText }}
                  </a-button>
                </a-space>
              </a-form-item>

              <a-form-item :wrapper-col="{ span: 16 }">
                <a-button type="primary" size="large" @click="handleLogin">登录
                </a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </a-modal>
</template>

<script>
import auth from '@/api/auth'

export default {
  name: 'LoginModal',

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      loginForm: {
        phoneNumber: '',
        smsCode: '',
        countdownTime: 0,
        countingDown: false
      },
      loading: false,
      codeLoading: false,
      ValidatePhoneNumberMsg: '',
      countdown: 0
    }
  },

  computed: {
    btnText() {
      const diff = Math.ceil((this.loginForm.countdownTime - Date.now()) / 1000)
      if (diff > 0) {
        setTimeout(() => this.countdown = diff - 1, 1000)
      } else {
        this.loginForm.countingDown = false
      }
      return this.countdown > 0 ? `重新发送(${this.countdown})` : '获取验证码'
    },

    isCodeButtonDisabled() {
      return (!this.loginForm.phoneNumber.includes('@') &&
        this.loginForm.phoneNumber.length != 11) ||
        this.loginForm.countingDown
    }
  },

  mounted() {
    this.$nextTick(() => {
      const inputEl = document.getElementById(this.countdown > 0 ? 'myCodeInput' : 'myPhoneInput')
      if (inputEl) {
        inputEl.focus()
      }
    })
  },

  methods: {
    handlePhoneChange(event) {
      const validEmailChars = /^[0-9a-zA-Z@._-]$/
      if (event.data && !validEmailChars.test(event.data)) {
        this.loginForm.phoneNumber = this.loginForm.phoneNumber.substring(
          0,
          this.loginForm.phoneNumber.length - 1
        )
      }
    },

    handleCodeChange() {
      if (this.loginForm.smsCode.length >= 7) {
        this.loginForm.smsCode = this.loginForm.smsCode.substring(
          0,
          this.loginForm.smsCode.length - 1
        )
      }
    },

    async getCode() {
      this.codeLoading = true
      try {
        await auth.smsCode(this.loginForm.phoneNumber)
        this.$message.success('获取验证码成功')
        this.loginForm.countingDown = true
        this.loginForm.countdownTime = Date.now() + 60000 // 60秒倒计时
      } catch (error) {
        this.$message.error(error.message || '获取验证码失败')
      } finally {
        this.codeLoading = false
      }
    },

    async handleLogin() {
      try {
        this.loading = true
        // 1. 登录获取token
        const token = await auth.loginByPhone(
          this.loginForm.phoneNumber,
          this.loginForm.smsCode
        )

        // 2. 存储 token
        this.$store.commit('setToken', token)

        // 3. 获取用户信息
        const userInfo = await auth.getUserInfo()
        const userinfoAndCoupon = await auth.getUserInfoAndCoupon()

        // 4. 存储用户信息
        this.$store.commit('setUserInfo', {
          ...userInfo,
          coupon: userinfoAndCoupon.coupon
        })

        // 5. 发送登录成功事件
        this.$emit('login-success', userInfo.nickName)
        this.$message.success('登录成功')
        this.resetForm()
      } catch (error) {
        this.$message.error(error.message || '登录失败')
      } finally {
        this.loading = false
      }
    },

    handleCancel() {
      this.$emit('update:visible', false)
      this.resetForm()
    },

    resetForm() {
      this.loginForm = {
        phoneNumber: '',
        smsCode: '',
        countdownTime: 0,
        countingDown: false
      }
    }
  }
}
</script>

<style scoped>
.login-window {
  display: flex;
}

.login-ad {
  flex-basis: 240px;
  background-color: #eaf2f8;
  background: linear-gradient(#FFF, #eaf2f8);
  margin-right: 20px;
  border-radius: 10px;
  text-align: center;
  padding-top: 30px;
}

.login-form {
  flex: 1
}

.note-text {
  color: cadetblue;
  margin-left: 0.5em;
}
</style>