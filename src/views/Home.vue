<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl md:text-3xl font-bold mb-1">
      Premier League Matches
      <span @click="appStore.getMatchesToPredict()" class="material-symbols-outlined align-middle cursor-pointer"
        :class="{ 'animate-spin': appStore.refreshMatches }">
        refresh
      </span>
    </h1> <!-- Updated font size -->

    <!-- <p>IN DEVELOPMENT</p> -->
    <!-- <p class="mb-4"><strong>Season - {{ matches[0]['season']['startDate']}} - {{ matches[0]['season']['endDate'] }}</strong></p> -->
    <div class="grid grid-cols-1 gap-12 mt-10">
      <!-- <MatchCard v-for="match in appStore.matches" :key="match.id" :match="match" class="w-full" /> -->

      <MatchCard v-for="match in appStore.matches" :key="match.id" :match="match" class="w-full">
        <template #time-display>
          <TimeDisplay :utcDate="match.utcDate" />
        </template>
        
      </MatchCard>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import MatchCard from '../components/MatchCard.vue';
import TimeDisplay from '../components/TimeDisplay.vue';
import StatusIndicator from '../components/StatusIndicator.vue';
import { useAppStore } from '../stores/appStore';

const appStore = useAppStore();

// Fetch matches data on component mount
onMounted(async () => {
  await appStore.getMatchesToPredict();
});
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>