<template>
  <Bar />
  <div class="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Bar from '@/components/Bar.vue'

export default defineComponent({
  components: { Bar },
})
</script>
<style lang="scss" scoped>
.app {
  height: calc(100vh - 80px);
  margin: 20px 0;
  overflow-y: scroll;
}
</style>
