<template>
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="resetBtnClick"
      @searchBtnClick="searchBtnClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      ref="pageContentRef"
    >
      <template #image="scope">
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.imgUrl"
          fit="cover"
          :preview-src-list="[scope.row.imgUrl, scope.row.imgUrl]"
          preview-teleported="true"
        />
      </template>
      <template #oldPrice="scope">
        {{ '¥' + scope.row.oldPrice }}
      </template>
      <template #newPrice="scope">
        {{ '¥' + scope.row.newPrice }}
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'

import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
  name: 'goods',
  components: { PageSearch, PageContent },
  setup() {
    const [pageContentRef, resetBtnClick, searchBtnClick] = usePageSearch()
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      resetBtnClick,
      searchBtnClick
    }
  }
})
</script>

<style scoped></style>
