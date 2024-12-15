<script>
import { mapState } from 'vuex';
import SidebarLink from './SidebarLink';
import { ref } from 'vue';
import { collapsed, toggleSidebar, sidebarWidth } from './state';

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    const isMobileSidebarOpen = ref(false); // Mobile-specific toggle state

    const toggleMobileSidebar = () => {
      isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
    };

    return {
      collapsed,
      toggleSidebar,
      sidebarWidth,
      isMobileSidebarOpen,
      toggleMobileSidebar,
    };
  },
  computed: {
    ...mapState(['user']),
    loggedInPatient() {
      if (this.user && this.patients) {
        return this.patients.find((patient) => patient.user_id === this.user.user_id) || {};
      }
      return {}; // Return an empty object if user or patients are not available
    },
  },
  mounted() {
    if (!this.user) {
      this.$store.dispatch('fetchUser'); // Dispatch action to load user
    }
  },
};
</script>

<template>
  <!-- Sidebar Container -->
  <div
    class="sidebar"
    :class="{ 'mobile-open': isMobileSidebarOpen }"
    :style="{ width: isMobileSidebarOpen ? '200px' : sidebarWidth }"
  >
    <!-- Logo Section -->
    <div class="logo-container" :style="{ width: collapsed ? '50px' : '200px' }">
      <img src="@/assets/rabguardlogo.png" alt="Logo" class="logo" :style="{ width: collapsed ? '100%' : '150px' }" />
    </div>

    <!-- User Info -->
    <div class="username-container">
      <div class="username">
        <p>{{ user ? user.fname || 'Guest' : 'Loading...' }} {{ user ? user.lname || '' : '' }}</p>
        <div class="separator"></div>
        <p>{{ user.address || '' }}</p>
      </div>
    </div>

    <!-- Sidebar Links -->
    <div class="separator"></div>
    <SidebarLink to="/dashboard" icon="fas fa-tachometer-alt">Dashboard</SidebarLink>
    <SidebarLink to="/profile" icon="fas fa-user">Profile</SidebarLink>
    <SidebarLink to="/request" icon="fas fa-chart-line">Request Record</SidebarLink>
    <SidebarLink to="/vaccine" icon="fas fa-syringe">Vaccine Record</SidebarLink>
    <SidebarLink to="/previous" icon="fas fa-history">History</SidebarLink>
    <div class="separator"></div>

    <!-- Logout Link -->
    <div class="logout-link">
      <SidebarLink to="/login" icon="fas fa-sign-out-alt">Logout</SidebarLink>
    </div>
  </div>

  <!-- Mobile Toggle Button -->
  <button class="mobile-toggle-btn" @click="toggleMobileSidebar">
    <i :class="isMobileSidebarOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
  </button>
</template>

<style>
:root {
  --sidebar-bg-color: #188754;
  --sidebar-item-hover: #188754;
  --sidebar-item-active: #0a4d2c;
}

.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 1em 0.5em;
  transition: width 0.5s ease, transform 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto; /* Enable vertical scrolling */
  font-family: var(--font-family);
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

.sidebar::-webkit-scrollbar {
  display: none; /* Hide scrollbar in WebKit browsers */
}

.sidebar {
  scrollbar-width: none; /* Hide scrollbar in Firefox */
}

.sidebar.mobile-open {
  transform: translateX(0); /* Slide in on mobile when open */
  overflow-y: auto; /* Add vertical scrolling for mobile view */
}

.sidebar:not(.mobile-open) {
  transform: translateX(-100%); /* Slide out on mobile */
}

.logo-container {
  text-align: center;
  margin-bottom: 1rem;
  transition: width 0.5s ease;
}

.logo {
  height: auto;
  transition: width 0.5s ease;
}

.username-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.username p {
  margin: 0;
  font-size: 1.3em;
}

.separator {
  height: 2px;
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
}

.collapse-icon {
  margin-top: 1rem;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: transform 0.5s linear;
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Mobile Toggle Button */
.mobile-toggle-btn {
  position: fixed;
  z-index: 3;
  top: 10px;
  left: 10px;
  background: var(--sidebar-bg-color);
  color: white;
  border: none;
  padding: 0.5em;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
}

/* Media Queries for Mobile Devices */
@media (max-width: 768px) {
  .sidebar {
    width: 200px;
    overflow-y: auto; /* Ensure scrollability on smaller screens */
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }

  .mobile-toggle-btn {
    display: block;
  }
}
</style>
