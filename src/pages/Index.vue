<template>
  <div class="home">
    <Search />
    <List />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Search from '@/components/Search.vue'
import List from '@/components/Videos/List.vue'

export default defineComponent({
  components: { Search, List },
})
</script>

<style lang="scss" scoped>
.home {
  width: 1000px;
  margin: auto;
  padding: 10px;
}
</style>
