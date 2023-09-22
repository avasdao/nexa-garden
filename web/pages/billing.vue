<script setup lang="ts">
useHead({
    title: `Wallet — Nexa Garden`,
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
    <main class="px-3 max-w-7xl mx-auto py-5 flex flex-col gap-4">
        <h1 class="text-5xl font-medium">
            Billing
        </h1>

        <p class="text-sm text-gray-500">
            Here is a complete overview of your Billing history.
        </p>

        <h2>Wallet Balance</h2>
        <h3>$0.00 USD</h3>
        <h3>0.0000 NEXA</h3>

        <h2>Daily Usage</h2>
        <h3>$0.00 USD</h3>
        <h3>0.0000 NEXA</h3>
    </main>

    <Footer />
</template>
