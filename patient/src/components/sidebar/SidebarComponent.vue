<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <!-- Added logo -->
    <div class="logo-container" :style="{ width: collapsed ? '50px' : '200px' }">
      <img src="@/assets/rabguardlogo.png" alt="Logo" class="logo" :style="{ width: collapsed ? '100%' : '150px' }">
    </div>
    <div class="separator"></div>
    <SidebarLink to="/dashboard" icon="fas fa-chart-bar">Dashboard</SidebarLink>
    <SidebarLink to="/profile" icon="fas fa-user">Profile</SidebarLink>
    <SidebarLink to="/request" icon="fas fa-chart-line">Request Record</SidebarLink>
    <SidebarLink to="/vaccine" icon="fas fa-syringe">Vaccine Record</SidebarLink>
    <SidebarLink to="/previous" icon="fas fa-history">History</SidebarLink>
    <div class="separator"></div>

    <div class="logout-link">
      <SidebarLink to="/login" icon="fas fa-sign-out-alt">Logout</SidebarLink>
    </div>
    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #188754;
  --sidebar-item-hover: #188754;
  --sidebar-item-active: #0a4d2c; /* Different color for active state */
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
  transition: width 0.5s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: hidden;
  overflow-x: hidden;
  font-family: var(--font-family);
  border-top-right-radius: 15px ;
  border-bottom-right-radius: 15px;
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

.links {
  flex-grow: 1;
}

.separator {
  height: 2px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: .5rem 0;
}

.sidebar-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  transition: background-color 0.5s;
  font-family: var(--font-family);
}

.sidebar-link:hover {
  background-color: var(--sidebar-item-hover);
}

.sidebar-link.router-link-active {
  background-color: var(--sidebar-item-active); /* Use the defined variable for active state */
}

.link.active {
  background-color: var(--sidebar-item-active);
}

.bottom-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
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

/* Media Queries for Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 60px;
  }
  .logo-container {
    text-align: center;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
  }

  .logo {
    height: auto;
    border-radius: 50%; /* Make it circular */
    transition: width 0.5s ease;
  }
  .sidebar-link {
    justify-content: center;
  }
  .sidebar-link span {
    display: none;
  }
}
</style>
