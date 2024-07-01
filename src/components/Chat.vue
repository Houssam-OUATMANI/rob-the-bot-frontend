<script setup lang="ts">
import { Marked } from "marked"
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';


const props = defineProps(['messages'])

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang, _info) { 
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);



</script>

<template>
  <main class=" rounded p-10 my-10 min-h-[70vh] max-h-[70vh] overflow-scroll ">
    <div class="chat" :class="m.author === 'USER' ? 'chat-end' : 'chat-start'" v-for="m in props.messages" :key="m.id">
      <div class="chat-header flex items-center gap-3 mb-3">
        <span>{{ m.author.toLowerCase() }}</span>
        <time class="text-xs opacity-50">{{ new Date(m.date).toLocaleDateString() }} {{
          new Date(m.date).toLocaleTimeString() }}</time>
      </div>
      <div class="chat-bubble " v-html="marked.parse(m.text)"></div>
    </div>
  </main>
</template>
