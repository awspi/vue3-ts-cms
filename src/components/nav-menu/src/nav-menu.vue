<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Admin</span>
    </div>

    <el-menu
      class="el-menu"
      default-active="1-1"
      text-color="#b5bbc0"
      :collapse="collapse"
      :collapse-transition="false"
    >
      <template v-for="(item, index) in userMenus" :key="item.id">
        <!-- 一级菜单 -->
        <el-sub-menu class="el-submenu" :index="index + 1 + ''">
          <template #title>
            <el-icon><Tools /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <!-- 二级菜单 -->
          <template
            v-for="(subitem, indexx) in item.children"
            :key="subitem.id"
          >
            <el-menu-item
              class="el-menu-item"
              :index="index + 1 + '-' + (indexx + 1)"
            >
              <span>{{ subitem.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      deault: false
    }
  },
  setup() {
    const store = useStore()
    const userMenus = store.state.login.userMenus

    const icons = ['<el-icon><Aim /></el-icon>']
    return { userMenus, icons }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
