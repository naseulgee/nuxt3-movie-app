/** NOTE: store 를 이용하여 상태를 관리하는 모듈 파일
 * [참고] https://vuex.vuejs.org/
 * [참고] https://lodash.com/docs/4.17.15
 * 내보내지는 모듈 -> index.js 플러그인 에서 사용된다.
 */
// Nuxt: vuex 대신 pinia 사용
// import { defineStore } from 'pinia' // nuxt.config.ts 에서 자동으로 import 해주도록 설정함
// import { createStore } from 'vuex'
// Nuxt: axios 대신 내장 함수 useFetch 사용
// import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

// 내부 변수 선언
const _defaultMessage = 'Search for the movie title!'

// Nuxt: state, getters, actions 는 this 로 접근 가능하다 -> 매개변수에서 제거
export const useMovieStore = defineStore('movie', {
    state: () => ({
        movies    : [],
        message   : _defaultMessage,
        loading   : false,
        theMovie  : {},
        bestMovies: [],
    }),
    getters: {
    },
    actions: { // Nuxt: mutations 와 actions 가 합쳐졌다
        // mutations
        resetMovies() {
            this.movies = []
            this.message = _defaultMessage
            this.loading = false
        },
        updateState(payload) {
            for (const key in payload) {
                this[key] = payload[key]
            }
        },

        // actions
        // 영화 목록 검색
        async searchMovies(payload) {
            try {
                // 로딩 상태일 경우 반복 요청 방지
                if(this.loading) return

                this.updateState({
                    message: 'Loading...',
                    loading: true,
                })

                const res = await _fetchMovie({
                    ...payload,
                    page: 1
                })
                const { Search }       = res.data
                let   { totalResults } = res.data
                if(typeof totalResults != 'number') totalResults = parseInt(totalResults, 10)

                this.updateState({
                    // 갱신할 데이터 : 전달할 데이터
                    movies: _uniqBy(Search, 'imdbID'), // 중복된 값 처리. 원래는 서버에서 처리해서 넘겨주는 것이 좋다.
                })

                // 페이징 처리
                const pageLength = Math.ceil(totalResults / 10) // api 요청이 한번에 10개 까지만 됨으로
                // 페이지가 더 있다면 추가 요청
                if(pageLength > 1) {
                    for (let page = 2; page <= pageLength; page++) {
                        // 최대 출력 갯수 이상이면 종료
                        if (page > payload.maxCnt / 10) break

                        const res = await _fetchMovie({
                            ...payload,
                            page
                        })
                        const { Search } = res.data

                        this.updateState({
                            movies: _uniqBy([ ...this.movies, ...Search ], 'imdbID')
                        })
                    }
                }

                this.updateState({
                    message: '',
                    loading: false,
                })
            } catch ({ message }) {
                console.log(message)
                this.updateState({
                    message,
                    movies: [],
                    loading: false,
                })
            }
        },
        // 영화 상세 정보
        async searchMovieWithId(payload){
            try {
                if(this.loading) return

                this.updateState({
                    theMovie: {}, // 기존 영화 정보 비워주기
                    loading: true,
                })

                const res = await _fetchMovie(payload)
                this.updateState({
                    theMovie: res.data
                })
            } catch (error) {
                console.log(error)
                this.updateState({
                    theMovie: {},
                })
            } finally {
                this.updateState({
                    loading: false,
                })
            }
        },
        // Best 영화 목록
        async setBestMovies(payload){
            try {
                if(this.loading) return
                if(this.bestMovies.length > 0) return
                if(payload.ids == null || payload.ids.length == 0) return
                this.updateState({
                    loading: true,
                })

                for (let i = 0; i < payload.ids.length; i++) {
                    const res = await _fetchMovie({
                        id: payload.ids[i]
                    })
                    this.updateState({
                        bestMovies: [
                            ...this.bestMovies,
                            res.data,
                        ]
                    })
                }
            } catch (error) {
                console.log(error)
                this.updateState({
                    bestMovies: [],
                })
            } finally {
                this.updateState({
                    loading: false,
                })
            }
        },
    },
})

// 내부에서만 사용한다는 의미로 함수명 앞에 언더바(_) 추가
async function _fetchMovie(payload) {
    // API KEY 를 포함하여 요청하는 로직은 서버리스 함수로 이동
    // Nuxt: axios 대신 내장 함수 사용
    // Nuxt: useFetch 사용 시 다중 요청 시 요청을 중복처리하여 값이 덮어씌워짐
    // Nuxt: useAsyncData 사용 시 키값을 설정하여 요청을 분리할 수 있으나, 사용하면 안되는 곳에서 사용했다고 오류남
    // const { data, pending, error } = await useAsyncData('_fetchMovie'+id, () => $fetch('/api/movie', {
    //     method: 'post',
    //     body: payload,
    //     lazy: true,
    // }))
    // return { data: toRaw(data.value) }
    return await $fetch('/api/movie', {
        method: 'post',
        body: payload,
    }).then(res => {
        return { data: res }
    }).catch(({ statusMessage }) => {
        throw createError({
            message: statusMessage,
        })
    })
    // return await axios.post('/.netlify/functions/movie', payload)
}