import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { getBlsjById } from '/@/api/jwlc/index'
import { getUrlParam } from '/@/assets/js/common.js';
const ywdm = getUrlParam('ywdm')
import { Input, Select } from 'ant-design-vue'

const style = {
  'text-align': 'center',
  'text-overflow': 'ellipsis',
  'white-space': 'nowrap',
  overflow: 'hidden',
};

// 列信息
export const columns: BasicColumn[] = [
  {
    title: '变量名称',
    dataIndex: 'csmc',
    ellipsis: true,
    sorter: false,
    customRender: ({ record }) => {
      return h('div', { style: style }, record.csmc);
    },
  },
  {
    title: '变量代码',
    dataIndex: 'csdm',
    ellipsis: true,
    sorter: false,
    customRender: ({ record }) => {
      return h('div', { style: style }, record.csdm);
    },
  },
  {
    title: '变量输入方式',
    dataIndex: 'zxxs',
    ellipsis: true,
    sorter: false,
    customRender: ({ record }) => {
      return h('div', { style: style }, record.zxxs);
    },
  },
  {
    title: '数据类型',
    dataIndex: 'lx',
    ellipsis: true,
    sorter: false,
    customRender: ({ record }) => {
      return h('div', { style: style }, record.lx);
    },
  },
  {
    title: '数据来源',
    dataIndex: 'sjly',
    ellipsis: true,
    sorter: false,
    customRender: ({ record }) => {
      return h('div', { style: style }, record.sjly);
    },
  },


];

export const formSchemas: FormSchema[] = [
  {
    field: 'csmc',
    label: '变量名称',
    component: 'Input',
    required: true,
    colProps: { span: 18 },
    componentProps: {
      maxlength: 50
    }
  },
  {
    field: 'csdm',
    label: '变量代码',
    component: 'Input',
    required: true,
    colProps: { span: 18 },
    componentProps: {
      maxlength: 50
    }
  },
  {
    field: 'zxxs',
    label: '变量输入方式',
    component: 'Select',
    required: true,
    componentProps: {
      options: [
        {
          label: '下拉',
          value: '下拉',
          key: '下拉',
        },
        {
          label: '表单',
          value: '表单',
          key: '表单',
        },
      ],
    },

    colProps: { span: 18 },
  },

  {
    field: 'lx',
    label: '数据类型',
    component: 'Select',
    required: true,
    componentProps: {
      options: [
        {
          label: '字符串',
          value: '字符串',
          key: '字符串',
        },
        {
          label: '数值',
          value: '数值',
          key: '数值',
        },
      ],
    },

    colProps: { span: 18 },
  },

  {
    field: 'sjly',
    label: '数据来源',
    ifShow: ({ model }) => {
      return model.zxxs == '下拉'
    },
    helpMessage: `一条查数据的sql，查询列必须包含dm和mc，比如select 'dm1' as dm,'名称' as mc from dual'`,
    component: 'InputTextArea',
    required: true,
    colProps: { span: 18 },
    componentProps: {
      maxlength: 200
    }
  },

];

// 用户选择相关
export const userForm: FormSchema[] = [
  {
    field: 'xm',
    label: '姓名',
    component: 'Input',
    colProps: { span: 12 },
  },
];

export const userColumns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'yhm',
    ellipsis: true,
    customRender: ({ record }) => {
      return h('div', { style: style }, record.yhm);
    },
  },
  {
    title: '姓名',
    dataIndex: 'xm',
    ellipsis: true,
    customRender: ({ record }) => {
      return h('div', { style: style }, record.xm);
    },
  },
  {
    title: '部门名称',
    dataIndex: 'jgmc',
    ellipsis: true,
    customRender: ({ record }) => {
      return h('div', { style: style }, record.jgmc);
    },
  },
  // {
  //   title: '联系电话',
  //   dataIndex: 'lxdh',
  //   ellipsis: true,
  //   customRender: ({ record }) => {
  //     return h('div', { style: style }, record.lxdh);
  //   },
  // },
  // {
  //   title: '邮箱',
  //   dataIndex: 'email',
  //   ellipsis: true,
  //   customRender: ({ record }) => {
  //     return h('div', { style: style }, record.email);
  //   },
  // },

];

// 条件选择相关 tjColumns

export const tjColumns: BasicColumn[] = [
  {
    title: '目标节点',
    dataIndex: 'node_name',
    ellipsis: true,
    width: 120,
    customRender: ({ record }) => {
      return h('div', {}, record.node_name);
    },
  },
  {
    title: '条件表达式',
    dataIndex: 'expression_mc',
    ellipsis: false,
    width: 240,
    customRender: ({ record }) => {
      return h('div', {}, record.expression_mc);
    },
  },
  {
    title: '条件表达式',
    dataIndex: 'expression_dm',
    ellipsis: false,
    width: 240,
    ifShow: false,
    customRender: ({ record }) => {
      return h('div', {}, record.expression_dm);
    },
  },
  {
    title: 'sql',
    dataIndex: 'ywqz',
    ellipsis: false,
    width: 240,
    customRender: ({ record }) => {
      return h('div', {}, record.ywqz);
    },
  },
  {
    title: '优先级',
    dataIndex: 'priority',
    ellipsis: false,
    customRender: ({ record }) => {
      return h('div', {}, record.priority);
    },
  },


];

const mockData = [{
  csdm: "xn",
  csmc: "学年",
  id: "4ED71A68E8C3C884E0630B1D470A5638",
  lx: "数值",
  sjly: null,
  ywdm: "xxxx",
  zxxs: "表单",
}, {
  csdm: "jgdm",
  csmc: "机构",
  id: "4ED6A81E7C50B866E0630B1D470A11C2",
  lx: null,
  sjly: null,
  ywdm: null,
  zxxs: "下拉",
}]

export const bdsColumns: BasicColumn[] = [
  {
    title: '变量',
    dataIndex: 'bl',
    customRender: ({ record }) => {
      return h(Select, {
        options: (window.allBl || []).map(v => {
          return {
            ...v,
            label: v.csmc,
            value: v.csdm,
            key: v.csdm
          }
        }),
        showSearch: true,
        filterOption: (input, option) => {
          return (
            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
          )
        },
        placeholder: '请选择变量',
        style: {
          width: '100%'
        },
        value: record.bl,
        getPopupContainer: () => document.getElementById('bdsRef'),
        onChange: async (e, ee) => {
          console.log(ee)
          record.zxxs = ee.zxxs
          record.lx = ee.lx
          record.ysf = undefined
          record.bl = e
          record.blmc = ee.csmc
          record.sxz = undefined
          record.sxzmc = undefined
          if(ee.zxxs == '下拉') {
            record.opt = []
            const res = await getBlsjById({
              id: ee.id
            })
            record.opt = res || [] // 这里有大问题
          } else {
            record.opt = []
          }
        }
      });
    },
  },
  // 变量名称
  {
    title: '变量名称',
    dataIndex: 'blmc',
    ifShow: false,
    customRender: ({ record }) => {
      return record.blmc
    }
  },
  {
    title: '选项下拉',
    dataIndex: 'opt',
    ifShow: false,
    customRender: ({ record }) => {
      return record.opt
    }
  },

  // {
  //   title: '变量',
  //   dataIndex: 'bl1',
  //   edit: true,
  //   editable: true,
  //   editIcon: false,
  //   editComponent: 'ApiSelect',
  //   editComponentProps: ({ record }) => {
  //     return {
  //       api: queryAllBl,
  //       labelField: 'csmc',
  //       valueField: 'csdm',
  //       showSearch: true,
  //       getPopupContainer: () => document.getElementById('bdsRef'),
  //       params: {
  //         ywdm
  //       },
  //     }
  //   }
  // },
  // {
  //   title: '变量输入方式',
  //   dataIndex: 'zxxs',
  //   ellipsis: true,
  //   ifShow: true,
  //   customRender: ({ record }) => {
  //     return h('div', {}, record.zxxs);
  //   },
  // },
  // {
  //   title: '数据类型',
  //   dataIndex: 'lx',
  //   ellipsis: true,
  //   ifShow: true,
  //   customRender: ({ record }) => {
  //     return h('div', {}, record.lx);
  //   },
  // },

  {
    title: '运算符',
    dataIndex: 'ysf',
    customRender: ({record}) => {
      let ysfOptions = []
      //  不等于、大于、大于等于、小于、小于等于、等于、匹配
      if(record.lx == '数值') {
        ysfOptions = [{
          label: '不等于',
          value: '0',
        },{
          label: '大于',
          value: '1',
        }, {
          label: '大于等于',
          value: '2',
        }, {
          label: '小于',
          value: '3',
        }, {
          label: '小于等于',
          value: '4',
        },{
          label: '等于',
          value: '5',
        }]
      } else {
        ysfOptions = [{
          label: '不等于',
          value: '0',
        },{
          label: '等于',
          value: '5',
        }, {
          label: '模糊匹配',
          value: '6',
        }]
      }

      return h(Select, {
        value: record.ysf,
        options: ysfOptions,
        placeholder: '请选择',
        style: {
          width: '100%'
        },
        onChange: (e, ee) => {
          record.ysf = e
        },
        getPopupContainer: () => document.getElementById('bdsRef'),
      });
    }
  },
  {
    title: '属性值',
    dataIndex: 'sxz',
    customRender: ({ record }) => {
      if(record.zxxs == '表单') {
        return h(Input, {
          style: {
            width: '100%'
          },
          placeholder: '请输入',
          value: record.sxz,
          onChange: (e) => {
            record.sxz = e.target.value
            record.sxzmc = e.target.value
          }
        });
      } else if(record.zxxs == '下拉'){
        return h(Select, {
          style: {
            width: '100%'
          },
          options: (record.opt || []).map(v => {
            return {
              ...v,
              label: v.MC,
              value: v.DM
            }
          }),
          placeholder: '请选择',
          value: record.sxz,
          onChange: (e, ee) => {
            record.sxz = e
            record.sxzmc = ee.label
          }
        });
      } else {
        return ''
      }
      
    },
  },

  // 属性值名称
  {
    title: '属性名称',
    dataIndex: 'sxzmc',
    ifShow: false,
    customRender: ({ record }) => {
      return record.sxzmc
    }
  },
];

