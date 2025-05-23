import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/home/index' //首頁
import careers from '@/components/home/careers'//加入我們
import games from '@/components/home/games'//游戏
import games_details from '@/components/home/games_details'//游戏详情
import game_news from '@/components/home/game_news'//游戏news
import about from '@/components/home/about'//资讯详情
import recharge from '@/components/home/recharge'//充值
import RechargeDetail from '@/components/home/recharge_detail.vue'
import agreement from '@/components/home/agreement.vue'
import policy from '@/components/home/policy.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/index'
		},
		{
			path: '/index',
			component: index
		},
		// {//加入我们
		// 	path: '/careers',
		// 	name: 'careers',
		// 	component: careers
		// },
		{//游戏列表
			path: '/games',
			name: 'games',
			component: games,
			children: [
				{ path: '/', component: games }
			]
		},
		// {//充值
		// 	path: '/recharge',
		// 	name: 'recharge',
		// 	component: recharge
		// },
		{//游戏详情
			path: '/games/*',
			component: games_details,
		},
		{//游戏详情
			path: '/games_details',
			name: 'games_details',
			component: games_details
		},
		{//游戏news
			path: '/game_news',
			name: 'game_news',
			component: game_news
		},
		{//关于
			path: '/about',
			name: 'about',
			component: about
		},
		{
			path: '/recharge/:gameId',
			name: 'rechargeDetail',
			component: RechargeDetail
		},
		{
			path: '/agreement',
			name: 'agreement',
			component: agreement
		},
		{
			path: '/policy',
			name: 'policy',
			component: policy
			
		}
	]
})
