import { defineStore } from 'pinia'
import Video from '../types/video'

export const useVideoStore = defineStore('counter', {
  state: () => ({
    videos: [] as Video[],
    timeleft: {
      'Papież Pedał Dzieci Jebał (Ona By Tak Chciała Remix)': 22,
    } as { [key: string]: number },
  }),

  getters: {
    getVideos(state) {
      return state.videos
    },
    getTimeLeft(state) {
      return state.timeleft
    },
  },

  actions: {
    setVideos(newVideos: Video[]) {
      this.videos = newVideos
    },
    setTimeLeft(title: string, time: number) {
      this.timeleft[title] = time
    },
  },
})
