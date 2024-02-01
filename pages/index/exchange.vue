<template>
	<view>
		<uni-section title="兑换记录" type="line">
			<uni-list>
				<uni-list-item v-for="(item,index) of exchange" :key="index" title="兑换记录" />
			</uni-list>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: '',
				exchange: [{}]
			};
		},
		mounted() {
			this.load()
		},
		methods: {
			async load() {
				this.token = uni.getStorageSync('token')
				// const res = await this.$request({
				// 	method: 'GET',
				// 	url: `user/list`,
				// 	header: {
				// 		'Content-Type': 'application/json;charset=UTF-8',
				// 		'Authorization': 'Bearer ' + this.token
				// 	}
				// })
				// if (res.data) {
				// 	this.exchange = res.data.data 
				// }
			}
		}

	}
</script>

<style lang="scss">

</style>
