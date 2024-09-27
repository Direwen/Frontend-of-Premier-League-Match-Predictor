<template>
  <transition name="slide" mode="out-in">
    <div
      v-if="uiStore.isToastVisible"
      class="fixed top-4 right-4 flex items-center justify-between p-4 w-auto rounded-md shadow-lg transition-opacity duration-500 ease-in-out bg-opacity-90 text-white"
      :class="{'bg-red-500' : uiStore.toastStatus == 'failure', 'bg-primary' : uiStore.toastStatus == 'neutral', 'bg-green-500' : uiStore.toastStatus == 'success'}"
      role="alert"
    >
      <p class="text-sm sm:text-base">{{ uiStore.toastMessage }}</p>

      <button class="ml-4 text-lg font-bold focus:outline-none" @click="closeToast">
        &times;
      </button>
    </div>
  </transition>
</template>

<script setup>
import { useUiStore } from '../stores/uiStore';

const uiStore = useUiStore();

// Manually close the toast
const closeToast = () => {
  uiStore.hideToast();
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0%);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
