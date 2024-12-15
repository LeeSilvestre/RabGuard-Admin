<template>
  <div id="app">
    <HeaderComponent v-if="!isRestrictedPage" />
    <!-- Sidebar -->
    <Sidebar v-if="!isRestrictedPage" />
    
    <!-- Content Wrapper -->
    <div
      class="content-wrapper"
      :class="{ 'mobile-sidebar-open': isMobileSidebarOpen }"
      :style="contentStyles"
      v-if="!isRestrictedPage"
    >
      <router-view />
    </div>

    <!-- Restricted Pages -->
    <router-view v-else />
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar/SidebarComponent';
import { ref, computed } from 'vue';
import { sidebarWidth, collapsed } from '@/components/sidebar/state';
import HeaderComponent from '@/components/HeaderComponent';

export default {
  components: { Sidebar, HeaderComponent },
  setup() {
    const isMobile = ref(window.innerWidth <= 768);
    const isMobileSidebarOpen = ref(false);

    // Update `isMobile` on window resize
    const updateIsMobile = () => {
      isMobile.value = window.innerWidth <= 768;
    };
    window.addEventListener('resize', updateIsMobile);

    // Calculate dynamic content styles
    const contentStyles = computed(() => {
      if (isMobile.value) {
        // In mobile, content always takes full width, regardless of sidebar state
        return { marginLeft: '0', width: '100%' };
      }
      // In desktop, adjust content width based on sidebar state
      const marginLeft = collapsed.value ? '50px' : '200px';
      return { marginLeft, width: `calc(100% - ${marginLeft})` };
    });

    return {
      sidebarWidth,
      collapsed,
      contentStyles,
      isMobile,
      isMobileSidebarOpen,
    };
  },
  computed: {
    isRestrictedPage() {
      // Check if the current route is the landing page or login page
      return this.$route.path === '/' || this.$route.path === '/login';
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  z-index: 3;
}

.content-wrapper {
  transition: margin-left 0.5s ease, width 0.5s ease;
  overflow-x: hidden;
}

.content-wrapper.mobile-sidebar-open {
  position: fixed; /* Fix content when mobile sidebar is open */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5); /* Optional overlay */
}
</style>
