import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const IFrame = () => import('/@/views/sys/iframe/FrameBlank.vue')
const publicPath = import.meta.env.VITE_PUBLIC_PATH || '/';

const aiDemos: AppRouteModule = {
  path: '/ai-demo',
  name: 'AIDemo',
  component: LAYOUT,
  redirect: '/ai-demo/nine-grid',
  meta: {
    // hideChildrenInMenu: true,
    // icon: 'simple-icons:about-dot-me',
    title: 'AI/Demo',
    // orderNo: 100000,
  },
  children: [
    {
      path: 'nine-grid',
      name: 'nine',
      component: IFrame,
      meta: {
        title: '九宫格指标',
        // icon: 'simple-icons:about-dot-me',
        frameSrc: `${publicPath}ai/nineTag.html`
      },
    },
    {
      path: 'round',
      name: 'round',
      component: IFrame,
      meta: {
        title: '标签环绕效果',
        // icon: 'simple-icons:about-dot-me',
        frameSrc: `${publicPath}ai/tagOrbit.html`
      },
    },
    {
      path: 'condition',
      name: 'condition',
      component: IFrame,
      meta: {
        title: '条件编辑器',
        // icon: 'simple-icons:about-dot-me',
        frameSrc: `${publicPath}ai/conditionEdit.html`
      },
    },
  ],
};

export default aiDemos;
