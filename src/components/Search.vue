<template>
  <form class="container" @submit.prevent="doSearch()">
    <input v-model="query" spellcheck="false" />
    <button class="button" :class="{ loading }">
      <q-icon name="fa-solid fa-search" v-if="!loading" />
      <div class="loader" v-else />
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import YouTube from 'youtube-sr'
import Video from '../types/video'
import { useVideoStore } from 'stores/videos'

export default defineComponent({
  data() {
    return {
      query: '',
      videos: [] as Video[],
      loading: false,
      videoStore: useVideoStore(),
    }
  },
  methods: {
    async doSearch() {
      const newVideos: Video[] = []

      try {
        if (this.query) {
          this.loading = true

          if (YouTube.validate(this.query, 'VIDEO')) {
            const video = new Video(await YouTube.getVideo(this.query))
            newVideos.push(video)
          } else {
            const videos = (
              await YouTube.search(this.query, { type: 'video' })
            ).map((video) => new Video(video))
            newVideos.push(...videos)
          }
        }
      } catch (err) {
        console.log({
          title: 'Error',
          description:
            'An error occurred while fetching your query, please try again',
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
        console.error(err)
      } finally {
        this.setVideos(newVideos)
      }
    },

    setVideos(newVideos: Video[]) {
      this.loading = false
      this.videos = newVideos
      this.videoStore.setVideos(newVideos)
    },
  },
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  margin: 30px 0;
  input {
    background: transparent !important;
    border: 1px solid $dark;
    flex-grow: 1;
    border-radius: 5px;
    padding: 0 5px;
    color: $light;

    &:focus {
      border: 1px solid $rose;
      box-shadow: 0 0 7px $rose;
    }
  }
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 35px;
    margin-left: 10px;
    background: $rose;
    color: $light;
    border-radius: 5px;
    font-size: 16px;
    &.loading {
      opacity: 0.5;
    }
  }
}

.loader {
  width: 18px;
  height: 18px;
  border: 2px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
