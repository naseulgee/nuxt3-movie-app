<template>
    <!-- Nuxt:
        routes 설정의 meta 정보가 아닌,
        각 페이지의 definePageMeta 의 layout 정보로 레이아웃 컴포넌트가 그려진다.
        component 로 동적 컴포넌트 사용도 가능하나 레이아웃용으로는 적합하지 않다.
    -->
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <!-- Vue:
        routes/index.js 에서 meta 에 설정한 레이아웃 컴포넌트가 그려진다.
        지정한 값이 없을 경우 BasicLayout 레이아웃 컴포넌트가 그려진다.
        레이아웃 컴포넌트의 slot 부분으로 routes/index.js 에서 설정한 주소에 일치하는 컴포넌트가 그려진다.
    -- >
    <component :is="$route.meta.layout || 'BasicLayout'">
        <RouterView />
    </component> -->
</template>

<script setup>
import metaImg from '@/images/common/meta-img.jpg'

const config = useRuntimeConfig()
const { BASE_URL } = config.public

console.log(metaImg)
/** Nuxt: 페이지별 반응성을 유지한 SEO 메타태그 정의
 * [참고] https://nuxt.com/docs/getting-started/seo-meta#useseometa
 */
const title       = 'Nuxt3 Movie App'
const description = 'The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.'
useSeoMeta({
    title,
    description,
    ogTitle:       title,
    ogDescription: description,
    ogImage:       BASE_URL + metaImg,
    ogUrl:         BASE_URL,
})
</script>