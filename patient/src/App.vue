<template>
  <div id="app">
    <HeaderComponent v-if="!isRestrictedPage" />
    <Sidebar v-if="!isRestrictedPage" />
    <div :style="{ 'margin-left': sidebarWidth }" v-if="!isRestrictedPage">
      <router-view />
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar/SidebarComponent';
import { sidebarWidth } from '@/components/sidebar/state';
import HeaderComponent from '@/components/HeaderComponent';

export default {
  components: { Sidebar, HeaderComponent },
  setup() {
    return { sidebarWidth };
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
