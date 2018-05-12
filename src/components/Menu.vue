<template>
    <div class="flex h-full justify-center bg-darken">
        <div class="mt-16 flex flex-col max-w-lg">
            <div class="mb-32">
                <img src="../assets/logo.png">
            </div>

            <router-link :to="{ name: 'Game' }" class="w-full bg-brand-yellow p-4 rounded-full uppercase flex justify-center items-center no-underline text-brand-blue mb-8 text-4xl font-semibold">Play</router-link>
            <router-link :to="{ name: 'Store' }" class="w-full bg-brand-yellow p-4 rounded-full uppercase flex justify-center items-center no-underline text-brand-blue text-4xl font-semibold">Store</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        //
    }
</script>
