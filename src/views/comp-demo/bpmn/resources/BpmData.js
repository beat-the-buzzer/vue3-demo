/**
 * 存储流程设计相关参数
 */
export default class BpmData {
  constructor() {
    this.controls = [] // 设计器控件
    this.init()

  }

  init() {
    this.controls = [
      {
        action: 'hand-tool',
        title: '抓手'
      },
      // {
      //   action: 'lasso-tool',
      //   title: '套索'
      // },
      // {
      //   action: 'space-tool',
      //   title: '空间'
      // },
      {
        action: 'global-connect-tool',
        title: '全局连接'
      },
      {
        action: 'create.start-event',
        title: '开始'
      },
      // {
      //     action: 'create.intermediate-event',
      //     title: '中间'
      // },
      {
        action: 'create.end-event',
        title: '结束'
      },
      {
        action: 'create.exclusive-gateway',
        title: '网关'
      },
      {
        action: 'create.user-task',
        title: '用户任务'
      },
      // {
      //   action: 'create.service-task',
      //   title: '服务任务'
      // },
      // {
      //   action: 'create.sign-task',
      //   title: '会签并行'
      // },
      // {
      //   action: 'create.sign-task-sequential',
      //   title: '会签串行'
      // },
      // {
      //   action: 'create.subprocess-expanded',
      //   title: '内部子流程'
      // },
      // {
      //   action: 'create.subprocess-collapsed',
      //   title: '外部子流程'
      // },
      // {
      //   action: 'create.data-object',
      //   title: '数据对象'
      // },
      // {
      //   action: 'create.data-store',
      //   title: '数据存储'
      // }, 
      // {
      //   action: 'create.participant-expanded',
      //   title: '泳池泳道'
      // }
    ]
  }

  //  获取控件配置信息
  getControl(action) {
    const result = this.controls.filter(item => item.action === action)
    return result[0] || {}
  }
}
