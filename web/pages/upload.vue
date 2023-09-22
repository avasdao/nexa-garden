<script setup lang="ts">
/* Import modules. */

useHead({
    title: `Upload Your Nexa Assets`,
    meta: [
        { name: 'description', content: `Nexa Garden offers the MOST reliable, decentralized storage solution for your Nexa assets.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const ENDPOINT = 'https://nexa.garden/v1/asset'

const imagePreviewUrl = ref(null)
const imageData = ref(null)
const response = ref(null)


const handleChange = async (e) => {
    const input = e.target
    console.log('INPUT', input)

    if (!input.files) {
        return console.error(`Oops! Missing file(s).`)
    }

    const reader = new FileReader()
    reader.onload = (e) => {
        /* Set preview URL. */
        imagePreviewUrl.value = e.target.result
    }
    imageData.value = input.files[0]
    reader.readAsDataURL(input.files[0])
}

const upload = async () => {
    console.log('building...')

    if (!imageData.value) {
        return alert(`Oops! You must select a file to upload.`)
    }

    let formData = new FormData()

    formData.append('name', imageData.value?.name)

    formData.append('hi', 'there!')
    formData.append('merhaba', 'kadin!')

    formData.append('data', imageData.value)

    response.value = await $fetch(ENDPOINT, {
        method: 'POST',
        body: formData,
    })
    .catch(err => console.error(err))
    console.log('RESPONSE (upload):', response.value)
}

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
    <main class="max-w-7xl mx-auto py-5 flex flex-col">
        <h1 class="text-5xl font-medium">
            Upload
        </h1>

        <p>
            Upload and manage your assets with the MOST reliable, decentralized storage solution in the Nexaverse.
        </p>

        <input
            id="file-upload"
            name="file-upload"
            type="file"
            @change="handleChange"
            class="bg-rose-500 text-2xl"
        />

        <input
            type="text"
            placeholder="Enter number of days"
        />

        <div v-if="response" class="mx-5 my-2 px-3 py-1 bg-rose-300 border border-rose-500 rounded-lg shadow">
            <pre class="text-rose-900 font-medium">{{response}}</pre>
        </div>

        <div class="mt-5 pr-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-xl font-semibold leading-6 text-gray-900">
                Reset
            </button>

            <button
                @click="upload"
                class="rounded-md bg-lime-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
            >
                Upload
            </button>
        </div>

    </main>

    <Footer />
</template>
