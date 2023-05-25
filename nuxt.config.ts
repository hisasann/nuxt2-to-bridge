import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  bridge: {
    // 大事なことだが nuxi を使うなら nitro は必須になるので、ここは false にはできない
    // https://github.com/nuxt/bridge/issues/486#issuecomment-1224010833
    // nuxi start is not compatible with a non-nitro project. If you are not building a nitro server, you should use nuxt-start directly.
    // nitro: false,
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt2-to-bridge',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    // '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // prefetch 対応には意味がなかった
  hooks: {
    // build: {
    //   manifest: (manifest) => {
    //     // ここは動かない
    //   }
    // }
    'build:manifest': (manifest) => {
      // ここは動く
      for (const key in manifest) {
        // or other logic
        manifest[key].dynamicImports = [];
        manifest[key].imports = [];
      }
      const keysToRemove = []

      for (const key in manifest) {
        const file = manifest[key]

        if (file.assets) {
          file.assets = file.assets
            .filter(
              (asset: string) =>
                !asset.endsWith('.webp') &&
                !asset.endsWith('.jpg') &&
                !asset.endsWith('.png')
            )
        }
      }
    }
  },

  // prefetch 対応には意味がなかった
  render: {
    bundleRenderer: {
      shouldPrefetch: () => false,
      shouldPreload: () => false,
    },
  },

  // prefetch 対応には意味がなかった
  router: {
    prefetchLinks: false
  },

  // prefetch 対応には意味がなかった
  features: {
    clientPrefetch: false,
  },
})
