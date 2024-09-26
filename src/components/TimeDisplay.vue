<template>
    <p class="absolute -top-5 -right-2 border p-1 bg-gray-100 rounded-md shadow-lg md:px-3 md:py-2">
      <small><strong>Time Left:</strong> <span class="font-medium">{{ timeLeft }}</span></small>
    </p>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    utcDate: {
      type: String,
      required: true,
    },
  });
  
  const timeLeft = computed(() => {
    const matchDate = new Date(props.utcDate);
    const now = new Date();
    const diff = matchDate - now;

    if (diff < 0) {
      return "In play"; // Display "In play" if the time is past
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days, ${hours} hours, ${minutes} minutes`;
  });
  </script>
  
  <style scoped>
  /* Time display styling */
  </style>
