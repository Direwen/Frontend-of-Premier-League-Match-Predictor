<template>
    <div class="flex justify-center mt-4">
      <!-- <button
        @click="prevPage"
        :disabled="!previousLastEvaluatedKey ? true : false"
        class="px-4 py-2 bg-blue-500 text-white rounded-l hover:bg-blue-600 disabled:opacity-50"
      >
        Previous
      </button> -->
      <button
        @click="nextPage"
        :disabled="!lastEvaluatedKey ? true : false"        
        class="px-10 py-2 bg-secondary text-white rounded-full hover:bg-active disabled:opacity-20"
        :class="{'cursor-not-allowed': !lastEvaluatedKey, 'cursor-pointer': lastEvaluatedKey}"
      >
        Next
      </button>
    </div>
  </template>
  
  <script setup>
import { useAppStore } from '../stores/appStore';

  
  const props = defineProps({
    lastEvaluatedKey: {
        type: Object,
        required: true
    }
  });

  const appStore = useAppStore();

  function nextPage() {
      appStore.getUserPredictions(props.lastEvaluatedKey);
  }
  
  // function prevPage() {
  //   console.log("Previous page starting with", props.previousLastEvaluatedKey)
  //   appStore.getUserPredictions(props.lastEvaluatedKey);
  // }
  </script>
  
  <style scoped>
  button {
    transition: background-color 0.3s;
  }
  </style>
  