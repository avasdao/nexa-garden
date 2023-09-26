<script setup lang="ts">
/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

// TODO Add support for additional media types.

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
    <TokenView />
</template>
