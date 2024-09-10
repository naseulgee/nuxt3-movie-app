<template>
    <Headline />

    <BestMovieList />
</template>

<script>
/** Nuxt:
 * this.$store 로 접근하는게 아닌,
 * 각 스토어를 import 하여 사용한다
 * import { 내보낸 변수명 } from '~/store/스토어'
 * 사용:
 *  - 변수명().상태
 *  - 변수명().함수(매개변수)
 */
import { useMovieStore } from '~/store/movie'

export default {
    created() {
        useMovieStore().resetMovies() // 검색 내용 초기화
    },
}
</script>