<script setup>
import { ref } from 'vue'
import Comp from './demo.vue'

const msg = ref('Hello World!')
</script>

<template>
  <Comp v-model="msg" />
  {{ msg }}
</template>
