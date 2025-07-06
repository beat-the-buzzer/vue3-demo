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

const colums = [{
  dataIndex: 'line1',
}, {
  dataIndex: 'line2',
}, {
  dataIndex: 'line3',
}, {
  dataIndex: 'line4',
}, {
  dataIndex: 'line5',
}]

function getColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'line1',
      title: '第一列',
      customRender: ({ text, index, record }) => {
        var span = getColSpan(colums, record)
        // return span[3]
        console.log('span', span)
        return {
          children: text,
          props: span[0]
        }
      },
    },
    {
      dataIndex: 'line2',
      title: '第二列',
      customRender: ({ text, index, record }) => {
        var span = getColSpan(colums, record)
        // return span[3]
        return {
          children: text,
          props: span[1]
        }
      },
    
    },
    {
      dataIndex: 'line3',
      title: '第三列',
      customRender: ({ text, index, record }) => {
        var span = getColSpan(colums, record)
        // return span[3]
        return {
          children: text,
          props: span[2]
        }
      },
    
    },
    {
      dataIndex: 'line4',
      title: '第四列',
      customRender: ({ text, index, record }) => {
        var span = getColSpan(colums, record)
        // return span[3]
        return {
          children: text,
          props: span[3]
        }
      },
    },
    {
      dataIndex: 'line5',
      title: '第五列',
      defaultHidden: true,
      
    }
  ];
}

// 输入：行数据，列
function getColSpan(colums, dataObj) {
  // console.log(colums, dataObj)
  let arr = colums.map(v => {
    return {
      key: v.dataIndex,
      value: dataObj[v.dataIndex]
    }
  })

  console.log('arr', arr)

  var merged = arr.map((val, i) => {
    
    // 与前后都不相等，就返回1
    // 与前面一位相等，就返回0
    // 与后面一位相等，就继续往后找，返回找到的长度
    let v = val.value
    let prev
    let next

    if (i != 0) {
      prev = arr[i - 1].value
    }
    if (i != arr.length - 1) {
      next = arr[i + 1].value
    }
    console.log(v, i, prev, next)
    // 当前这个和前后都不一样
    if (v != prev && v != next) {
      return {
        colSpan: 1
      }
    } else if (v == prev) {
      return {
        colSpan: 0
      }
    } else {
      let temp = v
      let j = i
      while (v == temp) {
        j = j + 1
        temp = arr[j].value // 超出就是null了
      }
      return {
        colSpan: j - i
      }
    }
  })

  console.log(merged)

  return merged
}


const [register, { setTableData, setColumns }] = useTable({
  columns: [],
  showIndexColumn: false,
  bordered: true,
  immediate: false
});


onMounted(async () => {
  let columnsArr = getColumns()
  await setColumns(columnsArr)

  setTableData([
      {
      line1: 2,
      line2: 2,
      line3: 3,
      line4: 2,
      line5: '',
    }, {
      line1: 1,
      line2: 2,
      line3: 2,
      line4: 3,
      line5: '',
    }, {
      line1: 1,
      line2: 2,
      line3: 3,
      line4: 4,
      line5: '',
    }, 
    {
      line1: 2,
      line2: 3,
      line3: 3,
      line4: 3,
      line5: '',
    }])
})

</script>


<style lang="css"></style>
