import { configure } from 'quasar/wrappers'
import path from 'path'

export default configure((/* ctx */) => {
  return {
    eslint: {
      warnings: true,
      errors: true,
    },
    boot: ['i18n', 'axios'],
    css: ['app.scss'],
    extras: ['fontawesome-v6', 'roboto-font', 'material-icons'],

    build: {
      vueRouterMode: 'hash',
      chainWebpack(chain) {
        chain.resolve.alias.set('@', path.resolve(__dirname, './src'))
      },

      esbuildTarget: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },
    },

    devServer: {
      server: {
        type: 'http',
      },
      open: true,
    },

    framework: {
      config: {},

      plugins: [],
    },

    animations: [],

    ssr: {
      prodPort: 3000,

      middlewares: ['render'],

      pwa: false,
    },

    pwa: {
      workboxMode: 'GenerateSW',
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      preloadScripts: ['electron-preload'],

      inspectPort: 5858,

      bundler: 'packager',

      packager: {},

      builder: {
        appId: 'yt-downloader',
      },
    },

    bex: {
      contentScripts: ['my-content-script'],
    },
  }
})
