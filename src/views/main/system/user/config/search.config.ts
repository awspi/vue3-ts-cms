import { IForm } from '@/base-ui/form/types'
export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'ID',
      rules: [],
      placeHolder: '请输入id'
    },
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      rules: [],
      placeHolder: '请输入用户名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      rules: [],
      placeHolder: '请输入密码'
    },
    {
      field: 'sport',
      type: 'select',
      label: '运动',
      rules: [],
      placeHolder: '请选择喜欢的运动',
      options: [
        { label: '篮球', value: 'basketball' },
        { label: '篮球', value: 'basketball' },
        { label: '篮球', value: 'basketball' },
        { label: '篮球', value: 'basketball' }
      ]
    },
    {
      field: 'createtime',
      type: 'datepicker',
      label: '创建时间',
      rules: [],
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  itemStyle: {
    padding: '10px 30px'
  },
  labelWidth: '80px',
  colLayout: {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  }
}
