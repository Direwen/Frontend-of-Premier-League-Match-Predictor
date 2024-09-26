<template>
  <div class="flex justify-center space-x-4">
    <button 
      class="bg-transparent border border-primary text-primary py-2 px-4 rounded font-bold transition duration-300 hover:bg-primary hover:text-white active:bg-primary-dark active:text-white hover:shadow-lg active:shadow-none hover:scale-105 active:scale-95" 
      @click="predictOutcome('HOME')"
    >
      Home Win
    </button>
    <button 
      class="bg-transparent border border-primary text-primary py-2 px-4 rounded font-bold transition duration-300 hover:bg-primary hover:text-white active:bg-primary-dark active:text-white hover:shadow-lg active:shadow-none hover:scale-105 active:scale-95" 
      @click="predictOutcome('AWAY')"
    >
      Away Win
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  predictOutcome: {
    type: Function,
    required: true
  }
});
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
