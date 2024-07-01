<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue"
import { useRoute, useRouter } from 'vue-router';

import { ChatHistory, Message } from "../types";
import { messageFactory } from "../utils/messageFactory";

const route = useRoute()
const router = useRouter()

const models = ref<string[]>([])
const userInput = ref<string>("")
const messages = ref<Message[]>([])
const chosenModel = ref<string>("")
const chatHistory = ref<ChatHistory[]>([])
const chatId = ref(route.params.id || '');
const openDeleteModal = ref(false);
const chatIdToDelete = ref<string | null>(null)



// DropDown Menu 
const getModels = async () => {
  const response = await fetch(import.meta.env.VITE_MODELS_ENDPOINT)
  const data = await response.json()
  console.log(data)
  models.value = data
  chosenModel.value = localStorage.getItem("model") || data[0]
}

// Update User Model 

const updateUserModel = (newModel: string) => {
  localStorage.setItem("model", newModel)
  chosenModel.value = newModel
}

// CHAT HISTORY
const getHistory = async () => {
  const response = await fetch(import.meta.env.VITE_HISTORY_ENDPOINT)
  const data = await response.json()
  chatHistory.value = data
}

// GET CHAT BY ID
const getChatByID = async (id: string) => {
  const response = await fetch(`${import.meta.env.VITE_CHAT_ENDPOINT}/${id}`)
  const data = await response.json()
  messages.value = data.content
}

// NEW CHAT
const OnChatAdd = () => { messages.value = [] }

// Open  Delete Chat Dialog Modal
const OndeleteChat = (id: string) => {
  openDeleteModal.value = true;
  chatIdToDelete.value = id
}
// Cancel Delete Chat
const cancelDeleteChat = () => {
  openDeleteModal.value = false;
  chatIdToDelete.value = null
}

// Delete Chat
const deleteChat = async () => {
  openDeleteModal.value = false;
  chatHistory.value = chatHistory.value.filter(ch => ch._id !== chatIdToDelete.value)
  messages.value = []
  await fetch(`${import.meta.env.VITE_CHAT_ENDPOINT}/${chatIdToDelete.value}`, { method: 'DELETE' })
  chatIdToDelete.value = null
  router.push("/")
}


// Get Last Chat

const getLastChat = async () => {
  const response = await fetch(import.meta.env.VITE_LAST_CHAT_ENDPOINT)
  const data = await response.json()
  console.log(data)
  //messages.value = data.content
  router.push(`/chat/${data._id}`)
  getChatByID(data._id)
  getHistory()
}

const OndeleteAllChats = () => {
  openDeleteModal.value = true;
}

const deleteAllChats = async () => {
  openDeleteModal.value = false;
  chatHistory.value = []
  messages.value = []
  await fetch(import.meta.env.VITE_CHAT_ENDPOINT, { method: 'DELETE' })
  router.push("/")
}


// Watch URL ID update
watch(() => route.params.id, (newId) => {
  chatId.value = newId as string;
  if(chatId.value) getChatByID(chatId.value)
});


onMounted(() => {
  getModels()
  getHistory()
})


const modelAsTitle = computed(() => {
  return chosenModel.value.split(":")[0]
})

const submit = async () => {
/*
  if (!chatId.value && messages.value.length === 0) {
    chatHistory.value.unshift({ _id: Date.now().toString(), title: userInput.value.trim() })
  }
    */
  messages.value.push(messageFactory("USER", "user", userInput.value.trim()))
  userInput.value = ""

  const response = await fetch(import.meta.env.VITE_CHAT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: messages.value, model: chosenModel.value, id: chatId.value })
  })


  const chatBotMessage = messageFactory(chosenModel.value, 'assistant', '')
  messages.value.push(chatBotMessage)
  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  while (true) {
    const { done, value } = await reader.read()
    if (done) {
       if(!chatId.value) {
        await getLastChat()
       }
      break
    }

    const text = decoder.decode(value)
    chatBotMessage.text += text
    messages.value = [...messages.value]
  }

   console.log(response)
}
</script>

<template>
  <div class="drawer lg:drawer-open">
    <div class="drawer-content">
      <VueNavbar :models="models" :chosenModel="chosenModel" @updateUserModel="updateUserModel"
        :modelAsTitle="modelAsTitle" />

      <VueChat :messages="messages" />
      <VueDialog 
        :openDeleteModal="openDeleteModal"
        @cancelDeleteChat="cancelDeleteChat"
        @deleteChat="deleteChat"
      />
      <VueForm v-model:userInput="userInput" @submit="submit" />
    </div>
    <VueDrawer 
      :chatHistory="chatHistory"
      :chatId="chatId"
      @OnChatAdd="OnChatAdd"
      @OndeleteChat="(id: string) => OndeleteChat(id)"
      @OndeleteAllChats="OndeleteAllChats"
      />
  </div>
</template>