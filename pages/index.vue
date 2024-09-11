<template>
    <div class="flex justify-center items-center h-screen">
        <div class="bg-white shadow-md rounded-lg p-8 max-w-xl w-full mx-auto">
            <h1 class="text-2xl font-bold text-center mb-4">Check Domain Availability</h1>
            <p class="text-gray-600 text-center mb-8">Find the perfect domain name for your project</p>
            <div class="flex gap-4 mb-6">
                <input v-model="domain" type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter domain (e.g., example.com)">
                <button @click="checkDomain"
                    class="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-md">Check</button>
            </div>
            <div v-if="loading" class="text-center text-gray-500">Checking...</div>
            <div v-if="result && !loading" :class="result.isAvailable ? 'text-green-500' : 'text-red-500'"
                class="text-center text-lg">
                {{ domain }} is {{ result.isAvailable ? 'available 🎉' : 'already taken 😞' }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const domain = ref('')
const result = ref(null)
const loading = ref(false)

async function checkDomain() {
    if (!domain.value) {
        result.value = { isAvailable: false }
        return
    }

    loading.value = true
    result.value = null

    setTimeout(() => {
        result.value = {
            isAvailable: Math.random() > 0.5
        }
        loading.value = false
    }, 3000)
}
</script>
