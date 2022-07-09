<template>
  <div class="page-search">
    <sp-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-button">
          <el-button @click="handleResetClick">重置</el-button>
          <el-button type="primary">搜索</el-button>
        </div>
      </template>
    </sp-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import spForm from '@/base-ui/form'
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    spForm
  },
  setup(props) {
    //双向绑定的属性 由 配置文件的field决定
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    //handleResetClick
    const handleResetClick = () => {
      formData.value = formOriginData
    }
    return { formData, handleResetClick }
  }
})
</script>

<style scoped>
.handle-button {
  text-align: right;
  padding: 20px 50px;
}
</style>
