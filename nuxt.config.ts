// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: [
        '@pinia/nuxt', // store
        '@vesp/nuxt-fontawesome',
    ],
    pinia: { // `defineStore` 를 자동으로 import 해줌
        storesDirs: [
            './stores/**'
        ],
    },
    alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./assets', import.meta.url)),
    },
    runtimeConfig: { // 환경변수 키 등록. .env 에 명시된 NUXT_ 를 제외하고 변수명: '' 로 입력 시 자동 등록된다.
        // 클라이언트측에서 사용할 키 등록. .env 에 명시된 NUXT_PUBLIC_ 를 제외하고 변수명: '' 로 입력 시 자동 등록된다.
        public: {
            OMDB_API_KEY: ''
        }
    },
    app: {
        // index.html
        head: {
            title: 'Nuxt3 Movie App',
            htmlAttrs: {
                lang: 'en'
            },
            // config 에 정의한 것은 반응형 데이터를 제공하지 않아 App.vue 파일에 useHead 로 선언함
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport'               , content: 'width=device-width, initial-scale=1.0' },
                { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
                { property: 'description'        , content: 'The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.' },
                { property: 'og:type'            , content: 'website' },
                { property: 'og:site_name'       , content: 'Nuxt3 Movie App' },
                { property: 'og:title'           , content: 'Nuxt3 Movie App' },
                { property: 'og:description'     , content: 'The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.' },
                // { property: 'og:image'           , content: '' },
                // { property: 'og:url'             , content: '' },
            ],
            script: [
            ],
            link: [
                { rel: 'icon'      , href: '/favicon.ico', type: 'image/x-icon' },
                { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css' }
            ],
        }
    },
    build: {
        transpile: [
            '@fortawesome/vue-fontawesome', // fontawesome 을 사용하기 위한 등록
        ]
    },
    // webpack.config.js
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "~/assets/scss/main.scss";'
                }
            }
        }
    },
    // .postcssrc.js
    postcss: {
        plugins: {
            autoprefixer: {},
        },
    },
})