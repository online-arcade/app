const baseUrl = 'http://gamebox.zgwit.cn:8082/api/'
const request = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url,
			method: options.method || 'GET',
			header: options.header,
			data: options.data || {},
			success: (res) => {
				resolve(res);
			},

			fail: (err) => {
				reject(err)
			}
		})
	});
}
export default request
