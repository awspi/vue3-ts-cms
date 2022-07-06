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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
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

<style scoped>
.arrow-icon {
  cursor: pointer;
}
</style>
