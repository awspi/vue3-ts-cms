<template>
  <div class="user">
    <div class="search">
      <sp-form v-bind="searchFormConfig"></sp-form>
    </div>
    <div class="content">13</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SpForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'
export default defineComponent({
  components: {
    SpForm
  },
  name: 'user',
  setup() {
    return { searchFormConfig }
  }
})
</script>

<style scoped></style>
