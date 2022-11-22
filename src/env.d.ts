/// <reference types="vite/client" />
// 解决找不到模块“xxx.vue”或其相应的类型声明。ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}


