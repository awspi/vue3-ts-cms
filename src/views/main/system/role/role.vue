<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewBtnClick"
      @editBtnClick="handleEditBtnClick"
    ></page-content>
    <page-model
      ref="pageModelRef"
      :modelConfig="modelConfig"
      pageName="role"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import pageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'

import pageModel from '@/components/page-model'
import { modelConfig } from './config/model.config'

import { usePageModel } from '@/hooks/use-page-model'

import { useStore } from '@/store'

import { getMenuLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

export default defineComponent({
  components: {
    pageContent,
    PageSearch,
    pageModel
  },
  name: 'role',
  setup() {
    //处理paegModel的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leftKeys = getMenuLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leftKeys, false)
      })
    }
    const [pageModelRef, defaultInfo, handleEditBtnClick, handleNewBtnClick] =
      usePageModel(undefined, editCallback)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      contentTableConfig,
      searchFormConfig,
      modelConfig,
      pageModelRef,
      defaultInfo,
      handleEditBtnClick,
      handleNewBtnClick,
      menus,
      handleCheckChange,
      otherInfo,
      elTreeRef
    }
  }
})
</script>

<style scoped></style>
