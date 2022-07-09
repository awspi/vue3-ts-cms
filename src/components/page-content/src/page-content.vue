<template>
  <div class="page-contetnt">
    <sp-table :listData="dataList" v-bind="contentTableConfig">
      <!-- header中的插槽 -->
      <template #header-handler>
        <el-button type="primary">
          <el-icon><Finished /></el-icon>
          新建用户
        </el-button>
        <el-button>
          <el-icon><Refresh /> </el-icon>
          刷新
        </el-button>
      </template>

      <template #footer>
        <el-pagination
          v-model:currentPage="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </template>
      <!-- //columon中的插槽 -->
      <template #status="scope">
        <el-button
          :type="scope.row.enable ? 'success' : 'danger'"
          plain
          size="small"
        >
          {{ scope.row.enable ? '正常' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handle>
        <div class="handle-btns">
          <el-link size="small" type="primary">编辑</el-link>
          <el-link size="small" type="danger">删除</el-link>
        </div>
      </template>
      <!-- <template #header>1</template>
        <template #footer>2</template> -->
    </sp-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import spTable from '@/base-ui/table'
import { useStore } from '@/store'
export default defineComponent({
  components: {
    spTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    // const userCount = computed(() => store.state.system.userCount)

    return { dataList }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
.handle-btns {
  display: flex;
  justify-content: space-evenly;
}
</style>
