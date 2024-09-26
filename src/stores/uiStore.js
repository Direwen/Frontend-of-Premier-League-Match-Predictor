import { defineStore } from 'pinia';

export const useUiStore = defineStore('UiStore', {
  state: () => ({
    toastMessage: '',
    toastDuration: 3000,
    toastStatus: 'neutral',
    isToastVisible: false,
    timeoutId: null,
    isMenuOpen: false, // Track menu state
  }),
  actions: {
    showToast(message, status = 'neutral') {
      this.toastMessage = message;
      this.isToastVisible = true;
      this.toastStatus = status;

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        this.hideToast();
      }, this.toastDuration);
    },
    hideToast() {
      this.isToastVisible = false;
      this.toastStatus = 'neutral';
      this.toastMessage = '';

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Toggle menu state
    },
    closeMenu() {
      this.isMenuOpen = false; // Close menu
    }
  }
});
