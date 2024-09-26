<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg md:shadow-xl md:mx-4">
      <h2 class="text-4xl font-extrabold text-primary mb-8 text-center">
        Guess <span class="material-symbols-outlined text-4xl align-middle animate-bounce">sports_soccer</span>
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Username Input -->
        <div>
          <label for="username" class="block text-gray-700 text-lg font-medium mb-2">Username</label>
          <input
            v-model="username"
            type="text"
            id="username"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition duration-150"
            placeholder="Enter your username"
            required
          />
        </div>

        <!-- PIN Input as 6 individual boxes -->
        <div>
          <label for="pin" class="block text-gray-700 text-lg font-medium mb-2">PIN Code</label>
          <div class="pin-input-container">
            <input
              v-for="(digit, index) in pinArray"
              :key="index"
              type="text"
              maxlength="1"
              pattern="\d{1}"
              class="pin-input-box w-12 h-12 p-3 text-center border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition duration-150"
              v-model="pinArray[index]"
              @input="handlePinInput(index)"
              @keydown.backspace="handlePinBackspace(index, $event)"
              ref="pinInput"
              required
            />
          </div>
        </div>

        <!-- Submit Button -->
        <button
          :disabled="submissionLoading"
          type="submit"
          class="w-full py-3 px-4 bg-primary text-white rounded-lg font-semibold hover:bg-hover active:bg-active disabled:opacity-30 transition-colors duration-300"
        >
          GO IN
          <span v-if="submissionLoading" class="material-symbols-outlined animate-spin align-middle font-bold px-2">progress_activity</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../stores/appStore';

const username = ref('');
const pinArray = ref(['', '', '', '', '', '']); // Array to store each digit of the PIN
const router = useRouter();
const appStore = useAppStore();
const submissionLoading = ref(false);

const handlePinInput = (index) => {
  // Automatically move focus to the next input when the current one is filled
  if (pinArray.value[index] !== '' && index < 5) {
    document.querySelectorAll('.pin-input-box')[index + 1].focus();
  }
};

const handlePinBackspace = (index, event) => {
  // Move focus to the previous input if backspace is pressed
  if (event.key === 'Backspace' && pinArray.value[index] === '' && index > 0) {
    document.querySelectorAll('.pin-input-box')[index - 1].focus();
  }
};

const handleSubmit = async () => {
  // Validate PIN - Check if all 6 digits are entered and numeric
  const pin = pinArray.value.join('');
  if (pin.length !== 6 || isNaN(pin)) {
    alert("PIN must be exactly 6 digits.");
    return;
  }

  // Loading starts
  submissionLoading.value = true;

  // Your logic for handling the submission
  let success = await appStore.login({
    'username': username.value,
    'pin': pin
  });

  submissionLoading.value = false;

  if (success) {
    router.push('/');
  }
};
</script>

<style scoped>
/* Styling for PIN Input */
.pin-input-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.pin-input-box {
  font-size: 1.25rem;
  text-align: center;
  width: 3rem;
  height: 3rem;
}
</style>
