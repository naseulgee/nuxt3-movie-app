import { library, config } from '@fortawesome/fontawesome-svg-core'
// fontawesome 컴포넌트
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// fontawesome 사용할 아이콘 명시
import { fas } from "@fortawesome/free-solid-svg-icons" // 전체 아이콘 등록
import { far } from "@fortawesome/free-regular-svg-icons"
library.add(fas, far);

config.autoAddCss = false // Nuxt: 자동 추가가 아닌 nuxt.config.ts 에 별도 등록이 필요하다

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})