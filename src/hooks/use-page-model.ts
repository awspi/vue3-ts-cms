import { ref } from 'vue'
import pageModel from '@/components/page-model'

type CallbackFn = () => void

export function usePageModel(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModelRef = ref<InstanceType<typeof pageModel>>()
  const defaultInfo = ref({})

  const handleEditBtnClick = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    editCb && editCb()
  }
  const handleNewBtnClick = () => {
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  return [pageModelRef, defaultInfo, handleEditBtnClick, handleNewBtnClick]
}
