<script setup lang="ts">
import { computed } from "vue"
const props = defineProps(['chatHistory', 'IsDrawerOpen', 'chatId'])
const emit = defineEmits(['OnChatAdd', 'OndeleteChat']);

const chatTitle = computed(() => {
    return props.chatHistory.map((h: any) => {
        return h.title.length > 20 ? h.title.slice(0, 20) + "..." : h.title;
    })
})


</script>


<template>
    <input id="my-drawer" type="checkbox" class="drawer-toggle"/>
    <div class="drawer-side">
        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <!-- Sidebar content here -->
            <li class=" text-xl mb-20 flex  items-center justify-between flex-row">
                <p>Chat History</p>
                <div>
                    <RouterLink @click="$emit('OnChatAdd')" to="/"><span title="New Chat"
                            class="pi pi-plus-circle  text-info inline"></span></RouterLink>
                </div>
            </li>
            <li v-for="(h, i) in props.chatHistory" :key="h._id" class="flex items-center justify-between flex-row">
                <RouterLink 
                    :to="{ name: 'history', params: { id: h._id } }" 
                    :class="h._id === props.chatId ? 'active' : ''">
                    {{ chatTitle[i] }}
                </RouterLink>
                <div title="Delete chat" @click="$emit('OndeleteChat', h._id)">
                    <span class="pi pi-trash  text-error inline"></span>
                </div>
            </li>
        </ul>
    </div>
</template>