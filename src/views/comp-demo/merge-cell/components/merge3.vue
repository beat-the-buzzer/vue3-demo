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



function getColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'num',
      title: '人数',
    },
    {
      dataIndex: 'sort',
      title: '排名',
    },
    {
      dataIndex: 'rate',
      title: '比例',
    }
  ];
}

const [register, { setTableData }] = useTable({
    columns: getColumns(),
    showIndexColumn: false
  });

  onMounted(() => {
    setTableData([])
  })

</script>


<style lang="css">
</style>
