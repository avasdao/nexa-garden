<script setup lang="ts">
useHead({
    title: `Pricing — Nexa Garden`,
    meta: [
        { name: 'description', content: `Nexa Garden makes building your next BIG idea effortless.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-3 lg:px-8">
            <div class="mx-auto max-w-2xl sm:text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Simple, No-BS Pricing
                </h2>

                <p class="mt-6 text-lg leading-8 text-gray-600">
                    Getting started requires <span class="text-indigo-500 font-medium">NO SIGNUP!</span>
                    Just create a non-custodial Wallet, top-up enough $NEXA for what you need, and start uploading...
                </p>
            </div>

            <div class="mx-auto mt-16 max-w-2xl bg-lime-50 rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                <div class="p-5 sm:p-8 sm:p-10 lg:flex-auto">
                    <h3 class="text-4xl font-bold tracking-tight text-gray-900">
                        Pay-As-You-Go
                    </h3>

                    <p class="mt-6 text-base leading-7 text-gray-600">
                        We know how challenging it is to predict future needs; so we've made billing ultra-flexible to accommodate whatever those needs may be.
                    </p>

                    <div class="mt-10 flex items-center gap-x-4">
                        <h4 class="flex-none text-lg font-semibold leading-6 text-indigo-600">
                            What’s included
                        </h4>
                        <div class="h-px flex-auto bg-gray-100"></div>
                    </div>

                    <ul role="list" class="mt-8 grid grid-cols-1 gap-4 text-base leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Global Gigabit Edge Network
                        </li>

                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            NFT/SFT License Monitoring
                        </li>

                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            24x7 Support Services
                        </li>

                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            CSAM Monitoring
                        </li>

                        <li class="flex gap-x-3">
                            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Support for Nifty v2.0 &amp; Garden v0.1
                        </li>
                    </ul>
                </div>

                <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                    <div class="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                        <div class="w-full px-8">
                            <p class="text-3xl font-semibold text-gray-500">
                                we <span class="text-4xl text-amber-500 font-light italic">Simply</span>
                                bill your <span class="text-4xl text-amber-500 font-light italic">Usage</span>
                                each day — easily cancel
                                <span class="text-4xl text-amber-500 font-light italic">Anytime</span>
                            </p>

                            <p class="mt-6 flex flex-col items-end justify-center gap-x-2">
                                <span class="flex justify-start text-5xl font-bold tracking-tight text-gray-900">
                                    <sup class="mt-2 text-xs text-gray-400">
                                        USD
                                    </sup>

                                    $0.005
                                </span>

                                <span class="text-sm font-semibold leading-6 tracking-wide text-gray-500">
                                    per GiB each Day
                                </span>
                            </p>

                            <NuxtLink to="/upload"
                                class="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Start Uploading
                            </NuxtLink>

                            <p class="mt-3 px-2 lg:px-8 text-xs leading-5 text-gray-600">
                                Invoices and receipts are available to print/export, allowing for easy accounting.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <Footer />
</template>
