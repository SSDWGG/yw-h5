const login = {
  login: {
    url: '/prod-api/login',
    method: 'post',
    contentType:'json'
  },
  // 获取用户信息
  getInfo: {
    url: '/prod-api/getInfo',
    method: 'get'
  },
  // 获取统计数据
  getChartData:{
    url:'/prod-api/dashboard',
    method:'get'
  },
}

export default login