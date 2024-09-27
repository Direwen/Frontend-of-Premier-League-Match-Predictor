<template>
  <div id="app" class="flex">
    <aside :class="{'translate-x-0': uiStore.isMenuOpen, '-translate-x-full': !uiStore.isMenuOpen}" 
           class="bg-primary text-white w-1/2 h-screen fixed md:relative transition-transform duration-300 z-20 md:w-48 md:translate-x-0">
      <NavBar @close-menu="uiStore.closeMenu" /> <!-- Pass close-menu event -->
    </aside>

    <span 
      @click="uiStore.toggleMenu" 
      class="material-symbols-outlined absolute right-2 top-4 p-2 rounded md:hidden z-30 cursor-pointer bg-secondary text-white active:-scale-75"
    >
      {{ uiStore.isMenuOpen ? "close" : "menu" }}
    </span>

    <main :class="{'ml-48': uiStore.isMenuOpen && windowWidth >= 769, 'ml-0': !uiStore.isMenuOpen || windowWidth < 769}" 
          class="flex-1 h-[calc(100vh-16px)] overflow-y-auto transition-all duration-300">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUiStore } from '../../stores/uiStore'; // Import uiStore
import NavBar from '../../components/Navbar.vue';

const uiStore = useUiStore();
const windowWidth = ref(window.innerWidth);

onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
    if (windowWidth.value >= 769) {
      uiStore.closeMenu(); // Close menu on resize
    }
  });
});
</script>
