<script setup lang="ts">
/* Import modules. */
import * as fflate from 'fflate'

/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

const route = useRoute()

const REVEAL_TIMEOUT = 7000
const PLAY_DELAY = 500
const SCROLL_TOP_MARGIN = 85

const isShowingMenu = ref(false)
const isRevealed = ref(false)

const imgCoverSrc = ref(null)
const imgRevealSrc = ref(null)
const slug = ref(null)
const tokenid = ref(null)
const tokenInfo = ref(null)

const cardbBin = ref(null)
const cardfBin = ref(null)
const coverBin = ref(null)
const playBin = ref(null)

const flippinClass = ref(null)

const init = async () => {
    let response

    console.log('PARAMS', route.params)

    slug.value = route.params.slug
    // console.log('SLUG ID', slug.value)

    tokenid.value = route.params.tokenid
    // console.log('TOKEN ID', tokenid.value)

    if (slug.value && !tokenid.value) {
        tokenid.value = await $fetch(`/api/shareid/${slug.value}`)
            .catch(err => console.error(err))
        console.log('SLUG RESPONSE', tokenid.value)
    }

    let blobArchive = await $fetch(`https://nexa.garden/_raw/${tokenid.value}`)
        .catch(err => console.error(err))
    // console.log('BLOB ARCHIVE', blobArchive)

    let binArchive = await blobArchive.arrayBuffer()
    // console.log('BINARY ARCHIVE-1', binArchive)

    binArchive = new Uint8Array(binArchive)
    // console.log('BINARY ARCHIVE-2', binArchive)

    let decompressed = fflate.unzipSync(binArchive)
    // console.log('DECOMPRESSED', decompressed)


    let base64String
    let binStr
    let json

    json = decompressed['info.json'].reduce((data, byte)=> {
        return data + String.fromCharCode(byte)
    }, '')

    try {
        json = JSON.parse(json)
    } catch (err) {
        console.error(err)
    }

    if (json?.gardenVer || json.niftyVer) {
        tokenInfo.value = json
    }

    /* Set (browser) metadata. */
    useHead({
        /* Set title. */
        title: `${tokenInfo.value?.title} by ${tokenInfo.value?.author} — Nexa Garden`,

        /* Set description. */
        meta: [
            { name: 'description', content: tokenInfo.value?.info }
        ],

        // TODO Add social media poster.
    })

    if (decompressed['public.png']) {
        /* Decompress archive data. */
        binStr = decompressed['public.png'].reduce((data, byte)=> {
            return data + String.fromCharCode(byte)
        }, '')
        base64String = btoa(binStr)
        coverBin.value = base64String
    }

    if (decompressed['cardb.png']) {
        binStr = decompressed['cardb.png'].reduce((data, byte)=> {
            return data + String.fromCharCode(byte)
        }, '')
        base64String = btoa(binStr)
        cardbBin.value = base64String
    }

    if (decompressed['cardf.png']) {
        binStr = decompressed['cardf.png'].reduce((data, byte)=> {
            return data + String.fromCharCode(byte)
        }, '')
        base64String = btoa(binStr)
        cardfBin.value = base64String
    }
    if (decompressed['cardf.jpeg']) {
        binStr = decompressed['cardf.jpeg'].reduce((data, byte)=> {
            return data + String.fromCharCode(byte)
        }, '')
        base64String = btoa(binStr)
        cardfBin.value = base64String
    }
    if (decompressed['cardf.jpg']) {
        binStr = decompressed['cardf.jpg'].reduce((data, byte)=> {
            return data + String.fromCharCode(byte)
        }, '')
        base64String = btoa(binStr)
        cardfBin.value = base64String
    }

    if (decompressed['play.ogg']) {
        /* Set play binary. */
        binStr = decompressed['play.ogg'].reduce((data, byte)=> {
            return data + String.fromCharCode(byte)
        }, '')
        base64String = btoa(binStr)
        playBin.value = base64String
    }

    /* Set (initial) image. */
    if (coverBin.value) {
        imgCoverSrc.value = `data:image/png;base64,${coverBin.value}`
    } else if (cardfBin.value) {
        imgCoverSrc.value = `data:image/png;base64,${cardfBin.value}`
    }
}

const reveal = () => {
    window.scrollTo({top: SCROLL_TOP_MARGIN, behavior: 'smooth'})

    imgRevealSrc.value = `data:image/png;base64,${cardfBin.value}`

    flippinClass.value = `flippin`
    isRevealed.value = true

    setTimeout(play, PLAY_DELAY)

    setTimeout(() => {
        flippinClass.value = ''
        isRevealed.value = false
    }, REVEAL_TIMEOUT)
}

const flip = () => {
    window.scrollTo({top: SCROLL_TOP_MARGIN, behavior: 'smooth'})

    imgRevealSrc.value = `data:image/png;base64,${cardbBin.value}`

    flippinClass.value = `flippin`
    isRevealed.value = true

    setTimeout(() => {
        flippinClass.value = ''
        isRevealed.value = false
    }, REVEAL_TIMEOUT)
}

const play = () => {
    const audio = new Audio(`data:audio/ogg;base64,${playBin.value}`)
    audio.play()
}

onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <header class="bg-white px-8">
        <nav class="mx-auto flex max-w-7xl items-center justify-between pt-6 lg:px-8" aria-label="Global">
            <NuxtLink to="/" class="-m-1.5 p-1.5">
                <span class="sr-only">Nexa Garden</span>
                <img class="h-12 w-auto" src="~/assets/icon.png" alt="" />
            </NuxtLink>

            <div class="flex lg:hidden">
                <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                    <span class="sr-only">Open main menu</span>
                    <svg class="h-12 w-auto" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>

            <div class="hidden lg:flex lg:gap-x-12">
                <!-- <a href="javascript://" class="text-sm font-semibold leading-6 text-gray-900">Product</a> -->
                <!-- <a href="javascript://" class="text-sm font-semibold leading-6 text-gray-900">Features</a> -->
                <!-- <a href="javascript://" class="text-sm font-semibold leading-6 text-gray-900">Marketplace</a> -->
                <!-- <a href="javascript://" class="text-sm font-semibold leading-6 text-gray-900">Company</a> -->

                <NuxtLink to="/" class="text-sm font-medium leading-6 text-lime-600">
                    Back to the Garden <span aria-hidden="true">&rarr;</span>
                </NuxtLink>
            </div>
        </nav>

        <!-- Mobile menu, show/hide based on menu open state. -->
        <div v-if="isShowingMenu" class="lg:hidden" role="dialog" aria-modal="true">
            <!-- Background backdrop, show/hide based on slide-over state. -->
            <div class="fixed inset-0 z-10"></div>
            <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div class="flex items-center justify-between">
                    <a href="javascript://" class="-m-1.5 p-1.5">
                        <span class="sr-only">Nexa Garden</span>
                        <img class="h-12 w-auto" src="~/assets/icon.png" alt="" />
                    </a>
                    <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
                        <span class="sr-only">Close menu</span>
                        <svg class="h-12 w-auto" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 py-6">
                            <a href="javascript://" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Product</a>
                            <a href="javascript://" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</a>
                            <a href="javascript://" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</a>
                            <a href="javascript://" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</a>
                        </div>
                        <div class="py-6">
                            <a href="javascript://" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <main class="bg-white">
        <div class="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
            <!-- Product -->
            <div class="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                <!-- Product image -->
                <div class="lg:col-span-4 lg:row-end-1 flex justify-center">

                    <div class="w-[380px] h-[320px] sm:w-[640px] sm:h-[570px] lg:w-full">
                    <!-- <div class=""> -->

                        <div class="flip-card-inner" :class="flippinClass">

                            <div class="flip-card-front">
                                <div v-if="imgCoverSrc" class="overflow-hidden border-4 border-gray-300 rounded-2xl shadow-md">
                                    <img
                                        :src="imgCoverSrc"
                                        :alt="tokenInfo?.info"
                                        class="w-full h-full object-cover object-center"
                                    />
                                </div>
                            </div>

                            <div class="flip-card-back">
                                <div v-if="imgRevealSrc" class="overflow-hidden border-4 border-gray-300 rounded-2xl shadow-md">
                                    <img
                                        :src="imgRevealSrc"
                                        :alt="tokenInfo?.info"
                                        class="w-full h-full object-cover object-center"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- Product details -->
                <div class="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                    <div class="flex flex-col-reverse">
                        <div class="mt-4">
                            <h1 class="text-6xl font-medium lg:font-bold text-center tracking-tight text-gray-800 sm:text-7xl">
                                {{tokenInfo?.title}}
                            </h1>

                            <h3 class="text-xl sm:text-2xl font-thin text-gray-500 italic tracking-widest">
                                by {{tokenInfo?.author}}
                            </h3>

                            <h2 id="information-heading" class="sr-only">Asset information</h2>
                            <div class="mt-2 sm:mt-0 text-sm text-gray-500 text-right">
                                <span class="text-2xl text-indigo-400 font-medium">{{tokenInfo?.subseries}}</span>
                                <span class="italic">
                                    from
                                    <span class="text-base font-medium">{{tokenInfo?.series}}</span>
                                </span>
                            </div>
                        </div>

                        <!-- <Reviews /> -->
                    </div>

                    <p class="mt-6 text-gray-500 text-lg leading-9 tracking-widest">
                        {{tokenInfo?.info}}
                    </p>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                        <button
                            @click="reveal"
                            :disabled="isRevealed"
                            class="h-16 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 px-8 py-10 text-3xl lg:text-4xl font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            :class="{ 'cursor-not-allowed opacity-30': isRevealed }"
                        >
                            <span class="lg:hidden">Reveal Front</span>
                            <span class="hidden lg:flex">Reveal</span>
                        </button>

                        <button
                            @click="flip"
                            :disabled="isRevealed"
                            class="h-16 flex w-full items-center justify-center rounded-md border border-transparent bg-amber-600 px-8 py-10 text-3xl lg:text-4xl font-medium text-amber-100 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            :class="{ 'cursor-not-allowed opacity-30': isRevealed }"
                        >
                            <span class="lg:hidden">Flip to Back</span>
                            <span class="hidden lg:flex">Flip</span>
                        </button>

                        <div class="flex flex-col items-center">
                            <button
                                disabled
                                class="cursor-not-allowed opacity-30 h-16 flex w-full items-center justify-center rounded-md border border-transparent bg-lime-600 px-8 py-10 text-3xl lg:text-4xl font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                <span class="lg:hidden">Launch App</span>
                                <span class="hidden lg:flex">Launch</span>
                            </button>

                            <small class="mt-1 text-rose-400 italic font-medium">
                                authorization required
                            </small>
                        </div>

                        <button
                            @click="play"
                            class="h-16 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-10 text-3xl lg:text-4xl font-medium text-indigo-100 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        >
                            <span class="lg:hidden">Play Media</span>
                            <span class="hidden lg:flex">Play</span>
                        </button>
                    </div>

                    <div class="mt-10 border-t border-gray-200 pt-10">
                        <h3 class="text-xl font-medium text-gray-700">
                            Highlights
                        </h3>

                        <div class="prose prose-sm mt-4 text-gray-500">
                            <ul role="list">
                                <li>Category: {{tokenInfo?.category}}</li>
                                <li v-if="tokenInfo?.gardenVer">Garden version: v{{tokenInfo?.gardenVer}}</li>
                                <li v-if="tokenInfo?.niftyVer">NiftyArt version: v{{tokenInfo?.niftyVer}}</li>
                            </ul>
                        </div>
                    </div>

                    <div class="mt-10 border-t border-gray-200 pt-10">
                        <h3 class="text-xl font-medium text-gray-900">
                            License
                        </h3>

                        <h4 class="mt-4 text-base font-medium text-indigo-600">
                            Creative Commons Zero (CC0)
                        </h4>

                        <p class="text-sm text-gray-500">
                            For personal and professional use.
                            You cannot resell or redistribute these icons in their original or modified state.
                            <a href="javascript://" class="font-medium text-blue-500 hover:text-blue-400">Read full license</a>
                        </p>
                    </div>

                    <div class="mt-10 border-t border-gray-200 pt-10">
                        <h3 class="text-xl font-medium text-gray-900">
                            Share
                        </h3>

                        <ul role="list" class="mt-4 flex items-center space-x-6">
                            <li>
                                <a href="javascript://" class="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">
                                    <span class="sr-only">Share on Facebook</span>
                                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a href="javascript://" class="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">
                                    <span class="sr-only">Share on Instagram</span>
                                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a href="javascript://" class="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">
                                    <span class="sr-only">Share on Twitter</span>
                                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path
                                            d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                                        />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- <TokenExtras /> -->
            </div>
        </div>
    </main>

    <Footer />
</template>

<style>
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flippin {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}


.flip-card-back {
  transform: rotateY(180deg);
}
</style>
