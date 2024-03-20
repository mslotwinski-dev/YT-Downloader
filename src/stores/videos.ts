import { defineStore } from 'pinia'
import Video from '../types/video'

export const useVideoStore = defineStore('counter', {
  state: () => ({
    videos: [] as Video[],
  }),

  getters: {
    getVideos(state) {
      return state.videos
    },
  },

  actions: {
    setVideos(newVideos: Video[]) {
      this.videos = newVideos
    },
  },
})
