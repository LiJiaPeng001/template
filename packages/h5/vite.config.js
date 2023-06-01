import { resolve } from 'node:path'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'

 
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

function getEnvVariable(mode) {
  return loadEnv(mode, process.cwd())
}

export default ({ mode }) => {
  const env = getEnvVariable(mode)
  return defineConfig({
    base: './', // 基础路径
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    plugins: [
      VueRouter({
        routesFolder: './src/views',
        importMode: 'async',
        dts: './typed-router.d.ts',
      }),
      vue({
        script: {
          defineModel: true,
        },
      }),
      components({
        resolvers: [VantResolver()],
      }),
      autoImport({
        imports: [
          'vue',
          VueRouterAutoImports,
          '@vueuse/core',
          {
            vant: ['showoast'],
            vue: ['defineModel'],
          },
        ],
        eslintrc: {
          enabled: true, // Default `false`
        },
        dirs: ['./src/composables', './src/store'],
        vueTemplate: true,
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${resolve(__dirname, './src/style/variable.less')}";`,
        },
      },
    },
    server: {
      port: 3901,
      host: '0.0.0.0',
      proxy: {
        '^/api*': env.VITE_APP_REQUESTURL,
      },
    },
    build: {
      reportCompressedSize: false,
      sourcemap: env.mode === 'test',
    },
  })
}
