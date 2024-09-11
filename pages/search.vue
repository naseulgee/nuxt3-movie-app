<template>
    <SearchForm />
    <MovieList />
</template>

<script setup>
const config = useRuntimeConfig()
const { BASE_URL } = config.public

const route = useRoute()
const path  = route.path

/** Nuxt: 페이지별 반응성을 유지한 SEO 메타태그 정의
 * [참고] https://nuxt.com/docs/getting-started/seo-meta#useseometa
 */
const title       = 'Search Movies - Nuxt3 Movie App'
const description = 'Search for the movie title!'
useSeoMeta({
    title,
    description,
    ogTitle:       title,
    ogDescription: description,
    // ogImage:       '',
    ogUrl:         BASE_URL + path,
})
</script>