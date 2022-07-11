<template>
  <div class="sp-table">
    <slot name="header">
      <div class="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="header-handler"></slot>
        </div>
      </div>
    </slot>
    <el-table
      v-bind="childrenProps"
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handelSelectionChange"
    >
      <el-table-column v-if="showSelectColumn" type="selection" align="center">
      </el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        width="60"
        align="center"
      ></el-table-column>

      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :currentPage="page!.currentPage"
          :page-size="page!.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['selectionChange', 'update:page'],
  props: {
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      required: true
    },
    dataCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array as any,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      defualt: false
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    page: {
      type: Object,
      defualt: () => ({ currentPage: 0, pageSize: 10 })
    }
  },
  setup(props, { emit }) {
    const handelSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }

    //

    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    return { handelSelectionChange, handleSizeChange, handleCurrentChange }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
