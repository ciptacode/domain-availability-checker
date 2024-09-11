<template>
    <div class="flex justify-center items-center h-screen">
        <div class="bg-white shadow-md rounded-lg p-8 max-w-xl w-full mx-auto">
            <h1 class="text-2xl font-bold text-center mb-4">Check Domain Availability</h1>
            <p class="text-gray-600 text-center mb-8">Find the perfect domain name for your project</p>
            <form @submit.prevent="checkDomain" class="flex gap-4 mb-6">
                <input v-model="domain" @input="onInputDomain" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter domain (e.g., example.com)">
                <button class="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-md">Check</button>
            </form>
            <div v-if="loading" class="text-center text-gray-500">Checking...</div>
            <div v-if="successCheck && !loading" :class="!error ? 'text-green-500' : 'text-red-500'" class="text-center text-lg">
                {{ message }} 
            </div>
        </div>

        <footer class="flex-shrink-0 px-6 py-4 fixed bottom-0 w-full">
            <p class="flex items-center justify-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <span>Made with</span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-6 h-6 text-red-500"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path></svg><span class="sr-only">Love</span></span><span>by</span><a href="https://fahrigunadi.dev" target="_blank" class="text-blue-600 hover:underline"> Fahri Gunadi </a>
            </p>
            <p class="flex items-center justify-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-2">
                Powered by <a class="text-blue-600 hover:underline" href="https://domainr.com/">Domainr.</a>
            </p>
        </footer>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const domain = ref('')
const loading = ref(false)
const error = ref(false)
const message = ref('')
const successCheck = ref(false)

const onInputDomain = (event) => {
    resetRef()
}

function resetRef() {
    loading.value = false
    error.value = false
    message.value = ''
    successCheck.value = false
}

async function checkDomain() {
    resetRef()

    loading.value = true

    let data, resError

    try {
        data = await $fetch('/api/domain-check', {
            method: 'POST',
            body: {
                domain: domain.value
            }
        })
    } catch (e) {
        console.error(e)
        resError = e
    }

    if (data.status !== 200 || resError) {
        error.value = true
    } else {
        error.value = data.summary == 'active'
    }

    message.value = data.message
    successCheck.value = true
    loading.value = false
}
</script>
