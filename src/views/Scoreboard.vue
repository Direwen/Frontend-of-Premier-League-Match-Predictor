<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-6">Scoreboard</h1>

    <div v-if="scoreboard.length === 0" class="text-center text-lg text-gray-500">
      No data available.
    </div>

    <!-- Scoreboard Table -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr class="bg-gray-100 text-gray-700 text-left">
            <th class="py-3 px-6">Rank</th>
            <th class="py-3 px-6">Username</th>
            <th class="py-3 px-6">Winning Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in scoreboard" :key="user[1]" class="hover:bg-gray-50">
            <td class="py-3 px-6">{{ index + 1 }}</td>
            <td class="py-3 px-6 capitalize">{{ user[1] }}</td>
            <td class="py-3 px-6">{{ (user[0] * 100).toFixed(2) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useAppStore } from '../stores/appStore';

const appStore = useAppStore();

onMounted(async () => {
  await appStore.getTopUsers();
});

const scoreboard = computed(() => appStore.scoreboard);
</script>

