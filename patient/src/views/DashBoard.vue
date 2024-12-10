<template>
  <div class="dashboard">
    <div class="infographic-container">
      <div class="left-container">
        <h1>Do's And Don'ts
        </h1>
        <img src="@/assets/Rabies.png" alt="Animal Bite Infographic">
      </div>
      <div class="right-container">
        <div class="top-container">
          <h2><i class="fas fa-comment-dots"></i> Announcements</h2>
          <div v-if="announcements.length">
            <ul>
              <li v-for="(announcement, index) in announcements" :key="index">{{ announcement }}</li>
            </ul>
          </div>
          <div v-else>
          </div>
          <!-- Card inside top-container -->
          <div class="card">
            <h3>
              <i class="fas fa-comment-dots top-card-icon"></i>
            </h3>
            <p>Aw. Snap! No Announcement posted.</p>
          </div>
        </div>
        <div class="bottom-container">
          <h2><i class="fas fa-notes-medical"></i> Vaccination Record Request</h2>
          <div v-if="queue.length">
            <ul>
              <li v-for="(item, index) in queue" :key="index">{{ item }}</li>
            </ul>
          </div>
          <div v-else>
          </div>
          <!-- Card inside bottom-container -->
          <div class="card">
            <div class="status">
              <i class="fas fa-spinner fa-spin"></i> Processing
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashBoard',
  data() {
    return {
      announcements: [],
      queue: [],
    };
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.infographic-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
}

.left-container {
  flex: 1;
  text-align: center;
  font-family: Arial, sans-serif;
  margin-right: 10px;
}

h1 {
  color: #2c3e50;
  margin-left: 50px;
}

img {
  max-width: 100%;
  height: auto;
  margin-left: 40px;
}

.right-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.top-container, .bottom-container {
  background-color: #339933;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 20px;
  text-align: left;
  margin-top: 80px;
}
.bottom-container {
  margin-bottom: 300px;
}

h2 {
  margin-top: 0;
  color: white;
  font-size: 20px;
}

ul {
  padding-left: 20px;
  list-style-type: disc;
}

/* Card Styles */
.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card h3 {
  margin-top: 0;
  font-size: 24px;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card h3 i {
  margin-right: 10px;
}

.card p {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.status {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status i {
  margin-right: 10px;
}

/* Specific styles for the top card icon */
.top-card-icon {
  font-size: 70px; /* Adjust the size as needed */
}

/* Responsive styles */
@media (min-width: 768px) {
  .infographic-container {
    flex-direction: row;
  }

  .right-container {
    width: 50%;
  }

  .top-container, .bottom-container {
    width: 100%;
  }

  .left-container img {
    margin-left: 0;
  }
}

@media (max-width: 767px) {
  .infographic-container {
    flex-direction: column;
  }

  .left-container h1 {
    margin-left: 0;
    font-size: 24px; /* Adjusted font size for mobile */
  }

  .left-container img {
    margin-left: 0;
    max-width: 90%; /* Scale down image size for mobile */
  }

  .right-container {
    width: 100%;
  }

  .top-container, .bottom-container {
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
    padding: 15px; /* Adjust padding for mobile */
  }

  .top-container h2, .bottom-container h2 {
    font-size: 18px; /* Adjust font size */
  }

  .card {
    padding: 15px; /* Adjust card padding */
  }

  .card h3 {
    font-size: 20px; /* Adjust heading font size */
  }

  .card p {
    font-size: 14px; /* Adjust paragraph font size */
  }

  .bottom-container {
    margin-bottom: 20px; /* Adjust margin for better spacing */
  }

  /* Adjust the icon size for smaller screens */
  .top-card-icon {
    font-size: 50px;
  }
}

</style>
