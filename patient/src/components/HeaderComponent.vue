<template>
  <header class="header-bar">
    <i class="fas fa-columns"></i>
    <div class="header-content">
      <p>{{ currentDate }}</p>
      <div class="username">
        <!-- Dynamically display the username -->
        <p>{{ user?.fname || 'Guest' }}</p>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PatientsList',
  data() {
    return {
      patients: [],
      currentDate: '',
    };
  },
  computed: {
    ...mapState(['user']),
    loggedInPatient() {
      if (this.user && this.patients) {
        return this.patients.find(
          (patient) => patient.user_id === this.user.user_id
        ) || {};
      }
      return {};
    },
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      const date = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      this.currentDate = date.toLocaleDateString('en-US', options);
    },
  },
};
</script>

<style scoped>
.header-bar {
  margin-top: -8px;
  display: flex;
  align-items: center;
  background-color: white;
  color: gray;
  width: 100%;
  height: auto;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 2;
}

.header-bar i {
  margin-right: 10px;
  font-size: 20px;
}

.header-bar .header-content {
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding: 16px;
  align-items: center;
  margin-left: 170px; /* Adjust this value based on layout needs */
}

.header-bar .username {
  margin-left: 16px;
}

.header-bar p {
  margin: 0;
  font-size: 20px;
}

/* Responsive styling */
@media (max-width: 1024px) {
  .header-bar .header-content {
    margin-left: 50px; /* Reduce left margin for tablets */
    padding: 12px;
  }

  .header-bar i {
    font-size: 18px; /* Slightly smaller icon for tablet */
  }

  .header-bar p {
    font-size: 18px; /* Smaller text size for the date */
  }

  .header-bar .username p {
    font-size: 16px; /* Smaller username font size */
  }
}

@media (max-width: 768px) {
  .header-bar {
    display: none; /* Hide the header bar on mobile screens */
  }
}
</style>
