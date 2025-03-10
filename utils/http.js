
module.exports = {
  http(url, method, params) {
    let token = 'token' // 获取token，自行获取token和签名，token和签名表示每个接口都要发送的数据
    let sign = 'sign' // 获取签名 (后台怎么定义的，就传什么)
    let data = {
      token,
      sign
    }
    if (params.data) { // 在这里判断一下data是否存在，params表示前端需要传递的数据，params是一个对象，有三组键值对，data：表示请求要发送的数据，success：成功的回调，fail：失败的回调，这三个字段可缺可无，其余字段会忽略
      for (let key in params.data) { // 在这里判断传过来的参数值为null，就删除这个属性
        if (params.data[key] == null || params.data[key] == 'null') {
          delete params.data[key]
        }
      }
      data = { ...data, ...params.data }
    }
    wx.request({
      url: getApp().globalData.url + url, // 就是拼接上前缀,此接口域名是开放接口，可访问
      method: method, // 判断请求类型，除了值等于'post'外，其余值均视作get 其他的请求类型也可以自己加上的
      data,
      header: {
        'content-type': 'application/json',
        'weChat': wx.getStorageSync('weChat')
      },
      success(res) {
        params.success && params.success(res.data)
      },
      fail(err) {
        params.fail && params.fail(err)
      }
    })
  }
}