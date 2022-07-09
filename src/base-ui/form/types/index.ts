type IFomrType = 'input' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
  field: string
  type: IFomrType
  label: string
  rules?: any[]
  placeHolder?: any
  //针对slect
  options?: any[]
  //针对特殊属性
  otherOptions?: any
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
