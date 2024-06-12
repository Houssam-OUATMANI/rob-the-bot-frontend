import { defineStore } from "pinia";

export const useThemeStore = defineStore('theme', {
    state: () => ({
      currentTheme: localStorage.getItem('theme') || "dark",
      
    }),
    getters: {
      getCurrentTheme: (state) => state.currentTheme,
    },
    actions : {
        changeTheme(newTheme : string) { 
            this.currentTheme = newTheme;
            localStorage.setItem('theme', newTheme);
            document.querySelector('html')!.dataset.theme = newTheme;
        }
    },
  })