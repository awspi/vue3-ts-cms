<template>
  <div class="page-contetnt">
    <sp-table
      :listData="dataList"
      :dataCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
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

      <!-- <template #footer> </template> -->

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

      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </sp-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
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

    //1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => getPageData())
    //2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    //3.从vuex中获取数据
    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    // const userCount = computed(() => store.state.system.userCount)
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )
    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    return { dataList, getPageData, dataCount, pageInfo, otherPropSlots }
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
