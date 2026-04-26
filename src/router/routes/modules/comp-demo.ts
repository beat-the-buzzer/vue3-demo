import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';


const compDemo: AppRouteModule = {
  path: '/comp-demo',
  name: 'CompDemo',
  component: LAYOUT,
  redirect: '/comp-demo/mind-map',
  meta: {
    // hideChildrenInMenu: true,
    // icon: 'simple-icons:about-dot-me',
    title: '组件/Demo',
    // orderNo: 100000,
  },
  children: [
    {
      path: 'mind-map',
      name: 'MindMap',
      component: () => import('/@/views/comp-demo/mind-map/index.vue'),
      meta: {
        title: '思维导图',
        // icon: 'simple-icons:about-dot-me',
        // hideMenu: true,
      },
    },
    {
      path: 'bpmn',
      name: 'BPMN',
      component: () => import('/@/views/comp-demo/bpmn/index.vue'),
      meta: {
        title: '流程图',
        // icon: 'simple-icons:about-dot-me',
        // hideMenu: true,
      },
    },
    {
      path: 'preview',
      name: 'Preview',
      component: () => import('/@/views/comp-demo/preview/index.vue'),
      meta: {
        title: '预览',
        // icon: 'simple-icons:about-dot-me',
        // hideMenu: true,
      },
    },
    {
      path: 'files',
      name: 'Files',
      component: () => import('/@/views/comp-demo/files/index.vue'),
      meta: {
        title: '前端文件',
        // icon: 'simple-icons:about-dot-me',
        // hideMenu: true,
      },
    },
    {
      path: 'merge-cell',
      name: 'mergeCell',
      component: () => import('/@/views/comp-demo/merge-cell/index.vue'),
      meta: {
        title: '表格合并',
        // icon: 'simple-icons:about-dot-me',
        // hideMenu: true,
      },
    },
    {
      path: 'highcharts-3d-pie',
      name: 'highcharts-3d-pie',
      component: () => import('/@/views/comp-demo/highcharts-3d-pie/index.vue'),
      meta: {
        title: '3D饼图',
        // icon: 'simple-icons:about-dot-me',
        // hideMenu: true,
      },
    },
  ],
};

export default compDemo;
