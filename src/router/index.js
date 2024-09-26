import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Scoreboard from '../views/Scoreboard.vue';
import Auth from '../views/Auth.vue';
import MainLayout from '../views/Layout/MainLayout.vue';
import AuthLayout from '../views/Layout/AuthLayout.vue';
import History from "../views/History.vue"
import { useAppStore } from '../stores/appStore';  // Import the store

const routes = [
  // Routes that use MainLayout (with NavBar)
  {
    path: '/',
    component: MainLayout,
    beforeEnter: async (to, from, next) => {
      const store = useAppStore();  // Access the store
      // Check if the user is authenticated
      if (!store.isAuthenticated) {
        try {
          await store.checkAuth();  // Try to check if the user is logged in
          if (store.isAuthenticated) {
            next();  // Allow access if authenticated
          } else {
            next('/auth');  // Redirect to the login page if not authenticated
          }
        } catch (error) {
          next('/auth');  // Redirect to login page if error occurs or not authenticated
        }
      } else {
        next();  // If already authenticated, allow access
      }
    },
    children: [
      { path: '', component: Home },  // No need for meta.requiresAuth since it's guarded at MainLayout level
      { path: 'scoreboard', component: Scoreboard },
      { path: 'history', component: History}
    ],
  },
  // Routes that use AuthLayout (without NavBar)
  {
    path: '/auth',
    component: AuthLayout,
    beforeEnter: async (to, from, next) => {
      const store = useAppStore();  // Access the store
      // Check if the user is already authenticated
      if (store.isAuthenticated) {
        next('/');  // Redirect to home if already authenticated
      } else {
        try {
          await store.checkAuth();  // Check auth status if it's not loaded yet
          if (store.isAuthenticated) {
            next('/');  // Redirect to home if authenticated
          } else {
            next();  // Allow access to auth routes if not authenticated
          }
        } catch (error) {
          next();  // Allow access to auth routes if there's an error (e.g., not logged in)
        }
      }
    },
    children: [
      { path: '', component: Auth },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
