<template>
  <div class="dashboard">
    <div class="infographic-container">
      <div class="left-container">
        <h1>Do's And Don'ts</h1>
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
            <div class="card">
              <h3><i class="fas fa-comment-dots top-card-icon"></i></h3>
              <p>Aw. Snap! No Announcement posted.</p>
            </div>
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
            <div class="card">
              <div class="status">
                <i class="fas fa-spinner fa-spin"></i> Processing
              </div>
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
/* General Layout */
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
  gap: 20px; /* Add spacing between sections */
}

.left-container {
  flex: 1;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 10px; /* Add rounded corners to the image */
}

.right-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
}

.top-container,
.bottom-container {
  background-color: #339933;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 18px;
}

/* Announcement and Queue Card Styles */
.card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #333;
  text-align: center;
}

.card h3 {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.card p {
  font-size: 16px;
}

.status {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status i {
  margin-right: 10px;
}

/* Specific Styles for Icons */
.top-card-icon {
  font-size: 60px;
  color: #339933;
}

/* Responsive Design */
@media (min-width: 768px) {
  .infographic-container {
    flex-direction: row;
    align-items: flex-start;
    gap: 30px;
  }

  .right-container {
    width: 60%;
  }
}

@media (max-width: 767px) {
  .left-container h1 {
    font-size: 22px;
    margin-bottom: 10px;
  }

  .left-container img {
    max-width: 90%;
    margin: 0 auto;
  }

  .right-container {
    width: 100%;
  }

  .top-container,
  .bottom-container {
    font-size: 16px;
    padding: 15px;
  }

  .card h3 {
    font-size: 20px;
  }

  .card p {
    font-size: 14px;
  }

  .top-card-icon {
    font-size: 50px;
  }
}
</style>
