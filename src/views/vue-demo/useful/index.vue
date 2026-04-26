<template>
  <PageWrapper title="Vue3实用方法">
    <div class="components-input-demo-presuffix">
      <div>shallowRef和shallowReactive</div>
    </div>

  </PageWrapper>


</template>
<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page';
import { Input, Button } from "ant-design-vue";
import { ref, computed, onMounted } from "vue";
const AInput = Input;
const AButton = Button;


</script>

<style lang="css">
.components-input-demo-presuffix {
  width: 100%;
}
</style>
