<template>
    <CommonHeader />

    <main>
        <!-- NOTE: 레이아웃 컴포넌트를 호출한 부분에서 내부에 작성한 컴포넌트가 전달되어 그려진다. -->
        <slot></slot>
    </main>

    <CommonFooter />
</template>

<!-- Nuxt:
    Nuxt는 이 디렉토리에 있는 모든 구성 요소를 자동으로 가져오기 때문에 특별히 컴포넌트를 등록할 필요가 없음.
    components 폴더 하위에 존재하는 컴포넌트일 경우 경로+컴포넌트 명 으로 바로 사용 가능하다.
-->
<!-- <script>
import MainHeader from "~/components/common/Header"
import MainFooter from "~/components/common/Footer"

export default {
    components: {
        MainHeader,
        MainFooter,
    }
}
</script> -->

<!-- NOTE: 전역으로 적용되어야 하기 때문에 scoped를 명시하지 않는다. -->
<style lang="scss">
body {
    main {
        min-height: $vh-HF;
        padding-top: $headerH;
        box-sizing: content-box;
    }
}
/* [MO] =================== */
@include media-breakpoint-down(md){
    body {
        main {
            min-height: $vh-HF;
            padding-top: 0;
        }
        footer{
            padding-bottom: $headerH;
        }
    }
}
</style>