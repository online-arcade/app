<template>
	<view>
		<uni-section title="兑换记录" type="line">
			<uni-list>
				<uni-list-item v-for="(item,index) of exchanges" :key="index" :title="item.phone"
					:note="item.type + '  '+item.amount" />
			</uni-list>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: '',
				exchanges: []
			};
		},
		mounted() {
			this.load()
		},
		onPullDownRefresh() {
			this.users = [];
			this.load()
		},
		onReachBottom() {
			this.load()
		},
		methods: {
			async load() {
				this.token = uni.getStorageSync('token')
				const res = await this.$request({
					method: 'GET',
					url: `exchange/list`,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Authorization': 'Bearer ' + this.token
					},
					data: {
						skip: this.exchanges.length,
						limit: 20,
					}
				})
				if (res.data) {
					this.exchanges = this.exchanges.concat(res.data.data)
				}
				uni.stopPullDownRefresh()
			}
		}

	}
</script>

<style lang="scss">

</style>