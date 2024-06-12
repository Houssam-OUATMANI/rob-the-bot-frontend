<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue';
import { daisyUiThemes } from '../types/themes';
import { useThemeStore } from '../store/themeStore';

const props = defineProps(['models', 'chosenModel', 'modelAsTitle'])
const emit = defineEmits(['updateUserModel',]);
const chosenModel = ref(localStorage.getItem('model') || props.chosenModel);
const storeTheme = useThemeStore()
const userTheme = ref(storeTheme.currentTheme)





onBeforeMount(() => {
    document.querySelector('html')!.dataset.theme = userTheme.value
})

watch(chosenModel, (newValue) => {
    emit('updateUserModel', newValue);
});

</script>
<template>
    <div class="navbar bg-base-100">
        <div class="flex-1 gap-2">
            <p class="btn btn-ghost text-xl">Rob The Bot 🤖</p>
            <p>Model : <span class="text-accent">{{ props.modelAsTitle }}</span></p>
        </div>


        <div class="flex-none gap-4">
            <label for="model"><span class="pi pi-android"></span></label>
            <select id="model" v-model="chosenModel" class="select select-bordered w-full max-w-xs">
                <option value="assistant" disabled>Assistant</option>
                <option :selected="props.models[i].split(':')[0] === chosenModel" :value="m"
                    v-for="(m, i) in props.models" :key="m">
                    {{ m }}
                </option>
            </select>
            
            <label for="theme"><span class="pi pi-sun"></span></label>
            <select id="theme"  class="select select-bordered w-full max-w-xs" v-model="userTheme" @change="storeTheme.changeTheme(userTheme)">
                <option value="assistant" disabled>Choose Theme</option>
                <option :selected="theme === storeTheme.currentTheme" v-for="(theme, i) in daisyUiThemes" :key="i" :value="theme">{{ theme }}</option>
            </select>

            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
        </div>
    </div>
</template>