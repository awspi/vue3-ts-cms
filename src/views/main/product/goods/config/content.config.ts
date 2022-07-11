export const contentTableConfig = {
  title: '商品列表',
  propList: [
    { prop: 'name', label: '商品名', minWidth: 250 },
    {
      prop: 'oldPrice',
      label: '原价',
      minWidth: 80,
      slotName: 'oldPrice'
    },
    {
      prop: 'newPrice',
      label: '现价',
      minWidth: 80,
      slotName: 'newPrice'
    },
    {
      prop: 'imgUrl',
      label: '商品图片',
      minWidth: 100,
      slotName: 'image'
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
    },
    { label: '操作', minWidth: '120', slotName: 'handle' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
