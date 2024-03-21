<template>
  <div class="background" v-if="display">
    <div class="bgclick" @click="toggleModal" />
    <section class="modal" :class="`size_${size}`">
      <div class="content">
        <!--  -->
        <div class="nav">
          <div class="text">
            <q-icon name="fa-solid fa-download" /> Download
          </div>
          <div class="close" @click="toggleModal">
            <q-icon name="fa-solid fa-times" />
          </div>
        </div>

        <div
          class="thumbnail"
          :style="{ 'background-image': `url(${video.thumbnailUrl})` }"
        />

        <div class="title" v-html="video.title" />

        <div class="buttons">
          <!-- <q-btn class="button" @click="downloadaudio(video.url, video.title)">
            <q-icon name="fa-solid fa-download" /> Audio
          </q-btn> -->
          <q-btn class="button" @click="download(video.url, video.title)">
            <q-icon name="fa-solid fa-download" /> Video
          </q-btn>
        </div>

        <!--  -->
        <div class="progress">
          <div
            :id="
              'bar-' + video.url.replace('https://www.youtube.com/watch?v=', '')
            "
            class="bar"
          />
        </div>

        <div>
          Time left:
          <div
            :id="
              'timeleft-' +
              video.url.replace('https://www.youtube.com/watch?v=', '')
            "
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Video from 'src/types/video'

export default defineComponent({
  props: {
    video: Video,
  },
  data() {
    return {
      display: false,
    }
  },
  methods: {
    toggleModal() {
      this.display = !this.display
    },
    download(url, title) {
      window.myWindowAPI?.download(url, title)
    },
    downloadaudio(url, title) {
      window.myWindowAPI?.downloadaudio(url, title)
    },
  },
})
</script>

<style lang="scss" scoped>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 9;
  background: #1b2023a0;
  backdrop-filter: blur(3.5px);
}
.modal {
  width: 500px;
  background: $bg;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.close {
  font-size: 20px;
  cursor: pointer;
}

.content {
  width: 100%;
  flex-grow: 1;
  background: $bg;

  border-radius: 20px;
  padding: 10px 30px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;

  &.nopadding {
    padding: 0px;
  }
}
.bgclick {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}

.thumbnail {
  width: 400px;
  height: 250px;
  border-radius: 10px;
  background-color: $gray;
  background-size: cover;
}

.nav {
  display: flex;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.title {
  font-weight: 500;
  margin: 10px;
  text-align: center;
}

.progress {
  width: 100%;
  margin-top: 15px;
  height: 20px;
  padding: 2px;
  border-radius: 5px;
  background: $black;
  .bar {
    display: block;
    width: 100%;
    height: 100%;
    background: $main;
    border-radius: 5px;
  }
}

.buttons {
  display: flex;
  .button {
    font-size: 15px;
    padding: 5px 10px;
    background: $rose;
    border-radius: 5px;
    font-weight: 500;
  }
}
</style>
