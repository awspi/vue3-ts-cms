import { IForm } from '@/base-ui/form'
export const modelConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      rules: [],
      placeHolder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      rules: [],
      placeHolder: '请输入角色介绍'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {
    padding: '10px 30px'
  },
  labelWidth: '80px'
}
