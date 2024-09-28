<template>
  <Toast />
  <router-view class="bg-white"></router-view>
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
