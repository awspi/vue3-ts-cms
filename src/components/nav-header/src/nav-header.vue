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
    <spBreadcrumb :breadcrumbs="breadcrumbs"></spBreadcrumb>
    <user-info></user-info>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import userInfo from './user-info.vue'
import spBreadcrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
    userInfo,
    spBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFold = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    const store = useStore()

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return { isFold, handleFold, breadcrumbs }
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
