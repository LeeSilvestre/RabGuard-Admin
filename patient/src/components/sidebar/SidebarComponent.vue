<script>
import { mapState } from 'vuex';
import SidebarLink from './SidebarLink';
import { ref, onMounted } from 'vue';
import { collapsed, toggleSidebar, sidebarWidth } from './state';

export default {
  components: { SidebarLink },
  setup() {
    const isMobileSidebarOpen = ref(false);
    const isMobileScreen = ref(window.innerWidth <= 768);

    const toggleMobileSidebar = () => {
      isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
    };

    const checkScreenSize = () => {
      isMobileScreen.value = window.innerWidth <= 768;
      isMobileSidebarOpen.value = !isMobileScreen.value; // Sidebar always visible on desktop
    };

    onMounted(() => {
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
    });

    return {
      collapsed,
      toggleSidebar,
      sidebarWidth,
      isMobileSidebarOpen,
      isMobileScreen,
      toggleMobileSidebar,
    };
  },
  computed: {
    ...mapState(['user']),
  },
  mounted() {
    if (!this.user) {
      this.$store.dispatch('fetchUser');
    }
  },
};
</script>

<template>
  <!-- Mobile Toggle Button -->
  <button
    v-if="isMobileScreen"
    class="mobile-toggle-btn"
    @click="toggleMobileSidebar"
  >
    <i :class="isMobileSidebarOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
  </button>

  <!-- Sidebar -->
  <div
    class="sidebar"
    :class="{ 'mobile-hidden': !isMobileSidebarOpen && isMobileScreen }"
    :style="{ width: collapsed ? '50px' : sidebarWidth }"
  >
    <!-- Logo -->
    <div class="logo-container">
      <img src="@/assets/rabguardlogo.png" alt="Logo" class="logo" />
    </div>

    <!-- User Info -->
    <div class="username-container">
      <p>{{ user ? `${user.fname || 'Guest'} ${user.lname || ''}` : 'Loading...' }}</p>
      <div class="separator"></div>
      <p>{{ user?.address || '' }}</p>
    </div>

    <div class="separator"></div>
    <!-- Sidebar Links -->
    <div>
      <SidebarLink to="/dashboard" icon="fas fa-tachometer-alt">Dashboard</SidebarLink>
      <SidebarLink to="/profile" icon="fas fa-user">Profile</SidebarLink>
      <SidebarLink to="/request" icon="fas fa-chart-line">Request Record</SidebarLink>
      <SidebarLink to="/vaccine" icon="fas fa-syringe">Vaccine Record</SidebarLink>
      <SidebarLink to="/previous" icon="fas fa-history">History</SidebarLink>
    </div>
<div class="separator"></div>
    <!-- Logout -->
    <div>
      <SidebarLink to="/login" icon="fas fa-sign-out-alt">Logout</SidebarLink>
    </div>
  </div>
</template>

<style scoped>
:root {
  --sidebar-bg-color: #188754;
}

.sidebar {
  color: white;
  background-color: #188754;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, width 0.3s ease;
  z-index: 1000;
}

.sidebar.mobile-hidden {
  transform: translateX(-100%);
}

.logo-container {
  text-align: center;
  margin-bottom: 1rem;
}

.logo {
  width: 100px;
}

.username-container {
  text-align: center;
  margin-bottom: 1rem;
}
.sidebar-link {
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: white;
  transition: background-color 0.5s;
  font-family: var(--font-family);
}

.sidebar-link:hover {
  background-color:  #157347;
}

.link.active {
  background-color: var(--sidebar-item-active);
}

.separator {
  height: 2px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: .5rem 0;
}


.mobile-toggle-btn {
  position: fixed;
  z-index: 2000;
  top: 10px;
  left: 10px;
  background-color: #188754;
  color: white;
  border: none;
  padding: 0.5em 1em;
  border-radius: 5px;
  cursor: pointer;
  font-size: .7em;
}

@media (min-width: 769px) {
  .sidebar {
    transform: translateX(0);
  }
  .mobile-toggle-btn {
    display: none;
  }
}
</style>
