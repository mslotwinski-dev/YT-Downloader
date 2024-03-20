<template>
  <div class="container">
    <div
      class="thumbnail"
      :style="{ 'background-image': `url(${video.thumbnailUrl})` }"
      @click="openVideo()"
    >
      <div class="text">{{ video.durationFormatted }}</div>
    </div>
    <Download ref="modal" :video="video" />

    <div class="content">
      <div class="title" @click="openVideo()">
        <div class="text" v-html="video.title" />
        <div class="icon">
          <q-icon name="fa-solid fa-download" />
        </div>
      </div>

      <div class="views">
        {{ formatNumber(Number(video.views)) }} views
        <div class="dot">•</div>
        {{ video.uploadedAt }}
      </div>

      <div class="channel">
        <img :name="video.channel.name" :src="video.channel.thumbnailUrl" />
        <div v-html="video.channel?.name" />
      </div>

      <!-- <Progress
          videoId="{video.id!}"
          width="100%"
          marginTop="3"
          flexShrink="{0}"
        /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Video from '../../types/video'
import Download from './Download.vue'
import { formatNumber } from '../../utils/index'

export default defineComponent({
  props: {
    video: Video,
  },
  components: { Download },
  methods: {
    formatNumber,
    openVideo() {
      const modal = this.$refs.modal as InstanceType<typeof Download>
      if (modal) modal.toggleModal()
    },
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  cursor: pointer;
}

.thumbnail {
  width: 300px;
  height: 187.5px;
  flex-shrink: 0;
  overflow: hidden;
  margin-right: 4px;
  border-radius: 10px;
  background-color: $gray;
  transition: width 0.6s;
  position: relative;
  background-size: cover;
  .text {
    background: #28353a88;
    width: 50px;
    font-weight: bold;
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 15px;
    border-radius: 10px 0 0 0;
    padding: 2px 5px;
    text-align: center;
  }
}

.content {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  flex-grow: 1;
}

.title {
  font-weight: 500;
  font-size: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon {
    font-size: 20px;
  }
}

.views {
  display: flex;
  padding-bottom: 5px;
  .dot {
    margin: 0 8px;
  }
}

.channel {
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
    width: 30px;
    margin-right: 5px;
  }
}
</style>
