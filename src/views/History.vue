<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-10">Prediction History</h1>
    <div v-if="appStore.userPredictions.records" class="grid grid-cols-1 gap-12">
      <!-- Loop through each prediction and render the match_card component -->
      <MatchCard v-for="prediction in appStore.userPredictions.records" :key="prediction.match_id"
        :match="formatMatch(prediction)">
        <template #status-indicator>
          <StatusIndicator :status="prediction.isFinished ? 'Finished' : 'Pending'" />
        </template>
        <template #time-display v-if="!prediction.isFinished">
          <TimeDisplay :utcDate="prediction.match_date" />
        </template>
      </MatchCard>

      <!-- Pagination component -->
      <Pagination
        :lastEvaluatedKey="appStore.userPredictions.last_evaluated_key"
      />
    </div>
    <p v-else class="text-gray-500 mt-4">No predictions found.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAppStore } from '../stores/appStore';
import MatchCard from '../components/MatchCard.vue'; // Import the match_card component
import StatusIndicator from '../components/StatusIndicator.vue';
import TimeDisplay from '../components/TimeDisplay.vue';
import Pagination from '../components/Pagination.vue';

const appStore = useAppStore();

// Function to format the prediction data to match the structure expected by match_card
function formatMatch(prediction) {
  return {
    match_id: prediction.match_id,
    homeTeam: {
      name: prediction.home_team,
      crest: prediction.home_team_flag,
    },
    awayTeam: {
      name: prediction.away_team,
      crest: prediction.away_team_flag,
    },
    utcDate: prediction.match_date,
    isFinished: prediction.isFinished,
    prediction: {
      status: prediction.prediction ? true : false, // Assuming the presence of a prediction means it's predicted
      winner: prediction.prediction,   // User's predicted outcome
    },
    actualOutcome: prediction.actual_outcome,  // Result of the match
  };
}

onMounted(async () => {
  await appStore.getUserPredictions();
});
</script>

<style scoped>
/* Optional styles for layout */
.space-y-4>*+* {
  margin-top: 1rem;
}
</style>
