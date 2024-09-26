import { defineStore } from 'pinia';
import axiosInstance from '../api/config';
import { useUiStore } from './uiStore'; // Import uiStore

export const useAppStore = defineStore('AppStore', {
  state: () => ({
    user: {},  // To store user info
    isAuthenticated: false,  // Track authentication status
    matches: [], // To store the matches for prediction
    userPredictions: {}, // To store user's predictions
    token: null,  // JWT token
    refreshMatches: false, // Flag to refresh matches
    scoreboard: []
  }),
  actions: {
    // Fetch available matches for prediction
    async getMatchesToPredict() {
      const uiStore = useUiStore(); // Access UI store
      try {
        this.refreshMatches = true; // Set loading state
        const response = await axiosInstance.get('/football/matches');
        this.matches = response.data; // Store matches
        this.refreshMatches = false; // Reset loading state
        return this.matches;
      } catch (error) {
        // Show error toast if fetching fails
        uiStore.showToast('Failed to fetch matches.', 'failure'); 
        throw error;
      }
    },

    // Store the match outcome prediction
    async storeMatchOutcomePrediction(data) {
      const uiStore = useUiStore(); // Access UI store
      try {
        await axiosInstance.post('/football/matches', data);
        await this.getMatchesToPredict();
      } catch (error) {
        // Show error toast if storing prediction fails
        uiStore.showToast('Failed to store prediction.', 'failure');
        throw error;
      }
    },

    // Check user authentication status
    checkAuth() {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        this.token = storedToken;
        this.isAuthenticated = true;
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          this.user = JSON.parse(storedUser); // Restore user info
        }
        return true;
      } else {
        this.user = {};
        this.isAuthenticated = false; // Not authenticated
        return false;
      }
    },

    // Log in the user and store JWT token
    async login(data) {
      const uiStore = useUiStore(); // Access UI store
      try {
        const response = await axiosInstance.post('/auth/', data);
        this.user = response.data.user; // Store user info
        this.isAuthenticated = true; // Set authenticated status
        this.token = response.data.access_token; // Store token

        // Store in localStorage
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        return true; // Successful login
      } catch (error) {
        // Show error toast if login fails
        uiStore.showToast('Login failed.', 'failure');
        return false;
      }
    },

    // Helper method to reset state to default
    resetState() {
      this.user = {};
      this.isAuthenticated = false;
      this.matches = [];
      this.userPredictions = [];
      this.token = null;
      this.refreshMatches = false;
      this.scoreboard = [];
    },

    // Log out the user
    async logout() {
      const uiStore = useUiStore(); // Access UI store
      try {
        await axiosInstance.post('/auth/logout');
        this.resetState(); // Reset state to default
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return true; // Successful logout
      } catch (error) {
        // Show error toast if logout fails
        uiStore.showToast('Logout failed.', 'failure');
        return false;
      }
    },

    // Get user score after evaluation
    async evaluateUserScore() {
      const uiStore = useUiStore(); // Access UI store
      try {
        await axiosInstance.get('/football/matches/evaluate');
        return true; // Successful evaluation
      } catch (error) {
        // Show error toast if evaluation fails
        uiStore.showToast('Score evaluation failed.', 'failure');
        return false;
      }
    },

    // Fetch the user's predictions
    async getUserPredictions(lastEvaluatedKey = null) {
      const uiStore = useUiStore(); // Access UI store
      try {
        const response = await axiosInstance.post('/football/user-predictions', {
          "lastEvaluatedKey" : lastEvaluatedKey
        }); // Correct route
        this.userPredictions = response.data; // Store predictions
        return true; // Successful fetch
      } catch (error) {
        // Show error toast if fetching predictions fails
        uiStore.showToast('Failed to fetch predictions.', 'failure');
        return false;
      }
    },

    async getTopUsers() {
      const uiStore = useUiStore();
      try {
        const response = await axiosInstance.get('/football/scoreboard'); // Correct route
        this.scoreboard = response.data;
        return true;
      } catch (error) {
        uiStore.showToast('Failed to fetch data for the scoreboard.', 'failure');
        return false;
      }
    }
  }
});
