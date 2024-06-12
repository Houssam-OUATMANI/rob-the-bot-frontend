<script setup lang="ts">

const props = defineProps(['openDeleteModal'])
 defineEmits(['deleteChat', 'cancelDeleteChat']);


 
</script>


<template>
     <dialog id="my_modal_1" class="modal" :open="props.openDeleteModal">
          <div class="modal-box">
            <h3 class="font-bold text-lg text-error">Hola Que pasa</h3>
            <p class="py-4 text-warning">Are you sure that you want to delete the chat</p>
            <div class="modal-action">
                <button @click="$emit('deleteChat')" class="btn">Confirm</button>
                <button @click="$emit('cancelDeleteChat')" class="btn">Cancel</button>
            </div>
          </div>
        </dialog>
</template>