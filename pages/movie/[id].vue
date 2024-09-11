<template>
    <section class="container pt-1">
        <template v-if="loading">
            <CommonLoader
                position="fixed"
                :z-index="1"
                :size="5" />
            <div class="skeletons info-wrap d-flex flex-wrap justify-content-between">
                <div class="skeleton poster"></div>
                <ul class="specs p-0">
                    <li class="skeleton title"></li>
                    <li class="skeleton labels"></li>
                    <li class="skeleton plot"></li>
                    <li class="skeleton etc"></li>
                    <li class="skeleton etc"></li>
                    <li class="skeleton etc"></li>
                </ul>
            </div>
        </template>
        <div
            v-else
            class="info-wrap d-flex flex-wrap justify-content-between">
            <div
                class="poster mx-auto rounded-3 position-relative"
                
                :class="{'noImage': noImage}"
                :style="{backgroundImage: `url(${reqDiffSizeImage(theMovie.Poster)})`}">
                <CommonLoader
                    v-if="imageLoading"
                    position="absolute"
                    :size="3" />
            </div>
            <ul class="specs p-0">
                <li class="title my-1">
                    <h1 class="m-0 fw-bold">
                        {{ theMovie.Title }}
                    </h1>
                </li>
                <li class="labels hand-writing text-black-50">
                    <span>{{ theMovie.Released }}, </span>
                    <span>{{ theMovie.Runtime }}, </span>
                    <span>{{ theMovie.Country }}</span>
                </li>
                <li class="plot mb-3 fs-5">
                    {{ theMovie.Plot }}
                </li>
                <li class="etc">
                    <h3 class="mt-2 mb-0">
                        Ratings
                    </h3>
                    <ul class="rating-wrap d-flex flex-wrap align-items-center p-0 text-black-50">
                        <li
                            v-for="{ Source: name, Value: score } in theMovie.Ratings"
                            :key="name"
                            class="rating m-0 align-middle">
                            <img
                                :src="ratingImages[name]"
                                :alt="name"
                                class="me-1" />
                            <span>{{ score }}</span>
                        </li>
                    </ul>
                </li>
                <li class="etc">
                    <h3 class="mt-2 mb-0">
                        Actors
                    </h3>
                    <p class="text-black-50">
                        {{ theMovie.Actors }}
                    </p>
                </li>
                <li class="etc">
                    <h3 class="mt-2 mb-0">
                        Director
                    </h3>
                    <p class="text-black-50">
                        {{ theMovie.Director }}
                    </p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
import { useMovieStore } from '~/store/movie'
import { filename } from 'pathe/utils'

const config = useRuntimeConfig()
const { BASE_URL } = config.public

const route = useRoute()
const path  = route.path

// 영화 정보
const movieStore = useMovieStore()
await movieStore.searchMovieWithId({
    id : route.params.id // routes/index.js 에서 설정한 콜론(:) 뒤 동적 파라미터 변수명
})
const { loading, theMovie } = movieStore

/** Nuxt: 페이지별 반응성을 유지한 SEO 메타태그 정의
 * [참고] https://nuxt.com/docs/getting-started/seo-meta#useseometa
 */
const title       = `Movie:: ${theMovie.Title} - Nuxt3 Movie App`
const description = theMovie.Plot
useSeoMeta({
    title,
    description,
    ogTitle:       title,
    ogDescription: description,
    ogImage:       theMovie.Poster,
    ogUrl:         BASE_URL + path,
})

// images
const imageLoading = ref(true)
const noImage      = ref(false)
// Nuxt: require 사용 불가로 Vite 에서 제공하는 import.meta.glob 를 통해 이미지 전부 불러오기
const ratingImages = computed(() => {
    const imgList = import.meta.glob('@/images/movie/*.png', { eager: true })
    return Object.fromEntries(
        Object.entries(imgList).map(([key, value]) => [filename(key), value.default])
    )
})
function reqDiffSizeImage(url, size = 700) {
    if(!url || url == 'N/A') { // url 이 없으면 404 이미지
        imageLoading.value = false
        noImage.value = true
        return ''
    }
    // Nuxt: 플러그인 사용 방식 변경
    const { $loadImage } = useNuxtApp()
    // 사이즈 변환
    let src = url.replace('SX300', 'SX' + size)

    /** NOTE: 이미지 로딩 여부와 관련 없이 src 값이 반환되어야 함으로,
     * await 가 아닌 then 을 사용하여 별개의 로직으로 실행시켜야 한다.
    */
    $loadImage(src)
        .then(() => { // 메모리상 이미지가 로딩이 완료될 때 까지 대기 후
            noImage.value = false
        })
        .catch(error => { // 이미지가 없는 경우 예외처리
            console.error(error)
            noImage.value = true
        })
        .finally(() => {
            imageLoading.value = false // 로딩 종료
        })
    return src // 대기와 상관 없이 사이즈 변환 주소 리턴
}
</script>

<style lang="scss" scoped>
.container{
    .info-wrap{
        gap: 50px;
        .poster{
            $posterW: 550px;
            flex-shrink: 0;
            width: $posterW;
            height: calc($posterW * 3 / 2);
            background: var(--bs-gray-200) no-repeat center/cover;
            &.noImage{
                background-image: url(@/images/common/404-img.jpg) !important;
            }
        }
        .specs{
            flex-grow: 1;
            width: min-content;
            li{
                margin-bottom: 20px;
                .rating-wrap{
                    gap: 20px;
                    .rating{
                        img{
                            height: 30px;
                        }
                    }
                }
            }
        }
    }
    .skeletons{
        .skeleton{
            display: block;
            border-radius: 10px;
            background-color: $gray-200;
            &.title{
                width: 80%;
                height: 70px;
            }
            &.labels{
                width: 60%;
                height: 30px;
            }
            &.plot{
                width: 100%;
                height: 250px;
            }
            &.etc{
                width: 50%;
                height: 50px;
            }
        }
    }
}
/* [MO] =================== */
@include media-breakpoint-down(md){
    .container{
        .info-wrap{
            gap: 30px;
            .poster{
                width: 100%;
                height: $vh-HF;
            }
            .specs{
                width: 100%;
                li{
                    margin-bottom: 10px;
                }
            }
        }
    }
}
</style>