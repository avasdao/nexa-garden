<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
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
    <div class="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
        <div>
            <div class="border-b border-gray-200">
                <div class="-mb-px flex space-x-8" aria-orientation="horizontal" role="tablist">
                    <!-- Selected: "border-indigo-600 text-indigo-600", Not Selected: "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800" -->
                    <button
                        id="tab-reviews"
                        class="border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800 whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                        aria-controls="tab-panel-reviews"
                        role="tab"
                        type="button"
                    >
                        Customer Reviews
                    </button>
                    <button
                        id="tab-faq"
                        class="border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800 whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                        aria-controls="tab-panel-faq"
                        role="tab"
                        type="button"
                    >
                        FAQ
                    </button>
                    <button
                        id="tab-license"
                        class="border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800 whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                        aria-controls="tab-panel-license"
                        role="tab"
                        type="button"
                    >
                        License
                    </button>
                </div>
            </div>

            <!-- 'Customer Reviews' panel, show/hide based on tab state -->
            <div id="tab-panel-reviews" class="-mb-10" aria-labelledby="tab-reviews" role="tabpanel" tabindex="0">
                <h3 class="sr-only">Customer Reviews</h3>

                <div class="flex space-x-4 text-sm text-gray-500">
                    <div class="flex-none py-10">
                        <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" alt="" class="h-10 w-10 rounded-full bg-gray-100" />
                    </div>
                    <div class="py-10">
                        <h3 class="font-medium text-gray-900">Emily Selman</h3>
                        <p><time datetime="2021-07-16">July 16, 2021</time></p>

                        <div class="mt-4 flex items-center">
                            <!-- Active: "text-yellow-400", Default: "text-gray-300" -->
                            <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                        <p class="sr-only">5 out of 5 stars</p>

                        <div class="prose prose-sm mt-4 max-w-none text-gray-500">
                            <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
                        </div>
                    </div>
                </div>
                <div class="flex space-x-4 text-sm text-gray-500">
                    <div class="flex-none py-10">
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" alt="" class="h-10 w-10 rounded-full bg-gray-100" />
                    </div>
                    <div class="py-10 border-t border-gray-200">
                        <h3 class="font-medium text-gray-900">Hector Gibbons</h3>
                        <p><time datetime="2021-07-12">July 12, 2021</time></p>

                        <div class="mt-4 flex items-center">
                            <!-- Active: "text-yellow-400", Default: "text-gray-300" -->
                            <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                        <p class="sr-only">5 out of 5 stars</p>

                        <div class="prose prose-sm mt-4 max-w-none text-gray-500">
                            <p>
                                Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create
                                a single icon this good, so it's a steal at this price.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- More reviews... -->
            </div>

            <!-- 'FAQ' panel, show/hide based on tab state -->
            <div id="tab-panel-faq" class="text-sm text-gray-500" aria-labelledby="tab-faq" role="tabpanel" tabindex="0">
                <h3 class="sr-only">Frequently Asked Questions</h3>

                <dl>
                    <dt class="mt-10 font-medium text-gray-900">What format are these icons?</dt>
                    <dd class="prose prose-sm mt-2 max-w-none text-gray-500">
                        <p>The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.</p>
                    </dd>
                    <dt class="mt-10 font-medium text-gray-900">Can I use the icons at different sizes?</dt>
                    <dd class="prose prose-sm mt-2 max-w-none text-gray-500">
                        <p>
                            Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don&#039;t recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility
                            and visual balance.
                        </p>
                    </dd>

                    <!-- More FAQs... -->
                </dl>
            </div>

            <!-- 'License' panel, show/hide based on tab state -->
            <div id="tab-panel-license" class="pt-10" aria-labelledby="tab-license" role="tabpanel" tabindex="0">
                <h3 class="sr-only">License</h3>

                <div class="prose prose-sm max-w-none text-gray-500">
                    <h4>Overview</h4>

                    <p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.</p>

                    <ul role="list">
                        <li>You're allowed to use the icons in unlimited projects.</li>
                        <li>Attribution is not required to use the icons.</li>
                    </ul>

                    <h4>What you can do with it</h4>

                    <ul role="list">
                        <li>Use them freely in your personal and professional work.</li>
                        <li>Make them your own. Change the colors to suit your project or brand.</li>
                    </ul>

                    <h4>What you can't do with it</h4>

                    <ul role="list">
                        <li>Don't be greedy. Selling or distributing these icons in their original or modified state is prohibited.</li>
                        <li>Don't be evil. These icons cannot be used on websites or applications that promote illegal or immoral beliefs or activities.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
