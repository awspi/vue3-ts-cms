<template>
  <div class="nav-header"></div>
  <template v-if="!isFold">
    <el-icon :size="20" class="arrow-icon" @click="handleFold">
      <DArrowLeft /> </el-icon
  ></template>
  <template v-else>
    <el-icon :size="20" class="arrow-icon" @click="handleFold">
      <DArrowRight />
    </el-icon>
  </template>
  <div class="content">
    <div>1</div>
    <user-info></user-info>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import userInfo from './user-info.vue'
export default defineComponent({
  components: {
    userInfo
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFold = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return { isFold, handleFold }
  }
})
</script>

<style scoped lang="less">
.arrow-icon {
  cursor: pointer;
}
.nav-header {
  display: flex;
  justify-content: space-between;
}
.content {
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding: 0 20px;
}
</style>
