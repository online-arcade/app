<template>
	<view>
		<uni-section title="兑换记录" type="line">
			<uni-list>
				<uni-list-item v-for="(item,index) of exchanges" :key="index" :title="item.phone"
					:note="item.type + '  '+item.amount" />
			</uni-list>
		</uni-section>
		<view class="none" v-if="!exchanges.length">
			<view>数据为空</view>
		</view>
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
			this.exchanges = [];
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
	.none {
		color: gray;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30px;
		box-sizing: border-box;
	}
</style>
