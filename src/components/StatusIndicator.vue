<template>
    <span
        class="px-4 py-1 rounded-md absolute -top-3 -left-2 font-semibold text-xs shadow-xl"
        :class="{
          'bg-green-200 text-green-900': status === 'Finished',
          'bg-yellow-200 text-yellow-900': status === 'Pending',
        }"
      >
        {{ status }}
      </span>
  </template>
  
  <script setup>
  const props = defineProps({
    status: {
      type: String,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  /* Custom styling for status indicator */
  </style>
  