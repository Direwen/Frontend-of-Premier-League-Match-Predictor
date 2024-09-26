<template>
  <nav class="flex flex-col items-center bg-primary p-4 gap-3 rounded-lg shadow-md">

    <!-- User Info Section -->
    <div v-if="appStore.isAuthenticated" class="user-info mt-4 text-white text-center">
      <p class="font-semibold uppercase">{{ appStore.user.username }}</p>
      <p class="text-sm">Score: {{ appStore.user.score }}</p>
    </div>
    
    <router-link 
      to="/"
      class="nav-link"
      :class="{ 'active': isActive('/') }"
      @click="handleLinkClick"
    >
      Home
    </router-link>
    
    <router-link 
      to="/scoreboard" 
      class="nav-link"
      :class="{ 'active': isActive('/scoreboard') }"
      @click="handleLinkClick"
    >
      Scoreboard
    </router-link>
    
    <router-link 
      to="/history" 
      class="nav-link"
      :class="{ 'active': isActive('/history') }"
      @click="handleLinkClick"
    >
      History
    </router-link>
    
    <button 
      v-if="appStore.isAuthenticated" 
      @click="handleLogout" 
      class="logout-button mt-4"
    >
      Logout
    </button>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAppStore } from '../stores/appStore';
import { useUiStore } from '../stores/uiStore'; 

const appStore = useAppStore();
const uiStore = useUiStore(); 
const router = useRouter();

console.log(appStore.user);

const isActive = (path) => router.currentRoute.value.path === path;

function handleLinkClick() {
  uiStore.closeMenu();
}

function handleLogout() {
  appStore.logout().then((success) => {
    if (success) {
      router.push('/auth');
    }
  }).catch(error => {
    console.error('Logout failed:', error);
  });
}
</script>

<style scoped>
.nav-link {
  @apply py-3 w-full text-center text-white rounded-lg transition duration-200;
  background: transparent;
  position: relative;
}

.nav-link.active {
  @apply bg-secondary; /* Change to your active color */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.nav-link:hover {
  @apply bg-active; /* Change to your hover color */
}

.logout-button {
  @apply py-2 px-4 rounded-lg text-white bg-red-600 transition duration-200 
          hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 
          focus:ring-opacity-50 shadow-md;
}

.logout-button:hover {
  @apply bg-red-500;
}
</style>
