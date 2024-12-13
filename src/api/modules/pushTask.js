const pushTask = {
  // 新增任务
  addTask: {
    url: '/prod-api/task/create',
    method: 'post',
    contentType: 'json'
  },
  // 选择警察部门
  chosePcs:{
    url:'/prod-api/system/user/deptTree',
    method:'get'
  },
  // 获取任务列表
  getTaskList:{
    url:'/prod-api/task/list',
    method:'get'
  },
  // 修改积分
  pointDel:{
    url:'/prod-api/drug-user/point',
    method:'put'
  },
  // 禁毒知识
  jdzs:{
    url:'/prod-api/knowledge/list',
    method:'get'
  },
  // 消息通知
  getInform:{
    url:'/prod-api/message-notify/list',
    method:'get'
  },
  // 提交人员信息修改信息
  updateUser:{
    url:'/prod-api/drug-user',
    method:'put'
  }
  
}

export default pushTask