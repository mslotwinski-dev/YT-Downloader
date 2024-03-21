import { contextBridge } from 'electron'
import { BrowserWindow } from '@electron/remote'

import path from 'path'
import os from 'os'
import fs from 'fs'

import ytdl from 'ytdl-core'
import ffmpeg from 'fluent-ffmpeg'

import { formatTimeLeft } from 'src/utils/'

// import Video from 'src/types/video'

// import { useVideoStore } from 'src/stores/videos'

contextBridge.exposeInMainWorld('myWindowAPI', {
  minimize() {
    BrowserWindow.getFocusedWindow()!.minimize()
  },

  toggleMaximize() {
    const win = BrowserWindow.getFocusedWindow()

    if (win!.isMaximized()) {
      win!.unmaximize()
    } else {
      win!.maximize()
    }
  },

  close() {
    BrowserWindow.getFocusedWindow()!.close()
  },

  download(url: string, title: string) {
    const output = path.resolve(
      path.join(os.homedir(), 'Desktop'),
      title + '.mp4'
    )

    const video = ytdl(url, {quality: 'lowest'})

    const id = url.replace('https://www.youtube.com/watch?v=', '')

    let starttime = Date.now()
    video.pipe(fs.createWriteStream(output))
    video.once('response', () => {
      starttime = Date.now()
    })

    video.on('progress', (chunkLength, downloaded, total) => {
      const percent = downloaded / total
      const downloadedMinutes = (Date.now() - starttime) / 1000
      const estimatedDownloadTime =
        downloadedMinutes / percent - downloadedMinutes
      document.getElementById('bar-' + id)!.style.width =
        String(100 * percent) + '%'
      document.getElementById('timeleft-' + id)!.innerHTML = formatTimeLeft(
        estimatedDownloadTime
      )
    })
    video.on('end', () => {
      document.getElementById('bar-' + id)!.style.backgroundColor = '#a50034'
      document.getElementById('timeleft-' + id)!.innerHTML = 'Completed!'
    })
  },

  downloadaudio(url: string, title: string) {

    const output = path.resolve(
      path.join(os.homedir(), 'Desktop'),
      title + '.mp3'
    )

    const id = url.replace('https://www.youtube.com/watch?v=', '')

    const video = ytdl(url, {
      quality: 'highestaudio',
    })


    const starttime = Date.now()

    ffmpeg(video)
      .audioBitrate(128)
      .save(output)
      .on('progress', (chunkLength, downloaded, total) => {
        const percent = downloaded / total
        const downloadedMinutes = (Date.now() - starttime) / 1000
        const estimatedDownloadTime =
          downloadedMinutes / percent - downloadedMinutes
        document.getElementById('bar-' + id)!.style.width =
          String(100 * percent) + '%'
        document.getElementById('timeleft-' + id)!.innerHTML = formatTimeLeft(
          estimatedDownloadTime
        )
      })
      .on('end', () => {
        document.getElementById('bar-' + id)!.style.backgroundColor = '#a50034'
        document.getElementById('timeleft-' + id)!.innerHTML = 'Completed!'
      })
  },
})
