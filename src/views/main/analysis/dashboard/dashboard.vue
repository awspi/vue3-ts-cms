<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7"
        ><sp-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart> </sp-card
      ></el-col>
      <el-col :span="10"
        ><sp-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart> </sp-card
      ></el-col>
      <el-col :span="7"
        ><sp-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart> </sp-card
      ></el-col>
    </el-row>
    <el-row :gutter="10" style="padding-top: 10px">
      <el-col :span="12"
        ><sp-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart> </sp-card
      ></el-col>
      <el-col :span="12"
        ><sp-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart> </sp-card
      ></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import spCard from '@/base-ui/card'
import { useStore } from 'vuex'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  MapEchart
} from '@/components/page-echarts'
export default defineComponent({
  name: 'dashboard',
  components: {
    spCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    //请求数据
    store.dispatch('dashboard/getDashboardDataAction')
    // 获取数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { title: '鼠标可缩放', xLabels, values }
    })
    //地图
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped></style>
