<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <div class="content">
      <sp-table :listData="userList" :propList="propList">
        <template #status="scope">
          <el-button>{{ scope.row.enable ? '正常' : '禁用' }}</el-button>
        </template>
      </sp-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
import SpTable from '@/base-ui/table'

import { useStore } from '@/store'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    SpTable
  },
  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    const propList = [
      { prop: 'name', label: '用户名', minWidth: 80, slotName: 'createAt' },
      {
        prop: 'realname',
        label: '真实姓名',
        minWidth: 100,
        slotName: 'realname'
      },
      {
        prop: 'cellphone',
        label: '手机号码',
        minWidth: 150,
        slotName: 'cellphone'
      },
      { prop: 'enable', label: '状态', minWidth: 100, slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: 210,
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: 210,
        slotName: 'updateAt'
      }
    ]

    return { searchFormConfig, userList, propList }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
