// Nuxt: process.env 가 아닌 useRuntimeConfig 를 이용하여 환경변수를 가져온다
const config = useRuntimeConfig()
const { OMDB_API_KEY } = config.public

export default defineEventHandler(async (event) => {
    // Nuxt: readBody, readParam 을 이용하여 전달된 데이터를 object 형식으로 바로 읽을 수 있다
    const payload = await readBody(event)
    // console.log(event)
    // console.log(event.req)
    // console.log(event.req.method)
    // console.log(payload) // 브라우저 콘솔이 아닌 터미널에서 출력된다

    // [참고] https://www.omdbapi.com/
    const { title, type, year, page, id } = payload
    const url = id
        ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
        : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

    /** NOTE: 함수 자체가 비동기로 동작되기 때문에,
     * - Promise 객체가 아닌 try-catch 로 처리
     * - resolve, reject 대신 statusCode 로 결과 전달
    */
    try {
        const res = await $fetch(url) // Nuxt: useAsyncData 쓰면 오류남
        // 상태코드 200 이나, 에러인 경우 처리
        if(res.Error) {
            // Nuxt: createError 가 아닌 setResponseStatus 로 전달해야 호출하는 $fetch.catch 에 잘 잡힘
            return setResponseStatus(event, 400, res.Error)
        }
        return res
    } catch ({ message }) {
        // message 형태: [POST] "url": 코드3자리 오류메세지
        const removeUrl = message.split(': ')[1]
        const statusCode = removeUrl.slice(0, 3)
        const errMsg = removeUrl.slice(4)
        return setResponseStatus(event, statusCode, errMsg)
    }
})