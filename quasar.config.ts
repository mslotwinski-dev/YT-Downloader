import { configure } from 'quasar/wrappers'
import path from 'path'

export default configure((/* ctx */) => {
  return {
    eslint: {
      // fix: true,
      // include: [],
      // exclude: [],
      // cache: false,
      // rawEsbuildEslintOptions: {},
      // rawWebpackEslintPluginOptions: {},
      warnings: true,
      errors: true,
    },
    // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-webpack/boot-files
    boot: ['i18n', 'axios'],

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
    css: ['app.scss'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v7',
      'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-build
    build: {
      // publicPath: '/',
      vueRouterMode: 'hash', // available values: 'hash', 'history'
      // resolve: {
      //   alias: {
      //     '@': path.resolve(__dirname, 'src/'),
      //     '>>': path.resolve(__dirname, 'public/'),
      //   },
      // },
      // webpackTranspile: false,

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "webpackTranspile" is set to true.
      // webpackTranspileDependencies: [],

      chainWebpack(chain) {
        chain.resolve.alias.set('@', path.resolve(__dirname, './src'))
      },

      esbuildTarget: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },

      // rtl: true, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://v2.quasar.dev/quasar-cli-webpack/handling-webpack
      // "chain" is a webpack-chain object https://github.com/sorrycc/webpack-chain
      // chainWebpack (/* chain, { isClient, isServer } */) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-devServer
    devServer: {
      server: {
        type: 'http',
      },
      open: true, // opens browser window automatically
    },

    framework: {
      config: {},

      plugins: [],
    },

    animations: [],

    ssr: {
      prodPort: 3000, // The default port that the production server should use

      middlewares: [
        'render', // keep this as last one
      ],

      pwa: false,
    },

    pwa: {
      workboxMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
    },

    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      preloadScripts: ['electron-preload'],

      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

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
