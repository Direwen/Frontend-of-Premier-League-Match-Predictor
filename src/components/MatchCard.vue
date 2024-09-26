<template>
  <div
    class="relative border px-4 py-8 rounded-lg shadow-md transition-all duration-300 md:py-6"
    :class="{
      'from-red-600 to-green-400': match.isFinished,
      'bg-gradient-to-t md:bg-gradient-to-l': match.isFinished && match.actualOutcome == 'HOME',
      'bg-gradient-to-b md:bg-gradient-to-r': match.isFinished && match.actualOutcome == 'AWAY',
      'from-yellow-200 to-yellow-400 bg-gradient-to-b': match.isFinished && match.actualOutcome == 'DRAW',
    }"
  >
    <div v-if="match">
      <!-- Match Teams -->
      <h2 class="text-xl md:text-2xl font-bold flex flex-col items-center justify-center gap-2 md:flex-row md:space-x-10">
        <section class="flex flex-col items-center justify-between gap-4 md:gap-2 md:flex-row">
          <img :src="match.homeTeam.crest" alt="Home Team Crest" class="inline w-8 h-8 mb-1 md:mb-0" />
          <section class="relative">
            <p class="text-base md:text-lg">{{ match.homeTeam.name }}</p>
            <p class="absolute -top-3 right-0 uppercase text-xs md:text-sm"><small>(HOME)</small></p>
          </section>
        </section>
        <span class="mx-2 text-lg font-semibold">vs</span>
        <section class="flex flex-col items-center justify-between gap-2 md:flex-row">
          <img :src="match.awayTeam.crest" alt="Away Team Crest" class="inline w-8 h-8 mb-1 md:mb-0" />
          <section class="relative">
            <p class="text-base md:text-lg">{{ match.awayTeam.name }}</p>
            <p class="absolute -top-3 left-0 uppercase text-xs md:text-sm"><small>(AWAY)</small></p>
          </section>
        </section>
      </h2>

      <!-- Time Left Display -->
      <slot name="time-display"></slot>

      <!-- Status Indicator -->
      <slot name="status-indicator"></slot>

      <!-- Display Prediction Info -->
      <!-- Combined Prediction and Result Info -->
      <div v-if="match.prediction.status" class="mt-4 p-4 rounded-md"
        :class="{
          'bg-active/20 text-secondary': !match.isFinished,
          'bg-white/10': match.isFinished
        }">
        <p>
          Your Prediction: <span class="font-semibold">{{ match.prediction.winner == 'HOME' ? match.homeTeam.name : match.awayTeam.name }}</span>
        </p>
        <p v-if="match.isFinished">
          Match Result: <span class="font-semibold">{{ (match.actualOutcome == 'DRAW') ? "DRAW" : (match.actualOutcome == 'HOME') ? match.homeTeam.name : match.awayTeam.name }}</span>        
        </p>
      </div>


      <!-- Prediction Options -->
      <div v-else-if="!match.isFinished" class="mt-6 flex flex-col justify-center items-center md:flex-row md:space-x-4">
        <PredictionButtons :predictOutcome="predictOutcome" />
      </div>
    </div>
  </div>
</template>

<script setup>
import PredictionButtons from './PredictionButtons.vue';
import { defineProps, computed } from 'vue';
import { useAppStore } from '../stores/appStore';

const props = defineProps({
  match: {
    type: Object,
    required: true
  }
});

// Initialize the store
const appStore = useAppStore();

// Check if the user won the prediction
const userWonPrediction = computed(() => {
  // Ensure the match is finished and there's a valid actual outcome
  if (props.match.isFinished && props.match.actualOutcome) {
    // Compare the prediction with the actual outcome
    return props.match.prediction.winner === props.match.actualOutcome;
  }
  return false;
});

// Function to handle prediction clicks
const predictOutcome = async (prediction) => {
  const data = {
    match_id: props.match.id,                  // Match ID
    home_team: props.match.homeTeam.name,      // Home team name
    away_team: props.match.awayTeam.name,      // Away team name
    home_team_flag: props.match.homeTeam.crest,
    away_team_flag: props.match.awayTeam.crest,
    match_date: props.match.utcDate,           // Match date (in UTC format)
    counted: false,                            // Has not been counted yet
    actual_outcome: null,                      // Actual outcome is unknown
    prediction: prediction.toUpperCase(),      // User's prediction (e.g., HOME, AWAY, DRAW)
    isFinished: props.match.status === 'FINISHED' ? true : false        // Is the match finished?
  };

  // Send data to the backend
  await appStore.storeMatchOutcomePrediction(data);
};
</script>

<style scoped>
/* Add any additional styles if needed */
h2 img {
  width: 4rem; /* Further reduced image size */
  height: 4rem; /* Further reduced image size */
}

h2 span {
  font-size: 1.25rem; /* Adjusted team name size */
}

.mt-4 {
  font-size: 0.75rem; /* Adjusted match details size for responsiveness */
}

.mt-6 {
  font-size: 0.75rem; /* Adjusted prediction section size for responsiveness */
}

/* Responsive font sizes */
@media (min-width: 768px) {
  .mt-4 {
    font-size: 0.875rem; /* Adjusted match details size for larger screens */
  }

  .mt-6 {
    font-size: 0.875rem; /* Adjusted prediction section size for larger screens */
  }
}

/* New hover effect for the card */
.hover\:shadow-lg:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Shadow effect on hover */
}

</style>
