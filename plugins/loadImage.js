/** NOTE: 커스텀 플러그인 파일 생성
 * [참고] https://v3-docs.vuejs-korea.org/guide/reusability/plugins
 * 
 * 자주 사용하는 기능들을 플러그인으로 만든다
 * 플러그인 등록은 main.js 에서 use로 한다
 * 
 * app.config.globalProperties: 앱 내부의 모든 컴포넌트 인스턴스에서 접근할 수 있는 ★전역 속성
 *  - $함수명: 사용 시 호출할 함수명
 *      - 사용: this.$함수명(매개변수)
 */
export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            loadImage: src => {
                return new Promise((resolve, reject) => {
                    // Nuxt: document는 웹 브라우저에서만 활용 가능한 객체임으로 서버 사이드 렌더링 중에는 아래 코드가 동작하지 않도록 예외처리를 해준다
                    if(process.server) return resolve()

                    // 메모리상 이미지 요소 생성 (DOM에 출력 안함)
                    const img = document.createElement('img')
                    img.src = src // 실제 이미지 주소 세팅

                    // 실제 이미지 경로의 이미지가 준비 완료되면 콜백함수 실행
                    img.addEventListener('load', () => {
                        // 완료됨 외부로 전달
                        return resolve()
                    })
                    img.addEventListener('error', () => {
                        // 이미지 로드 실패 외부로 전달
                        return reject(`No Image :: [${src}]`)
                    })
                })
            }
        }
    }
})