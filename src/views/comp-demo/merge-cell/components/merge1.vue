<template>
  <div>
    <BasicTable @register="register">
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
import { InputNumber } from "ant-design-vue";
import { ref, watch, watchEffect, computed, onMounted } from "vue";
import { BasicTable, useTable, TableAction } from '/@/components/Table/index';
import { BasicColumn } from '/@/components/Table/index';
import { useMessage } from '/@/hooks/web/useMessage';
const { createMessage } = useMessage();

var sum = (maxVal, result) => {
  if (maxVal == 0) {
    return result
  } else {
    result = result + maxVal
    return sum(maxVal - 1, result)
  }
}

const columns: BasicColumn[] =
  [
    {
      dataIndex: 'num',
      title: '小组人数',
      customRender: ({ text, index }) => {
        let rowSpan = 1
        if (index == sum(text - 1, 0)) {
          rowSpan = text
        } else {
          rowSpan = 0
        }
        return {
          children: text,
          props: {
            rowSpan
          }
        }
      },
    },
    {
      dataIndex: 'sort',
      title: '排名',
      
    },
    {
      dataIndex: 'rate',
      title: '分数比例',
    }
  ];


const [register, { setTableData }] = useTable({
  columns,
  showIndexColumn: false
});

onMounted(() => {
  setTableData([{
    num: 1,
    sort: 1,
    rate: '100%'
  }, {
    num: 2,
    sort: 1,
    rate: '70%'
  }, {
    num: 2,
    sort: 2,
    rate: '30%'
  }, {
    num: 3,
    sort: 1,
    rate: '50%'
  }, {
    num: 3,
    sort: 2,
    rate: '30%'
  }, {
    num: 3,
    sort: 3,
    rate: '20%'
  }])
})

</script>


<style lang="css"></style>
