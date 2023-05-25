import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup(options, nuxt) {
    // ここは nuxt3 からじゃないと動かない
    console.log('call modules/buildOptions.js setup!')
  },
});
