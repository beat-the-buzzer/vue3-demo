import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';


const dashboard: AppRouteModule = {
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
      path: 'mergeCell',
      name: 'mergeCell',
      component: () => import('/@/views/comp-demo/merge-cell/index.vue'),
      meta: {
        title: '表格合并',
        // icon: 'simple-icons:about-dot-me',
        // hideMenu: true,
      },
    },
  ],
};

export default dashboard;
