<template>
    <section class="container pt-1 text-center">
        <div class="img-wrap m-auto mt-0 mb-2 rounded overflow-hidden position-relative">
            <CommonLoader
                v-if="imageLoading"
                position="absolute"
                :size="3" />
            <img
                :src="image"
                alt="Profile avata"
                class="w-100" />
        </div>
        <ul class="info-wrap p-0 lh-lg text-break">
            <li>
                <h1 class="name text-outline">
                    {{ name }}
                </h1>
            </li>
            <li>
                <a
                    :href="'tel:' + phone"
                    target="_blank">
                    {{ phone }}
                </a>
            </li>
            <li>
                <a
                    :href="'mailto:' + email"
                    target="_blank">
                    {{ email }}
                </a>
            </li>
            <li>
                <a
                    :href="blog"
                    target="_blank">
                    {{ blog }}
                </a>
            </li>
        </ul>
    </section>
</template>

<script setup>
import { mapState } from 'pinia'
import { useAboutStore } from '~/store/about'

const config = useRuntimeConfig()
const { BASE_URL } = config.public

const route = useRoute()
const path  = route.path

/** Nuxt: 페이지별 반응성을 유지한 SEO 메타태그 정의
 * [참고] https://nuxt.com/docs/getting-started/seo-meta#useseometa
 */
const title       = 'About Author - Nuxt3 Movie App'
const description = 'Seul Gee, Nuxt3 Movie App author'
useSeoMeta({
    title,
    description,
    ogTitle:       title,
    ogDescription: description,
    ogImage:       'https://blogpfthumb-phinf.pstatic.net/20161013_41/thwndglgkwk_1476353016081Mo1CG_PNG/avatar_profile.png',
    ogUrl:         BASE_URL + path,
})

// 스토어 세팅
const aboutStore = useAboutStore()
const { name, email, phone, blog, image } = aboutStore

// 이미지 세팅
const imageLoading = ref(true)
const { $loadImage } = useNuxtApp() // Nuxt: 플러그인 사용
await $loadImage(image)
imageLoading.value = false
</script>

<!-- <script>
import { mapState } from 'pinia'
import { useAboutStore } from '~/store/about'

export default {
    data() {
        return {
            imageLoading: true,
        }
    },
    computed: {
        ...mapState(useAboutStore, [
            'name',
            'email',
            'phone',
            'blog',
            'image',
        ]),
    },
    methods: {
        async init() {
            await this.$loadImage(this.image)
            this.imageLoading = false
        },
    },
    mounted() {
        this.init()
    },
}
</script> -->

<style lang="scss" scoped>
@keyframes _ani_floating { 100% { opacity: 1; transform: translateY(0); } }

.container{
    .img-wrap{
        width: 100%;
        max-width: 300px;
    }
    .info-wrap{
        li{
            opacity: 0;
            transform: translateY(50%);
            animation: _ani_floating 0.5s ease forwards;
            &:nth-child(1){
                animation-delay: 0s;
            }
            &:nth-child(2){
                animation-delay: 0.5s;
            }
            &:nth-child(3){
                animation-delay: 1s;
            }
            &:nth-child(4){
                animation-delay: 1.5s;
            }
            .name{
                color: transparentize($primary, 0.7);
                font-size: map-get($display-font-sizes, 1);
                font-style: italic;
                text-decoration: underline;
                -webkit-text-stroke: 1px $primary;
            }
            a{
                color: $body-color;
                text-decoration: none;
            }
        }
    }
}
</style>