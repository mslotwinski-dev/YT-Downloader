<template>
  dasdasdasd
  <VideoItem :key="video" v-for="video in videos" :video="video" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VideoItem from './VideoItem.vue'
import { useVideoStore } from 'stores/videos'

export default defineComponent({
  components: { VideoItem },
  data() {
    return {
      videoStore: useVideoStore(),
      videos: useVideoStore().getVideos,
    }
  },
  mounted() {
    this.videoStore.$subscribe(() => {
      this.videos = useVideoStore().getVideos
    })
  },
})
</script>

<style lang="scss" scoped></style>
