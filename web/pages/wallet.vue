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
            Garden Wallet
        </h1>

        <p class="text-sm text-gray-500">
            Your wallet offers you the safety &amp; security that you expect from a non-custodial wallet, plus the convenience of an automatic payment system, courtesy of a Nexa Wise Contract.
        </p>

        <h2>Balance</h2>

        <h3>0.00 NEXA</h3>
    </main>

    <Footer />
</template>
