import { rmSync } from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-electron-plugin'
import { customStart, loadViteEnv } from 'vite-electron-plugin/plugin'
import renderer from 'vite-plugin-electron-renderer'
import pkg from './package.json'
import { resolve } from 'path';
rmSync('dist-electron', { recursive: true, force: true })
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }), // Enabled by default
    electron({
      include: ['electron'],
      transformOptions: {
        sourcemap: !!process.env.VSCODE_DEBUG,
      },
      plugins: [
        ...(process.env.VSCODE_DEBUG
          ? [
            // Will start Electron via VSCode Debug
            customStart(debounce(() => console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App'))),
          ]
          : []),
          // Allow use `import.meta.env.VITE_SOME_KEY` in Electron-Main
        loadViteEnv(),
      ],
    }),
    // Use Node.js API in the Renderer-process
    renderer({
      nodeIntegration: false,
      optimizeDeps: {
        include: [
          // 'fs/promises',
          // 'process',
        ],
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: "views",
        replacement: resolve(__dirname, "src/views"),
      },
      {
        find: "assets",
        replacement: resolve(__dirname, "assets")
      },
      {
        find: "config",
        replacement: resolve(__dirname, "config"),
      },
      {
        find: "components",
        replacement: resolve(__dirname, "src/components")
      },
      {
        find: "utils",
        replacement: resolve(__dirname, "src/utils")
      }
    ]

  },
  server: process.env.VSCODE_DEBUG ? (() => {
    const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
    return {
      host: url.hostname,
      port: +url.port,
    }
  })() : undefined,
  clearScreen: false,
  build: {
    assetsDir: '', // #287
  },
})

function debounce<Fn extends (...args: any[]) => void>(fn: Fn, delay = 299) {
  let t: NodeJS.Timeout
  return ((...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), delay)
  }) as Fn
}
