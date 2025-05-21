<template>
	<div class="my-nav">
		<div class="bx">
			<nav class="navbar navbar-default">
				<!-- 导航头部 -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
						data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<router-link class="navbar-brand" to="/">
						<img src="../../../static/img/logo.png" alt="logo">
					</router-link>
				</div>

				<!-- 导航内容 -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<!-- 主导航菜单 -->
					<ul class="nav navbar-nav items">
						<li v-for="(item, index) in navItems" :key="index" :index="index"
							:class="{ active: currentPath === item.path }">
							<router-link :to="item.path">
								<i :class="item.icon"></i>
								{{ $store.state.langPack.header[item.label] }}
							</router-link>
						</li>
					</ul>

					<!-- 右侧菜单 -->
					<ul class="nav navbar-nav navbar-right">
						<!-- 社交媒体链接 -->
						<!-- <li>
							<ul class="link">
								<li v-for="(social, index) in socialLinks" :key="index">
									<a :href="social.url" :target="social.target">
										<img :src="social.icon" :alt="social.name" />
									</a>
								</li>
							</ul>
						</li> -->
						<!-- 登录状态 -->
						<template v-if="isLoggedIn">
							<li class="user-info">
								<span>{{ $store.state.userInfo.nickName }}</span>
								<span style="color: #f74a15; margin-left: 20px;"><i class="fa fa-money"></i>{{
									$store.state.userInfo.coupon }}</span>
								<a-button type="link" @click="handleLogout">退出</a-button>
							</li>
						</template>
						<template v-else>
							<li>
								<a href="#" @click="showLoginModal" class="login-container">
									登录
								</a>
							</li>
						</template>
					</ul>
				</div>
			</nav>
		</div>

		<!-- 使用新的登录组件 -->
		<login-modal :visible.sync="loginVisible" @login-success="handleLoginSuccess" />
	</div>
</template>

<script>
import LoginModal from './LoginModal.vue'
import { getState } from '../../store/store'
export default {
	name: 'VHeader',

	components: {
		LoginModal
	},

	data() {
		return {
			navItems: [
				{ path: '/index', icon: 'fa fa-home', label: 'home' },
				{ path: '/games', icon: 'fa fa-gamepad', label: 'games' },
				{ path: '/recharge', icon: 'fa fa-money', label: 'recharge' },
				// { path: '/careers', icon: 'fa fa-flag', label: 'careers' },
				{ path: '/about', icon: 'fa fa-user', label: 'about' }
			],
			socialLinks: [
				{ name: 'youtube', icon: require('../../../static/img/youtube.png'), url: '', target: '_blank' },
				{ name: 'facebook', icon: require('../../../static/img/facebook.png'), url: 'https://www.facebook.com/gameflask/', target: '_blank' },
				{ name: 'twitter', icon: require('../../../static/img/twitter.jpg'), url: '', target: '_blank' },
				{ name: 'google', icon: require('../../../static/img/google.jpg'), url: '', target: '_blank' }
			],
			languages: [
				{ value: '2', label: 'english' },
				{ value: '1', label: 'zh_hk' },
				{ value: '0', label: 'zh_cn' }
			],
			loginVisible: false,
		}
	},

	computed: {
		currentPath() {
			return this.$route.path
		},
		isLoggedIn() {
			return !!getState('userInfo.nickName')
		},
		userName() {
			return getState('userInfo.nickName')
		},
		currentLang() {
			return getState('langPack.header.language')
		}
	},

	methods: {
		showLoginModal() {
			this.loginVisible = true
		},

		handleLoginSuccess() {
			this.loginVisible = false
		},

		handleLogout() {
			this.$store.commit('clearUserInfo')
			this.$message.success('已退出登录')
		},
	}
}
</script>
<style lang="less">
.my-nav {
	background-color: #363636;

	.navbar.navbar-default {
		background-color: #363636;
		border: none;
	}

	.navbar-default .navbar-nav>li>a {
		color: #fff;
	}

	.navbar-default .navbar-nav>li.active a {
		background-color: #fb9a37;
	}

	.navbar-default .navbar-nav>.open>a,
	.navbar-default .navbar-nav>.open>a:focus,
	.navbar-default .navbar-nav>.open>a:hover {
		color: #eee;
		background-color: transparent;
		background-color: rgba(255, 255, 255, .2);
		background-color: rgba(0, 0, 0, .1);
	}

	.navbar-default .navbar-nav>.active>a {
		color: #eee;
		// background-color: #456ea5;
	}

	.navbar {
		// min-height: 70px;
		margin-bottom: 0px;
	}

	.navbar-brand {
		font-size: 30px;
		// padding-right:50px;
		color: #eee;
		font-style: italic;

		&:hover {
			color: #eee;
		}
	}

	.navbar-right {

		// fackbook...外链
		ul.link {
			display: flex;
			-webkit-display: flex;
			-moz-display: flex;
			-o-display: flex;
			align-items: center;
			min-height: 50px;
			margin-right: 16px;

			li {
				width: 18px;
				margin: 0 8px;

				img {
					display: block;
					width: auto;
					height: auto;
					margin: 0 auto;
				}
			}

			// 中等屏幕时隐藏
			@media screen and (min-width:768px) and (max-width:992px) {
				display: none;
			}
		}
	}

	// 适配pc端导航
	@media screen and (min-width:768px) {
		#bs-example-navbar-collapse-1 {
			&>ul {
				&>li>a {
					// height:70px !important;
					// line-height:70px !important ;
					padding: 25px 20px;
				}
			}
		}

		.navbar-header>a {
			padding: 22px 15px;
			height: 70px;

			img {
				height: auto;

			}
		}

		ul.link {
			height: 70px;
		}
	}

	.login-container {
		margin-left: 40px;
	}

	.login-btn {
		font-size: 14px;
	}

	.user-info {
		padding: 16px 20px;
		margin-left: 40px;
		display: flex;
		align-items: center;
		color: #fff;

		span {
			font-size: 14px;
		}
	}
}
</style>
