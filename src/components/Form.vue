<script setup lang="ts">

import { ref, watch } from 'vue';
const props = defineProps(['userInput'])
const emit = defineEmits(['update:userInput', 'submit']);
const localInput = ref(props.userInput);

watch(localInput, (newValue) => {
  emit('update:userInput', newValue);
});

</script>


<template>

<form @submit.prevent="$emit('submit')"
        class=" relative bottom-0 left-0 right-0 w-2/3 mx-auto flex items-center gap-2 justify-center">
        <textarea v-model="localInput" class="textarea w-full h-[48px] textarea-bordered" placeholder="CHAT HERE !!"></textarea>
        <button :disabled="!localInput" type="submit" class="btn btn-outline btn-accent">Send</button>
      </form>
</template>