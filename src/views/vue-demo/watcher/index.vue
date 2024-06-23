<template>
  <PageWrapper title="监听器用法">
    
    <div class="components-input-demo-presuffix">
      <div>computed/watch/watchEffect横向对比：下面的计算公式是：总分=平时分*0.2 + 期末分*0.8 + 附加分</div>
      <br />
      <a-input type="number" prefix="平时分：" v-model:value="score1" placeholder="请输入平时分" />
      <br />
      <br />
      <a-input type="number" prefix="期末分：" v-model:value="score2" placeholder="请输入期末分" />
      <br />
      <br />
      <a-input type="number" prefix="附加分：" v-model:value="score3" placeholder="请输入附加分" />
      <br />
      <br />
      <a-button type="primary" @click="doAdd">全体加一</a-button>
      <div>computed计算总分：{{ total1 }}</div>
      <div>watch(逐个监听)计算总分：{{ total2 }}</div>
      <div>watch(监听全部)计算总分：{{ total3 }}</div>
      <div>watchEffect(自动监听依赖)计算总分：{{ total4 }}</div>
    </div>

  </PageWrapper>


</template>
<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page';
import { Input, Button } from "ant-design-vue";
import { ref, watch, watchEffect, computed, onMounted } from "vue";
const AInput = Input;
const AButton = Button;

const score1 = ref(80);
const score2 = ref(80);
const score3 = ref(5);

function calcTotal(a, b, c) {
  return (Number(a * 0.2) || 0) + (Number(b * 0.8) || 0) + (Number(c) || 0);
}

// 用computed，可以得到计算后的值
const total1 = computed(() => {
  return calcTotal(score1.value, score2.value, score3.value);
});

const total2 = ref(0);

// 按照watch的思路，就需要逐个监听
watch(score1, val => {
  console.log("watch1");
  total2.value = calcTotal(val, score2.value, score3.value);
});
watch(score2, val => {
  console.log("watch2");
  total2.value = calcTotal(score1.value, val, score3.value);
});
watch(score3, val => {
  console.log("watch3");
  total2.value = calcTotal(score1.value, score2.value, val);
});

// watch的另一种用法，将监听的数据组合在一起
const total3 = ref(0);
watch(
  () => [score1.value, score2.value, score3.value],
  function (val) {
    console.log("执行了watch");
    total3.value = calcTotal(val[0], val[1], val[2]);
  }
);

// watchEffect 先执行，并且自动监听了依赖的数据（如果回调函数里面调用了其他函数，其他函数里也有依赖，也会被监听到）
const total4 = ref(0);
watchEffect(clean => {
  console.log("执行了watchEffect");
  total4.value = calcTotal(score1.value, score2.value, score3.value);
  // total4.value = calcTotal(score1.value, score2.value, score3.value)
  clean(() => {
    console.log("执行了clean");
  });
});

// 全体+1，合并的监听操作，不会重复执行
function doAdd() {
  score1.value = Number(score1.value) + 1;
  score2.value = Number(score2.value) + 1;
  score3.value = Number(score3.value) + 1;
}

// 如上图的例子 watchEffect和computed用法是比较类似的，都会在关联的数据发生变化时自动执行。区别在于computed返回一个明确的值，而watchEffect是处理副作用。
// 假设这里计算分数的操作需要调用接口，那就不适合computed

// 如上图的例子，刚进页面时，score1、score2、score3都没有发生变化，依旧是初始值，因此不会执行监听函数，而watchEffect会先执行监听函数

// 如上图的例子，watch和watchEffect对数据的组合发生变化时，都进行了合并操作，虽然同时变化了三个值，但回调函数都只执行了一次。

// 阅读别人的代码，看看别人是怎么用的watchEffect

// 1. props给表单的数据赋初始值（避免v-model="props.xxx"的写法造成数据来源不明确）

// 下面是头像组件，如果父组件传入了头像，就直接展示 props.value
// 然后sourceValue本身可以通过上传功能去修改

// watchEffect(() => {
//   sourceValue.value = props.value || '';
// });

// function handleUploadSuccess({ source }) {
//   sourceValue.value = source;
//   emit('change', source);
//   createMessage.success(t('component.cropper.uploadSuccess'));
// }


// 2. 写一些前端的监控逻辑 (尤其是组件库，如下例，两个属性有冲突)
// watchEffect(() => {
//   unref(isFixedHeightPage) &&
//     props.canResize &&
//     warn(
//       "'canResize' of BasicTable may not work in PageWrapper with 'fixedHeight' (especially in hot updates)",
//     );
// });

// 深度使用

// 1. watch的第三个参数 & watchEffect的第二个参数

// 2. 如何关闭监听？

// 3. watchEffect第一个参数是个函数（称作函数A），这个函数的参数也可以是个函数（函数B）。

// watchEffect(async (clean) => {
//   total4.value = await apiCalcTotal(score1.value, score2.value, score3.value)
//   clean(() => {
//     console.log('执行了clean')
//     apiCancel()
//   })
// })

// 函数B调用的时机是下一次执行watchEffect、或者被取消、被卸载

// 如上面的例子，如果在调用接口数据返回来之前再次触发了监听，那么还没完成的接口请求可以直接中止了，就类似于给watchEffect加一个防抖操作。
const scoreInput = ref({
  score1: 80,
  score2: 80,
  score3: 5
})
const total5 = ref(0)
watch(scoreInput, val => {
  total5.value = calcTotal(val.score1,  val.score2,  val.score3);
}, {
  immediate: true, // 默认false 设置成true时会立即执行一次，相当于watchEffect的默认操作
  deep: true, // 默认false 设置成true时，如果监听的是一个对象，那么它的属性值改变也会触发
  once: true, // 默认false 设置成true时，监听操作发生一次
  flush: 'post',
});


// export interface WatchOptionsBase extends DebuggerOptions {
//     flush?: 'pre' | 'post' | 'sync';
// }

// export interface WatchOptions<Immediate = boolean> extends WatchOptionsBase {
//     immediate?: Immediate;
//     deep?: boolean;
//     once?: boolean;
// }

// flush用法实例
// 如下面的代码是pageWrapper组件，getShowFooter.value控制了页面上的底部区域显示与否，redoHeight是重新计算了内容区域的高度。
// 显然，我们需要在确定footer展示或隐藏了之后，才能计算内容区域的高度。

watch(
  () => [getShowFooter.value],
  () => {
    redoHeight();
  },
  {
    flush: 'post',
    immediate: true,
  },
);

</script>

<style lang="css">
.components-input-demo-presuffix {
  width: 100%;
}
</style>
