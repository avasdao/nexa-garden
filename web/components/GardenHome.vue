<script setup lang="ts">
useHead({
    title: `Nexa Garden`,
    meta: [
        { name: 'description', content: `Nexa Garden makes building your next BIG idea effortless.` }
    ],
})

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
    <main class="bg-green-900">
        <Hero />

        <!-- <Logos /> -->

        <!-- Feature section -->
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl text-center">
                <h2 class="text-base font-semibold leading-7 text-lime-400">
                    Deploy faster
                </h2>

                <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Everything you need to deploy your app
                </p>

                <p class="mt-6 text-lg leading-8 text-gray-300">
                    Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.
                </p>
            </div>

            <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                    <div class="flex flex-col">
                        <dt class="text-base font-semibold leading-7 text-white">
                            <div class="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-lime-500">
                                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </div>
                            Server monitoring
                        </dt>

                        <dd class="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                            <p class="flex-auto">
                                Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.
                            </p>

                            <p class="mt-6">
                                <a href="javascript://" class="text-sm font-semibold leading-6 text-lime-400">
                                    Learn more <span aria-hidden="true">→</span>
                                </a>
                            </p>
                        </dd>
                    </div>

                    <div class="flex flex-col">
                        <dt class="text-base font-semibold leading-7 text-white">
                            <div class="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-lime-500">
                                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                                    />
                                </svg>
                            </div>
                            Collaborate
                        </dt>

                        <dd class="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                            <p class="flex-auto">
                                Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt eos quasi cupiditate. A inventore et molestiae natus.
                            </p>

                            <p class="mt-6">
                                <a href="javascript://" class="text-sm font-semibold leading-6 text-lime-400">Learn more <span aria-hidden="true">→</span></a>
                            </p>
                        </dd>
                    </div>

                    <div class="flex flex-col">
                        <dt class="text-base font-semibold leading-7 text-white">
                            <div class="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-lime-500">
                                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                    />
                                </svg>
                            </div>
                            Task scheduling
                        </dt>

                        <dd class="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                            <p class="flex-auto">
                                Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem quia quam. Quis eos molestiae at iure impedit.
                            </p>

                            <p class="mt-6">
                                <a href="javascript://" class="text-sm font-semibold leading-6 text-lime-400">Learn more <span aria-hidden="true">→</span></a>
                            </p>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>

        <!-- Feature section -->
        <div class="my-32 sm:mt-56">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto max-w-2xl sm:text-center">
                    <h2 class="text-base font-semibold leading-7 text-lime-400">
                        Everything you need
                    </h2>

                    <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        No server? No problem.
                    </p>

                    <p class="mt-6 text-lg leading-8 text-gray-300">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis.
                    </p>
                </div>
            </div>

            <div class="relative overflow-hidden pt-16">
                <div class="mx-auto max-w-7xl px-6 lg:px-8">
                    <img src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png" alt="App screenshot" class="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10" width="2432" height="1442" />
                    <div class="relative" aria-hidden="true">
                        <div class="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-900 pt-[7%]"></div>
                    </div>
                </div>
            </div>

            <div class="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
                <dl class="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                    <div class="relative pl-9">
                        <dt class="inline font-semibold text-white">
                            <svg class="absolute left-1 top-1 h-5 w-5 text-lime-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            Push to deploy.
                        </dt>

                        <dd class="inline">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.
                        </dd>
                    </div>

                    <div class="relative pl-9">
                        <dt class="inline font-semibold text-white">
                            <svg class="absolute left-1 top-1 h-5 w-5 text-lime-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                            </svg>
                            SSL certificates.
                        </dt>

                        <dd class="inline">
                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                        </dd>
                    </div>

                    <div class="relative pl-9">
                        <dt class="inline font-semibold text-white">
                            <svg class="absolute left-1 top-1 h-5 w-5 text-lime-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            Simple queues.
                        </dt>

                        <dd class="inline">
                            Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                        </dd>
                    </div>

                    <div class="relative pl-9">
                        <dt class="inline font-semibold text-white">
                            <svg class="absolute left-1 top-1 h-5 w-5 text-lime-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 01-.82-1.256A8 8 0 0118 9a22.47 22.47 0 01-1.228 7.351.75.75 0 11-1.417-.49A20.97 20.97 0 0016.5 9 6.5 6.5 0 0010 2.5zM4.333 4.416a.75.75 0 01.218 1.038A6.466 6.466 0 003.5 9a7.966 7.966 0 01-1.293 4.362.75.75 0 01-1.257-.819A6.466 6.466 0 002 9c0-1.61.476-3.11 1.295-4.365a.75.75 0 011.038-.219zM10 6.12a3 3 0 00-3.001 3.041 11.455 11.455 0 01-2.697 7.24.75.75 0 01-1.148-.965A9.957 9.957 0 005.5 9c0-.028.002-.055.004-.082a4.5 4.5 0 018.996.084V9.15l-.005.297a.75.75 0 11-1.5-.034c.003-.11.004-.219.005-.328a3 3 0 00-3-2.965zm0 2.13a.75.75 0 01.75.75c0 3.51-1.187 6.745-3.181 9.323a.75.75 0 11-1.186-.918A13.687 13.687 0 009.25 9a.75.75 0 01.75-.75zm3.529 3.698a.75.75 0 01.584.885 18.883 18.883 0 01-2.257 5.84.75.75 0 11-1.29-.764 17.386 17.386 0 002.078-5.377.75.75 0 01.885-.584z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            Advanced security.
                        </dt>

                        <dd class="inline">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.
                        </dd>
                    </div>

                    <div class="relative pl-9">
                        <dt class="inline font-semibold text-white">
                            <svg class="absolute left-1 top-1 h-5 w-5 text-lime-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            Powerful API.
                        </dt>

                        <dd class="inline">
                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                        </dd>
                    </div>

                    <div class="relative pl-9">
                        <dt class="inline font-semibold text-white">
                            <svg class="absolute left-1 top-1 h-5 w-5 text-lime-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                                <path
                                    fill-rule="evenodd"
                                    d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            Database backups.
                        </dt>

                        <dd class="inline">
                            Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                        </dd>
                    </div>
                </dl>
            </div>
        </div>

        <Footer />
    </main>
</template>
