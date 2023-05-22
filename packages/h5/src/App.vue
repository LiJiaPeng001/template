<script setup>
const setting = useSettingStore()
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="setting.keepRoutes">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
