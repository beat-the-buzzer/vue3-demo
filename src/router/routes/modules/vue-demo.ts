import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';


const dashboard: AppRouteModule = {
  path: '/vue-demo',
  name: 'VueDemo',
  component: LAYOUT,
  redirect: '/vue-demo/watcher',
  meta: {
    // hideChildrenInMenu: true,
    // icon: 'simple-icons:about-dot-me',
    title: 'Vue例子',
    // orderNo: 100000,
  },
  children: [
    {
      path: 'watcher',
      name: 'Watcher',
      component: () => import('/@/views/vue-demo/watcher/index.vue'),
      meta: {
        title: '监听器',
        // icon: 'simple-icons:about-dot-me',
        // hideMenu: true,
      },
    },
    {
      path: 'hooks',
      name: 'hooks',
      component: () => import('/@/views/vue-demo/hooks/index.vue'),
      meta: {
        title: 'hooks',
        // icon: 'simple-icons:about-dot-me',
        // hideMenu: true,
      },
    },
    {
      path: 'useful',
      name: 'Useful',
      component: () => import('/@/views/vue-demo/useful/index.vue'),
      meta: {
        title: 'vue有用的方法',
        // icon: 'simple-icons:about-dot-me',
        // hideMenu: true,
      },
    },
  ],
};

export default dashboard;
