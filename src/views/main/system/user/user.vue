<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="resetBtnClick"
      @searchBtnClick="searchBtnClick"
    ></page-search>

    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
      @editBtnClick="handleEditBtnClick"
      @newBtnClick="handleNewBtnClick"
    ></page-content>

    <div class="page-model">
      <page-model
        ref="pageModelRef"
        pageName="users"
        :modelConfig="modelConfigRef"
        :defaultInfo="defaultInfo"
      ></page-model>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'

import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModel } from '@/hooks/use-page-model'

import pageModel from '@/components/page-model'
import { modelConfig } from './config/model.config'

import { useStore } from '@/store'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    pageModel
  },
  setup() {
    const [pageContentRef, resetBtnClick, searchBtnClick] = usePageSearch()
    //pageModel相关hook逻辑
    //1.密码显示相关
    const newCallback = () => {
      const pwdItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      pwdItem!.isHidden = false
    }
    const editCallback = () => {
      const pwdItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      pwdItem!.isHidden = true
    }
    //2.动态添加部门 角色列表
    const store = useStore()
    //modelConfig改为响应式
    const modelConfigRef = computed(() => {
      const departmentItem = modelConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modelConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modelConfig
    })

    //3.hook获取公共变量和函数
    const [pageModelRef, defaultInfo, handleEditBtnClick, handleNewBtnClick] =
      usePageModel(newCallback, editCallback)
    return {
      searchFormConfig,
      contentTableConfig,
      resetBtnClick,
      searchBtnClick,
      pageContentRef,
      modelConfigRef,
      handleEditBtnClick,
      handleNewBtnClick,
      pageModelRef,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
