<template>
  <div>
    <BasicModal :destroyOnClose="true" v-bind="$attrs" width="1024px" @register="registerModal" title="编辑"
      :maskClosable="false" @ok="handleSubmit" id="bdsRef">

      <div class="tableP">
        <BasicTable @register="registerTable" @edit-change="onEditChange">
          <template #toolbar>
            <a-button type="primary" @click="doAdd">添加表达式</a-button>
            <!-- <a-button type="primary">按“且”一键生成表达式</a-button>
            <a-button type="primary">按“或”一键生成表达式</a-button> -->
          </template>
          <template #action="{ record, index }">
            <TableAction :actions="[
              // {
              //   label: '复制',
              //   onClick: handleCopy.bind(null, record),
              // },
              {
                label: '填入',
                onClick: handleFill.bind(null, record),
              },
              {
                label: '删除',
                color: 'error',
                onClick: handleDelete.bind(null, record, index),
              }
            ]" />
          </template>
        </BasicTable>
      </div>
      <!--后面接一个表单-->
      <a-button type="link" @click="doInput(' 或 ', true)">或</a-button>
      <a-button type="link" @click="doInput(' 且 ', true)">且</a-button>
      <a-button type="link" @click="doInput('(', true)">(</a-button>
      <a-button type="link" @click="doInput(')', true)">)</a-button>
      <div>
        <BasicForm ref="formDom" @register="registerForm" @field-value-change="watchChange" />
      </div>

    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, unref, defineEmits, nextTick } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useMessage } from '/@/hooks/web/useMessage';
import { bdsColumns } from './index.data';
import { cloneDeep } from 'lodash-es'
import { BasicForm, useForm } from '/@/components/Form/index';
import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
const formDom = ref(null); // 表单元素

const { createMessage } = useMessage();
const emit = defineEmits(['success', 'register']);

const { clipboardRef, copiedRef } = useCopyToClipboard();

// 进入弹窗
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  setModalProps({ confirmLoading: false });
  setFieldsValue({
    ...data.record
  })
  await clearValidate()
  let tj = data.record.tj
  let dataList = []
  if(tj) {
    try {
      dataList = JSON.parse(tj)
    } catch(e) {
      console.log(e)
    }
    setTableData(dataList)
  } else {
    setTableData([])
  }
  
});

// 表格生成
const [registerTable, { reload, setProps, setTableData, getDataSource, getSelectRows, clearSelectedRowKeys }] = useTable({
  columns: bdsColumns,
  canResize: true,
  useSearchForm: false,
  showTableSetting: false,
  bordered: true,
  showIndexColumn: true,
  isCanResizeParent: false,
  pagination: false,
  actionColumn: {
    width: 100,
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
});

function onEditChange(e) {
  console.log(e)
}

function doAdd() {
  let dataList = cloneDeep(getDataSource()) || []
  dataList.push({
    bl: undefined,
    blmc: undefined,
    ysf: undefined,
    sxz: undefined,
    sxzmc: undefined,
    zxxs: undefined,
    lx: undefined,
    precision: ''
  })
  setTableData(dataList)
}

function handleDelete(record, index) {
  let dataList = cloneDeep(getDataSource())
  dataList = dataList.filter((v, i) => {
    return i !== index
  })
  setTableData(dataList)
}

function getExp(record) {
  let { bl, ysf, sxz, zxxs, lx } = record // 变量
  function isValue(val) {
    return val != null && val !== ''
  }
  
  if (isValue(bl) && isValue(ysf) && isValue(sxz) && isValue(zxxs)) {
    // #{je} >=3
    let ysfObj = {
      1: '>',
      2: '>=',
      3: '<',
      4: '<=',
      5: '==',
      6: 'like',
    }
    let copyContent1 = `#{${bl}}`
    let copyContent2 = `${ysfObj[ysf]}`
    let copyContent3 = ''
    if (ysf == '6') {
      copyContent3 = `%${sxz}%`
    } else {
      if (lx == '数值') {
        copyContent3 = `${sxz}`
      } else {
        copyContent3 = `'${sxz}'`
      }
    }
    return `${copyContent1} ${copyContent2} ${copyContent3}`;
  } else {
    return null
  }
}

function getExpMc(record) {
  let { blmc, ysf, sxzmc, zxxs, lx } = record // 变量
  function isValue(val) {
    return val != null && val !== ''
  }

  if (isValue(blmc) && isValue(ysf) && isValue(sxzmc) && isValue(zxxs)) {
    let ysfObj = {
      0: '不等于',
      1: '大于',
      2: '大于等于',
      3: '小于',
      4: '小于等于',
      5: '等于',
      6: '模糊匹配',
    }
    let copyContent1 = `${blmc}`
    let copyContent2 = `${ysfObj[ysf]}`
    let copyContent3 = ''
    if (ysf == '6') {
      copyContent3 = `${sxzmc}`
    } else {
      if (lx == '数值') {
        copyContent3 = `${sxzmc}`
      } else {
        copyContent3 = `${sxzmc}`
      }
    }
    return `${copyContent1} ${copyContent2} ${copyContent3}`;
  } else {
    return null
  }
}

function handleCopy(record) {
  let txt = getExp(record)
  if (txt) {
    clipboardRef.value = txt;
    if (unref(copiedRef)) {
      createMessage.success('已复制！');
    }
  } else {
    createMessage.error('数据填写不完整，请检查')
  }
}

function handleFill(record) {
  let txt = getExpMc(record)
  if (txt) {
    // 把内容填写进去
    // clipboardRef.value = txt;
    // if (unref(copiedRef)) {
    //   createMessage.success('已复制！');
    // }
    // let curr = getFieldsValue()
    // let expression_mc = curr.expression_mc || ''
    // expression_mc = `${expression_mc} ${txt}`
    // setFieldsValue({
    //   expression_mc
    // })
    doInput(txt, false)
  } else {
    createMessage.error('数据填写不完整，请检查')
  }
}

function doInput(content, ysfFlag = false) {
  var elInput = formDom.value.$el.querySelector(`#form_item_expression_mc`);
  if (elInput) {
    if (ysfFlag) {
      insertInputTxt(elInput, `${content}`, 'expression_mc');
    } else {
      insertInputTxt(elInput, `[${content}]`, 'expression_mc');
    }
  } else {
    createMessage.error('请先把光标放到消息标题或者消息内容输入框中');
  }
}

async function insertInputTxt(elInput, insertTxt, focusItem) {
  var startPos = elInput.selectionStart;
  var endPos = elInput.selectionEnd;
  if (startPos === undefined || endPos === undefined) {
    console.log('没有')
    return
  };
  var txt = elInput.value;
  var result = txt.substring(0, startPos) + insertTxt + txt.substring(endPos);
  // elInput.value = result  // 不修改dom 直接修改数据
  // console.log('result', result)
  setFieldsValue({
    [focusItem]: result,
  });
  watchChange('expression_mc', result)
  // props.record[focusItem] = result
  await nextTick();
  elInput.focus();
  elInput.selectionStart = startPos + insertTxt.length;
  elInput.selectionEnd = startPos + insertTxt.length;
}

const [
  registerForm,
  { setFieldsValue, validate, clearValidate, getFieldsValue },
] = useForm({
  labelWidth: 160,
  schemas: [
    {
      field: 'expression_mc',
      label: '条件表达式名称',
      helpMessage: '表达式从上方表格复制，或、且、括号需要手动输入或点击按钮输入',
      component: 'InputTextArea',
      required: true,
      colProps: { span: 18 },
      componentProps: {
        maxlength: 1000,
      }
    },
    {
      field: 'expression_dm',
      label: '条件表达式代码',
      helpMessage: '根据表达式名称生成',
      component: 'InputTextArea',
      required: true,
      colProps: { span: 18 },
      componentProps: {
        maxlength: 1000,
        disabled: true
      }
    },
    {
      field: 'ywqz',
      label: 'sql',
      component: 'InputTextArea',
      required: true,
      colProps: { span: 18 },
      componentProps: {
        maxlength: 1000
      }
    }, {
      field: 'priority',
      label: '优先级',
      component: 'InputNumber',
      required: true,
      colProps: { span: 18 },
      componentProps: {
        min: 1,
        max: 99,
        precision: 0,
      }
    }],
  showActionButtonGroup: false, //是否显示提交按钮
});

function watchChange(key, value) {
  if (key == 'expression_mc') {
    setFieldsValue({
      expression_dm: transformMcToDm(value)
    })
  }
}

// 垃圾反向替换 企业文化就是反向约束 每个人给到下一环节的是垃圾 然后下一环节的人帮忙找垃圾
function transformMcToDm(mcStr) {
  let temp = mcStr
  let dataList = cloneDeep(getDataSource())

  let regex = /(?<=\[).*?(?=\])/g // 把[]里面的内容提取出来
  let expArr = (mcStr || '').match(regex) || []
  console.log(expArr, dataList)
  // 遍历dataList 
  for (let i = 0; i < expArr.length; i++) {
    let expmc = expArr[i]
    let expSingleArr = []
    let ysf = ''
    if (expmc.indexOf('模糊匹配') >= 0) {
      // 有模糊匹配
      ysf = 'like'
      expSingleArr = expmc.split('模糊匹配')
    } else if (expmc.indexOf('小于等于') >= 0) {
      // 有模糊匹配
      ysf = '<='
      expSingleArr = expmc.split('小于等于')
    } else if (expmc.indexOf('不等于') >= 0) {
      // 有模糊匹配
      ysf = '!='
      expSingleArr = expmc.split('不等于')
    } else if (expmc.indexOf('大于等于') >= 0) {
      // 有模糊匹配
      ysf = '>='
      expSingleArr = expmc.split('大于等于')
    } else if (expmc.indexOf('大于') >= 0) {
      // 有模糊匹配
      ysf = '>'
      expSingleArr = expmc.split('大于')
    } else if (expmc.indexOf('小于') >= 0) {
      // 有模糊匹配
      ysf = '<'
      expSingleArr = expmc.split('小于')
    } else if (expmc.indexOf('等于') >= 0) {
      // 有模糊匹配
      ysf = '=='
      expSingleArr = expmc.split('等于')
    }
    // 切分 expSingleArr 应该就是变量名称和值的名称
    // 从dataList里面查找
    let bdsItem = dataList.find(v => {
      let { blmc, sxzmc } = v
      return blmc?.trim() == expSingleArr[0]?.trim() && sxzmc?.trim() == expSingleArr[1]?.trim()
    })

    if (bdsItem) {
      // 找到了之后，就要做替换操作了
      let { bl, blmc, lx, sxz, sxzmc, zxxs } = bdsItem
      let copyContent1 = `#{${bl}}`
      let copyContent2 = `${ysf}`
      let copyContent3 = ''
      if (ysf == 'like') {
        copyContent3 = `%${sxz}%`
      } else {
        if (lx == '数值') {
          copyContent3 = `${sxz}`
        } else {
          copyContent3 = `'${sxz}'`
        }
      }
      // 替换后的str
      let thhStr = `${copyContent1} ${copyContent2} ${copyContent3}`;
      temp = temp.replaceAll(`[${expmc}]`, thhStr)
    }
  }


  // bl: "jg_id"
  // blmc: "机构"
  // id: "aaa913d505a44c338497728eae05ec90"
  // lx: null
  // sxz: "001"
  // sxzmc: "机械工程学院"
  // ysf: "5"
  // zxxs: "下拉"

  // 需要替换的东西 blmc-变量名称、 或且替换、 ysf-运算符、 sxzmc
  // 把上面的替换成 bl             or and    

  // 变量名称替换
  temp = temp.replaceAll('或', 'or').replaceAll('且', 'and')
  return temp

}

async function handleSubmit() {
  try {
    setModalProps({ confirmLoading: true });
    const values = await validate()
    let dataList = cloneDeep(getDataSource())
    emit('success', { data: values, dataList });
    closeModal();
  } finally {
    setModalProps({ confirmLoading: false });
  }
}
</script>

<style lang="less" scoped>
.tableP {
  // height: calc(100% - 40px);
  // overflow: hidden;
  // overflow-y: auto;
}
</style>
