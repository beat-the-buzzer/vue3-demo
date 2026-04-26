<template>
  <div ref="chartRef" class="demo-container"></div>
</template>

<script setup>
  import { onMounted, onUnmounted, watch, ref } from 'vue';
  import Highcharts from 'highcharts';
  import 'highcharts/highcharts-3d';

  Highcharts.setOptions({
    lang: {
      // 数字格式化（避免 locale 错误的核心配置）
      decimalPoint: '.', // 小数点符号
      thousandsSep: ',', // 千分位符号
      // 图表相关文本（可选，根据需要添加）
      downloadPNG: '下载 PNG',
      downloadJPEG: '下载 JPEG',
      downloadPDF: '下载 PDF',
      downloadSVG: '下载 SVG',
      printChart: '打印图表',
    },
    global: {
      useUTC: false, // 禁用 UTC 时间（避免时间格式化问题）
      timezoneOffset: new Date().getTimezoneOffset(), // 使用本地时区
    },
  });


  const props = defineProps({
    dataList: {
      type: Array,
      required: false,
      // 数据格式示例：[{ name: '优秀', y: 6.3, color: '#8662df' }, ...]
      validator: (value) => {
        return value.every(
          (item) => typeof item === 'object' && 'name' in item && 'y' in item && 'color' in item,
        );
      },
      default: () => ([
        { name: '优秀', y: 6.3, color: '#8662df' },
        { name: '良好', y: 2.3, color: '#4583eb' },
        { name: '中等', y: 2.3, color: '#5bd3ca' },
        { name: '及格', y: 9.3, color: '#cdb27e' },
        { name: '不及格', y: 2.0, color: '#fa6c46' },
      ]),
    },
  });




  const chartRef = ref(null);
  let chartInstance = null;


  const getChartOptions = (data) => ({
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 60,
        beta: 0,
        depth: 40,
        viewDistance: 25,
      },
    },
    title: { text: '' },
    subtitle: { text: '' },
    legend: { enabled: false },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 6,
      padding: 10,
      shadow: true,
      formatter: function () {
        return `${this.point.name}：${this.point.y}，占比: ${(
          ((this.point.y / this.point.total) * 100) || 0).toFixed(1)}%`;
      },
      useHTML: true,
      style: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        color: '#333',
        fontWeight: 'bold',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        size: 150,
        depth: 40,
        borderWidth: 4,
        borderColor: '#fff',
        shadow: {
          color: 'rgba(0, 0, 0, 0.3)',
          width: 8,
          offsetX: 2,
          offsetY: 2,
        },
        innerSize: '60%', // 甜甜圈内径
        dataLabels: {
          enabled: true,
          distance: 30,
          color: '#333',
          style: {
            textOutline: 'none',
            fontSize: '12px',
            fontWeight: 'bold',
          },
          formatter: function () {
            return `${this.point.name}`;
          },
        },
      },
    },
    credits: { enabled: false },
    series: [
      {
        type: 'pie',
        data: data, // 使用传入的data
        startAngle: 0,
      },
    ],
  });


  // 初始化图表
  const initChart = () => {
    if (chartRef.value && !chartInstance) {
      chartInstance = Highcharts.chart(chartRef.value, getChartOptions(props.dataList));
    }
  };


  // 更新图表数据（数据变化时调用）
  const updateChart = (newData) => {
    if (chartInstance) {
      chartInstance.series[0].setData(newData, true); // 第二个参数true表示重绘图表
    }
  };

  onMounted(initChart);

  onUnmounted(() => {
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  });


  watch(
    () => props.dataList,
    (newData, oldData) => {
      if (newData !== oldData) {
        updateChart(newData);
      }
    },
    { deep: true },
  );
</script>


<style lang="less" scoped>
  .chart-title {
    color: #000000;
    font-size: 16px;
    line-height: normal;
    letter-spacing: 0px;
    text-align: center;
    padding: 6px 0;
  }


  .demo-container {
    width: 100%;
    height: 180px;
    box-sizing: border-box;
  }
</style>
