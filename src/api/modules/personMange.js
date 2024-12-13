const personMange = {
  // 获取吸毒人员列表
  getxdryList: {
    url: '/prod-api/drug-user/list',
    method: 'get',
  },
  // 获取用户列表
  getUserList: {
    url: '/prod-api/system/user/list',
    method: 'get',
  },
  // 获取任务列表
  getRwList: {
    url: '/prod-api/task/list',
    method: 'get',
  },
  // 吸毒人员上报
  reportByXdry: {
    url: '/prod-api/report',
    method: 'post',
    contentType: 'json'
  },
  // 获取上报列表
  getReportList: {
    url: '/prod-api/report/list',
    method: 'get',
  },
  // 修改上报列表
  ReportEdit: {
    url: '/prod-api/report',
    method: 'put',
  },
  // 修改任务
  taskEdit:{
    url:'/prod-api/task',
    method:'put',
    // contentType:'json'
  },
// 家属上报
  familyRepoet: {
    url: '/prod-api/family-user',
    method: 'post',
    contentType: 'json'
  },
  // 家属列表
  familyList: {
    url: '/prod-api/family-user/list',
    method: 'get',
  },
  // 申请修改信息
  updateInfo: {
    url: '/prod-api/drug-user',
    method: 'put',
    contentType: 'json'
  },
}

export default personMange