<template>
  <PageWrapper title="思维导图组件">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1"><a-button type="default" @click="doQuery">重置数据</a-button>
          <a-button type="primary" @click="
            addNodeByParentId([exampleData.nodeData], 'root', {
              type: 'country',
              name: '俄罗斯',
              score: 80,
            })
            ">点击新增俄罗斯</a-button>
          <a-button type="primary" @click="
            editNodeById(exampleData.nodeData, '1-2', {
              score: '100',
            })
            ">点击修改上海的分数</a-button>
          <a-button type="default" danger @click="deleteNodeById(exampleData.nodeData, '2-1')">点击删除广岛</a-button> </span>
      </div>
    </template>
    <div style="position: relative;">
      <div class="how-to-use">
        <div>通过 Tab 或 Enter 键增加子节点；</div>
        <div>通过 Delete 键删除选中的节点以及子节点；</div>
        <div>通过 双击编辑节点；</div>
        <div>通过 鼠标滚轮 ＋ Shift 进行左右滚动；</div>
        <div>通过 鼠标滚轮 进行上下滚动。</div>
      </div>
      <tiny-mind-map ref="mindmap" class="demo-mind-map-event" :options="options" @create="onCreate"
        @operation="onOperation" @afterImport="onAfterImport" v-model="exampleData" />
    </div>
  </PageWrapper>
</template>

<script setup>
import { PageWrapper } from '/@/components/Page';
import { MindMap as TinyMindMap } from '@opentiny/vue';
import { ref, reactive, nextTick, createVNode, unref, onMounted, onUnmounted, h, createApp } from 'vue';
import { Modal, Button } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import OptBtn from './OptBtn.vue'
import { useMessage } from '/@/hooks/web/useMessage';
const { createMessage } = useMessage();
const AButton = Button
const getInitData = () => [
  {
    topic: '中国(100分)',
    id: '1',
    type: 'country',
    name: '中国',
    score: 100,
    children: [
      {
        topic: '北京(100分)',
        id: '1-1',
        type: 'city',
        name: '北京',
        score: 100,
      },
      {
        topic: '上海(99分)',
        id: '1-2',
        type: 'city',
        name: '上海',
        score: 99,
      },
    ],
  },
  {
    topic: '日本(-100分)',
    id: '2',
    type: 'country',
    name: '日本',
    score: -100,
    children: [
      {
        topic: '广岛(-100分)',
        id: '2-1',
        type: 'city',
        name: '广岛',
        score: -100,
      },
      {
        topic: '长崎(-100分)',
        id: '2-2',
        type: 'city',
        name: '长崎',
        score: -100,
      },
    ],
  },
];

// 需要加删除按钮的数据
const deletedArr = [
  {
    topic: '广岛(-100分)',
    id: '2-1',
    type: 'city',
    name: '广岛',
    score: -100,
  },
  {
    topic: '长崎(-100分)',
    id: '2-2',
    type: 'city',
    name: '长崎',
    score: -100,
  }
]

// 需要加编辑按钮的数据
const editArr = [
  {
    topic: '北京(100分)',
    id: '1-1',
    type: 'city',
    name: '北京',
    score: 100,
  },
  {
    topic: '上海(99分)',
    id: '1-2',
    type: 'city',
    name: '上海',
    score: 99,
  }
]

function doQuery() {
  exampleData.value.nodeData.children = getInitData();
}

const mindmap = ref(null);
const D = ref(null);

const options = {
  draggable: false,
  editable: true,
  keypress: false,
};

const exampleData = ref({
  nodeData: {
    id: 'root',
    topic: '根节点',
    type: 'root',
    root: true,
    children: getInitData(),
  },
});

function bindKeyEvent(event) {
  if (event.key === 'Tab' || event.key === 'Enter') {
    addNode();
  } else if (event.key === 'Delete') {
    deleteNode();
  }
}

let ids = []

const onAfterImport = () => {
  // 原生JS新增的按钮
  for (let i = 0; i < deletedArr.length; i++) {
    createOptBtn(deletedArr[i]);
  }

  // vue生成的按钮
  ids = []
  for (let j = 0; j < editArr.length; j++) {
    createVueOptBtn(editArr[j]);
  }
};

function createVueOptBtn(dataObj) {
  let dom = D.value.findEle(dataObj.id, D.value)

  const comp = h(OptBtn, {
    ref: dataObj.id,
    dataObj: dataObj,
    onSuccess: handleSuccess // 不加on就是属性，加on就是事件
  })
  if (!ids.includes(dataObj.id)) {
    console.log('执行')
    createApp(comp).mount(dom)
    ids.push(dataObj.id)
  }
}

// 根据id 新增dom结构
function createOptBtn({ id }) {
  let dom = D.value.findEle(id, D.value);
  let btn = document.querySelector('btn-' + id);
  // 如果已经有这个节点，就直接修改节点的内容
  if (btn) {
    btn.setAttribute('class', 'btn-del');
    btn.innerText = '删除'
  } else {
    // 否则，就新增一个节点
    btn = document.createElement('div');
    btn.setAttribute('id', 'btn-' + id);
    btn.setAttribute('class', 'btn-del');
    btn.innerText = '删除'
    dom.appendChild(btn);
  }
}

// 按钮绑定点击事件的处理方式
function bindBtnClick(e) {
  e.preventDefault()
  if (e.target.className == 'btn-del') {
    let id = e.target.getAttribute('id')
    doDel(id)
  }
}

onMounted(() => {
  document.addEventListener('keydown', bindKeyEvent);
  document.addEventListener('click', bindBtnClick);
});

onUnmounted(() => {
  document.removeEventListener('keydown', bindKeyEvent);
  document.removeEventListener('click', bindBtnClick);
});

function addNode() {
  let curr = getSelectedNode();
  if (curr) {
    let type = curr.type;
    if (type == 'city') {
      createMessage.error('不允许在这个节点下新增子节点');
    } else {
      handleAdd(curr);
    }
  }
}

function deleteNode() {
  let curr = getSelectedNode();
  if (curr) {
    let type = curr.type;
    if (type == 'root') {
      createMessage.error('该节点不允许删除');
    } else {
      Modal.confirm({
        content: '选中的节点和子节点会被删除，确定吗？',
        icon: createVNode(ExclamationCircleOutlined),
        async onOk() {
          doDel(curr.id);
        },
        onCancel() { },
      });
    }
  }
}

function getSelectedNode() {
  if (D && D.value && D.value.currentNode) {
    return D.value.currentNode.nodeObj;
  }
  return null;
}

const onCreate = (e) => {
  D.value = e;
};

// 编辑功能
const onOperation = ({ info, render }) => {
  if (info.name == 'beginEdit') {
    if (info.obj.type == 'root') {
    } else {
      handleEdit(info.obj);
    }
  }
};

// 新增
function handleAdd(node) {
  // console.log(node.id, node.type)
  createMessage.success(
    `选中的是根节点，就是新增国家；选中的是国家，就是新增城市。弹出输入框，输入国家或城市、分数。调用接口在id为${node.id}的节点下新增节点，然后重新查询页面`,
  );
}

/**编辑 */
function handleEdit(node) {
  console.log(node);
  createMessage.success(
    `根据选中节点的类型弹出编辑框进行修改，调用修改的接口成功之后重新查询页面。`,
  );
}

// 删除
async function doDel(id) {
  createMessage.success(`调用接口删除id为${id}的数据，删除后重新查询页面`);
}

// 弹窗操作之后的回调
function handleSuccess() {
  doQuery();
}

// 关键点在于：不使用组件自带的方法去对DOM进行改动，而是通过调用接口的方式去修改数据，再去更新数据，从而更新页面。

// 模拟后端删除接口
function deleteNodeById(parentNode, id) {
  if (!parentNode || !parentNode.children) return false;
  const node = parentNode.children.find((v) => v.id === id); // 根据id寻找到了节点
  if (node) {
    // 删除节点
    parentNode.children = parentNode.children.filter((v) => v.id != id);
    return true;
  }
  // 递归搜索子节点
  for (let i = 0; i < parentNode.children.length; i++) {
    if (deleteNodeById(parentNode.children[i], id)) {
      return true;
    }
  }
  return false;
}

// 模拟后端新增接口
function addNodeByParentId(parentNode, id, dataObj) {
  if (!parentNode) return false;
  const node = parentNode.find((v) => v.id === id); // 根据id寻找到了节点
  if (node) {
    // 新增子节点
    node.children = (node.children || []).concat({
      ...dataObj, // type: 'city',   name: '长崎', score: -100, id: 3
      topic: `${dataObj.name}(${dataObj.score})`,
      id: '3', // 后端生成的唯一值
    });
    return true;
  }
  // 递归搜索子节点
  for (let i = 0; i < parentNode.children.length; i++) {
    if (addNodeByParentId(parentNode.children[i], id, dataObj)) {
      return true;
    }
  }
  return false;
}

// 模拟后端编辑接口
function editNodeById(parentNode, id, dataObj) {
  if (!parentNode || !parentNode.children) return false;
  const index = parentNode.children.findIndex((v) => v.id === id); // 根据id寻找到了节点
  if (index !== -1) {
    // 修改节点的数据
    parentNode.children[index] = {
      ...parentNode.children[index],
      ...dataObj,
      topic: `${parentNode.children[index].name}(${dataObj.score})`,
    };
    return true;
  }
  // 递归搜索子节点
  for (let i = 0; i < parentNode.children.length; i++) {
    if (editNodeById(parentNode.children[i], id, dataObj)) {
      return true;
    }
  }
  return false;
}
</script>

<style lang="less" scoped>
.how-to-use {
  position: absolute;
  top: 40px;
  left: 40px;
  z-index: 999;
  line-height: 20px;
}

.demo-mind-map-event {
  width: 100%;
  height: 800px;
}
</style>

<style lang="less">
.btn-del {
  color: @error-color;
  position: absolute;
  right: -36px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  pointer-events: auto !important;
}
</style>
