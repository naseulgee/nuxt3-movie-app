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
const config = useRuntimeConfig()
const { BASE_URL } = config.public

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
    ogImage:       'https://prod-files-secure.s3.us-west-2.amazonaws.com/cd1ea652-8842-4428-9875-0ded17d5e194/3f2b66d3-ad90-46ba-8d0c-a98e8f185fde/web_mockup.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240911%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240911T115833Z&X-Amz-Expires=3600&X-Amz-Signature=cb30def518cf934b1c7f784d3d79c5c601fcff747bd5c04cf0847bb008fe5844&X-Amz-SignedHeaders=host&x-id=GetObject',
    ogUrl:         BASE_URL,
})
</script>