<script setup lang="ts">
/* Initialize stores. */
// import { useSystemStore } from '@/stores/system'
// const System = useSystemStore()

const isFan = ref(false)
const isGarden = ref(false)

onBeforeMount(() => {
    console.log('Ready to mount!')
    // Now it's safe to perform setup operations.

    if (process.client) {
        /* Verify the URL (location), for security reasons. */
        const myLocation = document.location
        console.log('MY LOCATION', myLocation)

        /* Set location hash. */
        const hash = myLocation.hash // #/3f080076-d30b-4d32-b51a-120ae63f6905
        console.log('HASH', hash)

        /* Set location hostname. */
        const hostname = myLocation.hostname // localhost
        console.log('HOSTNAME', hostname)

        /* Detect all mirrors. */
        if (hostname === 'nexa.fan' || hash === '#fan') {
            /* Set flag. */
            // isFan.value = true
        } else {
            /* Set flag. */
            isGarden.value = true
        }
    }
})

onMounted(() => {
    console.log('Mounted!')
    // Now it's safe to perform setup operations.
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <div>
        <FanHome v-if="isFan" />
        <GardenHome v-else />
    </div>
</template>
