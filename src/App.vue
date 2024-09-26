<template>
  <Toast />
  <router-view></router-view>
</template>

<script setup>
import { useAppStore } from './stores/appStore';
import Toast from './components/Toast.vue';

const appStore = useAppStore();

// Check authentication when the app loads
if (appStore.checkAuth()) {
  appStore.evaluateUserScore();
}

</script>
